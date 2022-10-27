import { useEffect, useState, useRef } from 'react';
import { SafeAreaView, Text, View, TextInput, FlatList, ScrollView, Modal, Pressable } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from './Styles';
import { MultiSelect, Dropdown } from 'react-native-element-dropdown';

export default function PartyModeOptions({ route, navigation }) {

    // Variables for gameoptions
    const [selectedNum, setSelectedNum] = useState(0);
    const [selectedDrink, setSelectedDrink] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    
    //Add player variables
    const [playerNames, setPlayerNames] = useState([]);
    const [playerNameTemp, setPlayerNameTemp] = useState('');
    const [playerNumber, setPlayerNumber] = useState(1);

    const [players, setPlayers] = useState([]);

    // Popup modalVisible
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetch('https://opentdb.com/api_category.php')
            .then(response => response.json())
            .then(data => {
                setCategories(data.trivia_categories);
                console.log(categories);
            })
            .catch(err => console.error(err));
    }, []);

    /*const addPlayers = () => {
        //Generate id for player
        let playerNameGenerator = "player" + playerNumber
        setPlayerNumber(playerNumber + 1);
        
        //console.log(playerNames);
        //Save the player name and id to a list
        setPlayerNames([...playerNames, { id: playerNameGenerator, name: playerNameTemp }]);

        //Empty add player textinput
        setPlayerNameTemp('');
    }*/

    const addPlayer = () => {
        //Generate id for player
        let playerNameGenerator = "player" + playerNumber
        setPlayerNumber(playerNumber + 1);
        
        //Save the player name and id to a list
        setPlayers([...players, { id: playerNameGenerator, name: playerNameTemp, drink: selectedDrink, points: 0, powerup: "" }]);

        //Empty add player textinput
        setPlayerNameTemp('');
        setModalVisible(!modalVisible)
        console.log(players);
    }

    // Drinks data
    const drinks = [
    { label: 'Mild (Beer, Cider etc.)', value: 'Mild' },
    { label: 'Medium (Wine etc.)', value: 'Medium' },
    { label: 'Strong (Spririts, Liquor etc.)', value: 'Strong' },
    ];

    // Difficulty data
    const difficulty = [
    { label: 'Easy', value: 'Easy' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Hard', value: 'Hard' },
    ];

    // set number of guestions per player
    const setNumberOfQuestions = () => {
        setSelectedNum(selectedNum)
    }

    // Category options
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selected, setSelected] = useState([]);

    /*
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
    */

    // choose a random category from the categories
    const randomCategory = () => {
        const random = Math.floor(Math.random() * categories.length);
        return categories[random].id;
    }

    /*
    if (selectedCategories.length > 0) {
        console.log(selectedCategories);
        return selectedCategories;
    } else {
        return randomCategory();
    }
    */

    // start game and pass params to PartyModeScreen
    const startGame = () => {
        navigation.navigate('PartyModeGame', {
            selectedCategories,
            selectedDifficulty,
            selectedDrink,
            playerNames,
            selectedNum,
        });
    }

    return (
        <SafeAreaView style={Styles.partyOptionsContainer}>
            <ScrollView style={Styles.scrollView}>
                {/* Players */}
                <View style={Styles.playerNames}>
                    <Text style={Styles.title}>Players:</Text>
                    <FlatList
                        style={{ marginLeft: "5%" }}
                        data={players}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <View style={Styles.playerContainer}>
                                <Text style={ Styles.flatlistPlayerNames }>{item.name}</Text>
                                <Text style={ Styles.flatlistPlayerNames }>Drinks: {item.drink}</Text>
                                <Text style={{ color: '#3c87c2' }} onPress={() => deletePlayer(item.id)}>delete</Text>
                            </View>}
                    />
                </View>
                <View style={Styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={Styles.centeredView}>
                        <View style={Styles.modalView}>
                            <TextInput
                            placeholderTextColor={'black'}
                            style={Styles.addPlayers}
                            placeholder='Insert player name'
                            onChangeText={playerNameTemp => setPlayerNameTemp(playerNameTemp)}
                            value={playerNameTemp} />
                            <Dropdown
                                style={Styles.dropdownDrinks}
                                placeholderStyle={Styles.placeholderStyleDropdownDrinks}
                                selectedTextStyle={Styles.selectedTextStyleDropdownDrinks}
                                iconStyle={Styles.iconStyleDropdownDrinks}
                                data={drinks}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select drink"
                                value={selectedDrink}
                                onChange={item => {
                                    setSelectedDrink(item.value);
                                }}
                            />
                            <Pressable
                            style={[Styles.buttonpopup, Styles.buttonClose]}
                            onPress={addPlayer}
                            >
                            <Text style={Styles.textStyle}>Save player</Text>
                            </Pressable>
                        </View>
                        </View>
                    </Modal>
                    <Pressable
                        style={[Styles.buttonpopup, Styles.buttonOpen]}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={Styles.textStyle}>Add players</Text>
                    </Pressable>
                </View>

                {/* Select number of questions */}
                <SafeAreaView style={Styles.questionContainer}>
                <Text style={Styles.title}>Questions per Player</Text>
                <TextInput
                    keyboardType="number-pad"
                    style={Styles.addNumber}
                    onChangeText={selectedNum => setSelectedNum(Number(selectedNum))}
                    value={selectedNum}
                />
                <Button
                    title='Set'
                    type="outline"
                    onPress={setNumberOfQuestions}
                />
                </SafeAreaView>

                {/* Select categories */}
                <View style={Styles.categoryContainer}>
                <Text style={Styles.normalText}>Choose your categories</Text>
                <MultiSelect
                    style={Styles.dropdown}
                    placeholderStyle={Styles.placeholderStyleDropdown}
                    selectedTextStyle={Styles.selectedTextStyleDropdown}
                    iconStyle={Styles.iconStyleDropdown}
                    data={categories}
                    labelField="name"
                    valueField="id"
                    placeholder="Select categories"
                    value={selected}
                    onChange={item => {
                        setSelected(item);
                        setSelectedCategories([...selectedCategories, {id: item}]);
                        console.log(selectedCategories);
                    }}
                    selectedStyle={Styles.selectedStyleDropdown}
                />
                </View>

                {/* Select difficulty */}
                <View style={Styles.difficultyContainer}>
                <Text style={Styles.title}>Difficulty</Text>
                <Dropdown
                    style={Styles.dropdown}
                    placeholderStyle={Styles.placeholderStyleDropdown}
                    selectedTextStyle={Styles.selectedTextStyleDropdown}
                    iconStyle={Styles.iconStyleDropdown}
                    data={difficulty}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select difficulty"
                    value={selectedDifficulty}
                    onChange={item => {
                        setSelectedDifficulty(item.value);
                    }}
                />
                </View>
                <View style={Styles.startGamePContainer}>
                <Button
                    type="outline"
                    title='Start game'
                    onPress={startGame}
                />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


