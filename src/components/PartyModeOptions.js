import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, TextInput, FlatList, ScrollView, Modal, Pressable, Image, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Styles from './Styles';
import { MultiSelect, Dropdown } from 'react-native-element-dropdown';
import { DrinkImages } from '../images/DrinkImages';
import { MaterialIcons } from '@expo/vector-icons';

export default function PartyModeOptions({ route, navigation }) {

    // Variables for gameoptions
    const [selectedDrink, setSelectedDrink] = useState('');
    const [drinkImage, setDrinkImage] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState('');

    //Add player variables
    const [playerNameTemp, setPlayerNameTemp] = useState('');
    const [playerNumber, setPlayerNumber] = useState(0);
    const [playerDetails, setPlayerDetails] = useState([]);

    // Category options
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Popup modalVisible
    const [modalVisible, setModalVisible] = useState(false);

    // get categories
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
        setPlayerDetails([...playerDetails,
        {
            id: playerNameGenerator,
            name: playerNameTemp,
            drink: selectedDrink,
            image: drinkImage,
            points: 0,
            streak: 0,
            wrongAnswer: 0
        }
        ]);

        //Empty add player textinput
        setPlayerNameTemp('');
        setModalVisible(!modalVisible);
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
        { label: 'Strong (>20%)', value: 'Strong' }
    ];

    // Difficulty data
    const difficulty = [
        { label: 'Easy', value: 'easy' },
        { label: 'Medium', value: 'medium' },
        { label: 'Hard', value: 'hard' }
    ];

    // start game and pass params to PartyModeScreen
    const startGame = () => {
        if (playerDetails.length <= 1) {
            alert('Please add at least two players');
        } else if (selectedCategories.length == 0) {
            alert('Please select at least one category')
        } else {
            navigation.navigate('PartyModeGame', {
                selectedCategories,
                selectedDifficulty,
                playerDetails
            });
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
            {/* List of players */}
            <Text style={Styles.playersTitle}>Players</Text>
            <View style={Styles.AddPlayerButtonContainer}>
                <Pressable
                    title="Add Player"
                    style={[Styles.buttonpopup, Styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}
                >
                <Text 
                    style={Styles.textStyle}>Add player {" "}  
                    <Icon
                        name='person-add-outline'
                        type='ionicon'
                        color='white'
                        size={15}
                    />
                </Text>
                </Pressable>
            </View>
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
                            <Text style={Styles.flatlistPlayerNames}>    </Text>
                            <MaterialIcons
                                name="cancel"
                                size={20}
                                color="#990808"
                                onPress={() => deletePlayer(item.id)}
                            />
                        </View>
                    }
                />
                <View style={Styles.modalView}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}>
                        <Pressable style={Styles.outsideModal}
                            onPress={(event) => {
                                if (event.target == event.currentTarget) {
                                    setModalVisible(false);
                                }
                            }} >

                            {/* Add a new player */}
                            <View style={Styles.modal}>
                                <View style={Styles.modalHeader}>
                                    <View style={Styles.modalHeaderContent}>
                                        <Text>Add player</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <Text style={Styles.modalHeaderCloseText}>X</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={Styles.modalContent}>
                                    <TextInput
                                        placeholderTextColor={'grey'}
                                        style={Styles.addPlayers}
                                        placeholder='Name'
                                        onChangeText={playerNameTemp => setPlayerNameTemp(playerNameTemp)}
                                        value={playerNameTemp} />
                                    <Dropdown
                                        style={Styles.dropdownDrinks}
                                        selectedTextStyle={Styles.selectedTextStyleDropdownDrinks}
                                        iconStyle={Styles.iconStyleDropdownDrinks}
                                        activeColor={'#99cfe0'}
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
                                        onPress={addPlayer} >
                                        <Text style={Styles.textStyle}>Save player</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Pressable>
                    </Modal>
                </View>

            </View>

            {/* Select categories */}
            <Text style={Styles.optionsSubTitle}>Categories</Text>
            <ScrollView style={Styles.categoryContainer}>
                <View>
                    <MultiSelect
                        style={Styles.dropdown}
                        placeholderStyle={Styles.placeholderStyleDropdown}
                        selectedTextStyle={Styles.selectedTextStyleDropdown}
                        selectedStyle={Styles.selectedStyleDropdown}
                        iconStyle={Styles.iconStyleDropdown}
                        activeColor={'#99cfe0'}
                        data={categories}
                        labelField="name"
                        valueField="id"
                        placeholder="Select categories"
                        value={selectedCategories}
                        onChange={item => {
                            setSelectedCategories(item);
                        }}
                    />
                </View>
                </ScrollView>
                <View style={Styles.buttonContainer}>
                    <Button
                        title="Select all"
                        onPress={selectAll}
                        buttonStyle={Styles.selectCategoriesButton}
                    />
                    <Button
                        title="Deselect all"
                        onPress={deselectAll}
                        buttonStyle={Styles.selectCategoriesButton}
                    />
                </View>



            {/* Select difficulty */}
            <View style={Styles.difficultyContainer}>
                <Text style={Styles.optionsSubTitle}>Difficulty</Text>
                <Dropdown
                    style={Styles.dropdownDifficulty}
                    placeholderStyle={Styles.placeholderStyleDropdown}
                    selectedTextStyle={Styles.selectedTextDropdownDifficulty}
                    iconStyle={Styles.iconStyleDropdown}
                    activeColor={'#99cfe0'}
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

            {/* Start and Back buttons */}
            <View style={Styles.startGamePContainer}>
                <Button
                    title='Back'
                    titleStyle={Styles.homeTitle}
                    buttonStyle={Styles.backButton}
                    onPress={() => navigation.navigate('Home')}
                />
                <Button
                    title='Start'
                    icon={{
                        name: 'play',
                        type: 'font-awesome',
                        size: 20,
                        color: 'white',
                    }}
                    iconContainerStyle={{ marginRight: 10 }}
                    titleStyle={Styles.homeTitle}
                    buttonStyle={Styles.startButton}
                    onPress={startGame}
                />
            </View>
        </SafeAreaView>
    );
}