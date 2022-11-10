import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import Styles from './Styles';

export default function Categories({ navigation }) {

    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        fetch('https://opentdb.com/api_category.php')
            .then(response => response.json())
            .then(data => {
                setCategories(data.trivia_categories);
            })
            .catch(err => console.error(err));
    }, []);

    // put the selected categories in an array
    const handleCategoryChange = (itemValue, itemIndex) => {
        setSelectedCategories([...selectedCategories, itemValue]);
    }
    // remove the selected category from the array
    const handleRemoveCategory = (itemValue, itemIndex) => {
        setSelectedCategories(selectedCategories.filter(category => category !== itemValue));
    }
    // check if the category is already selected
    const isCategorySelected = (itemValue) => {
        return selectedCategories.includes(itemValue);
    }
    // choose a random category from the categories
    const randomCategory = () => {
        const random = Math.floor(Math.random() * categories.length);
        return categories[random].id;
    }
    // let the user choose categories from the list and return to previous screen
    const chooseCategories = () => {
        navigation.navigate('Partymode', {
            selectedCategories,
        });
    }

    return (
        <View style={Styles.container}>
            <Text style={Styles.header}>Categories</Text>
            <Text style={Styles.normalText}>Choose your categories</Text>
            <FlatList data={categories}
                renderItem={({ item }) => (
                    <View style={Styles.buttons}>
                        <Button
                            title={item.name}
                            onPress={() => isCategorySelected(item.id) ? handleRemoveCategory(item.id) : handleCategoryChange(item.id)}
                            color={isCategorySelected(item.id) ? '#f00' : '#0f0'}
                        />
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />
            <View style={Styles.buttons}>
                <Button
                    title="Select"
                    onPress={chooseCategories}
                    color="#0f0"
                />
            </View>
        </View>
    );
}