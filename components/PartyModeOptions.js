import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, TextInput, FlatList, ScrollView, Modal, Pressable, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from './Styles';
import { MultiSelect, Dropdown } from 'react-native-element-dropdown';
import { DrinkImages } from './DrinkImages';

export default function PartyModeOptions({ route, navigation }) {

    // Variables for gameoptions
    const [selectedDrink, setSelectedDrink] = useState('');
    const [drinkImage, setDrinkImage] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState('');

    //Add player variables
    const [playerNameTemp, setPlayerNameTemp] = useState('');
    const [playerNumber, setPlayerNumber] = useState(1);

    const [playerDetails, setPlayerDetails] = useState([]);

    // Category options
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selected, setSelected] = useState([]);

    // Popup modalVisible
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetch('https://opentdb.com/api_category.php')
            .then(response => response.json())
            .then(data => {
                setCategories(data.trivia_categories);
            })
            .catch(err => console.error(err));
    }, []);

    const addPlayer = () => {
        //Generate id for player
        let playerNameGenerator = "player" + playerNumber
        setPlayerNumber(playerNumber + 1);

        if (selectedDrink === '') {
            alert('Please choose a drink');
            return;
        }
        if (playerNameTemp === '') {
            alert('Please enter a name');
            return;
        }
        if (playerDetails.find(playerDetails => playerDetails.name === playerNameTemp)) {
            alert('Name already in use');
            return;
        }

        //Save the player name and id to a list
        setPlayerDetails([...playerDetails, { id: playerNameGenerator, name: playerNameTemp, drink: selectedDrink, image: drinkImage, points: 0, powerup: "" }]);

        //Empty add player textinput
        setPlayerNameTemp('');
        setModalVisible(!modalVisible)
        //console.log(players);
    }

    const deletePlayer = (id) => {
        const filteredData = playerDetails.filter(item => item.id !== id);
        //Updating List Data State with NEW Data.
        setPlayerDetails(filteredData);
    }

    // Drinks data
    const drinks = [
        { label: 'Mild (<10%)', value: 'Mild' },
        { label: 'Medium (10%–20%)', value: 'Medium' },
        { label: 'Strong (>20%)', value: 'Strong' },
    ];

    // Difficulty data
    const difficulty = [
        { label: 'Easy', value: 'easy' },
        { label: 'Medium', value: 'medium' },
        { label: 'Hard', value: 'hard' },
    ];

    // choose a random category from the categories
    const randomCategory = () => {
        const random = Math.floor(Math.random() * categories.length);
        return categories[random].id;
    }

    // start game and pass params to PartyModeScreen
    const startGame = () => {
        if (playerDetails.length > 1) {
            navigation.navigate('PartyModeGame', {
                selectedCategories,
                selectedDifficulty,
                playerDetails,
            });
        } else {
            alert('Please add at least two players');
        }
    }

    // select and deselect all categories
    const selectAll = () => {
        setSelectedCategories(categories.map(category => category.id));
    }
    const deselectAll = () => {
        setSelectedCategories([]);
    }

    return (
        <SafeAreaView style={Styles.partyOptionsContainer}>
            {/* Players */}
            <Text style={Styles.playersTitle}>Players</Text>
            <View style={Styles.playerNames}>
                <FlatList
                    style={Styles.playerFlatlist}
                    data={playerDetails}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <View style={Styles.playerContainer}>
                            <Text style={Styles.flatlistPlayerNames}>{item.name} </Text>
                            <Text style={Styles.flatlistPlayerNames}> - {item.drink} </Text>
                            <Image source={item.image} style={Styles.playerDrinkImage} />
                            <Text style={{ color: '#3c87c2' }} onPress={() => deletePlayer(item.id)}>  delete</Text>
                        </View>
                    }
                />
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
                                    setDrinkImage(DrinkImages[item.value.toLowerCase()]?.uri);
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
                <View style={Styles.AddPlayerButtonContainer}>
                    <Pressable
                            title="Add Player"
                            style={[Styles.buttonpopup, Styles.buttonOpen]}
                            onPress={() => setModalVisible(true)}
                        >
                        <Text style={Styles.textStyle}>Add player</Text>
                    </Pressable>
                </View>
            </View>

            {/* Select categories */}
            <ScrollView style={Styles.categoryContainer}>
                <Text style={Styles.optionsSubTitle}>Categories</Text>
                <MultiSelect
                    style={Styles.dropdown}
                    placeholderStyle={Styles.placeholderStyleDropdown}
                    selectedTextStyle={Styles.selectedTextStyleDropdown}
                    iconStyle={Styles.iconStyleDropdown}
                    data={categories}
                    labelField="name"
                    valueField="id"
                    placeholder="Select categories"
                    value={selectedCategories}
                    onChange={item => {
                        setSelectedCategories(item);
                    }}
                    selectedStyle={Styles.selectedStyleDropdown}
                />
                <View style={Styles.buttonContainer}>
                    <Button
                        title="Select all"
                        onPress={selectAll}
                        color="#3c87c2"
                    />
                    <Button
                        title="Deselect all"
                        onPress={deselectAll}
                        color="#3c87c2"
                    />
                </View>
            </ScrollView>
           

            {/* Select difficulty */}
            <View style={Styles.difficultyContainer}>
                <Text style={Styles.optionsSubTitle}>Difficulty</Text>
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
                    title='Start'
                    icon={{
                        name: 'play',
                        type: 'font-awesome',
                        size: 20,
                        color: 'white',
                    }}
                    iconContainerStyle={{ marginRight: 10 }}
                    titleStyle={{ fontWeight: '700' }}
                    buttonStyle={{
                        backgroundColor: '#ff6303',
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 30,
                    }}
                    containerStyle={{
                        width: 140,
                        marginRight: 5,
                    }}
                    onPress={startGame}
                />
                <Button
                    title='Back'
                    titleStyle={{ fontWeight: '700' }}
                    buttonStyle={{
                        backgroundColor: '#ff3333',
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 30,
                    }}
                    containerStyle={{
                        width: 140,
                        marginLeft: 5,
                    }}
                    onPress={() => navigation.navigate('Home')}
                />
            </View>
        </SafeAreaView>
    );
}