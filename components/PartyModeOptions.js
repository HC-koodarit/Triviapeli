import { useEffect, useState, useRef } from 'react';
import { SafeAreaView, Text, View, TextInput, FlatList, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from './Styles';
//import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
//import { app } from '../firebase/firebaseconfig.js';
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
    
    //const [firebasePlayers, setFirebasePlayers] = useState([]);
    //const pickerRef = useRef();
    /*Firebase
    // Initialize Firebase
    const database = getDatabase(app);

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }

    //Use Effect for database connection
    useEffect(() => {
        const itemsRef = ref(database, 'players/');
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            const playerNames = data ? Object.keys(data).map(id => ({ id, ...data[id] })) : [];
            setFirebasePlayers(playerNames);
        })
    }, []);

    const deletePlayer = (item) => {
      console.log(item);
      remove(ref(database, 'players/' + item))
      .then(function() {
        console.log("Remove succeeded.")
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message)
      });
  }*/

    const addPlayers = () => {
        //Generate id for player
        let playerNameGenerator = "player" + playerNumber
        setPlayerNumber(playerNumber + 1);
        
        //console.log(playerNames);
        //Save the player name and id to a list
        setPlayerNames([...playerNames, { id: playerNameGenerator, name: playerNameTemp }]);

        /*
        push(
            ref(database, 'players/'),
            { 'name': playerNameTemp, 'id': playerNameGenerator });*/

        //Empty add player textinput
        setPlayerNameTemp('');
    }

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

    useEffect(() => {
        fetch('https://opentdb.com/api_category.php')
            .then(response => response.json())
            .then(data => {
                setCategories(data.trivia_categories);
                console.log(categories);
            })
            .catch(err => console.error(err));
    }, []);

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

    return (
        <SafeAreaView style={Styles.partyOptionsContainer}>
            <ScrollView style={Styles.scrollView}>
                {/* Players */}
                <View style={Styles.playerNames}>
                    <Text style={Styles.title}>Players:</Text>
                    <FlatList
                        style={{ marginLeft: "5%" }}
                        data={playerNames}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <View style={Styles.playerContainer}>
                                <Text style={ Styles.flatlistPlayerNames }>{item.name}</Text>
                                <Text style={{ color: '#3c87c2' }} onPress={() => deletePlayer(item.id)}>delete</Text>
                            </View>}
                    />
                </View>
                <View style={Styles.playerContainer}>
                    <TextInput
                        placeholderTextColor={'white'}
                        style={Styles.addPlayers}
                        placeholder='Add player'
                        onChangeText={playerNameTemp => setPlayerNameTemp(playerNameTemp)}
                        value={playerNameTemp} />
                    <Button
                        title={"Add"}
                        type="outline"
                        onPress={addPlayers} >
                    </Button>
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
                
                {/* Select drink */}
                <View style={Styles.drinkContainer}>
                <Text style={Styles.title}>Drink</Text>
                <Dropdown
                    style={Styles.dropdown}
                    placeholderStyle={Styles.placeholderStyleDropdown}
                    selectedTextStyle={Styles.selectedTextStyleDropdown}
                    iconStyle={Styles.iconStyleDropdown}
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
                </View>

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


