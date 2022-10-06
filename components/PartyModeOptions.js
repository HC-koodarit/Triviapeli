import { useEffect, useState, useRef } from 'react';
import { SafeAreaView, Button, Text, View, TextInput, FlatList, ScrollView } from 'react-native';
import Styles from './Styles';
import {Picker} from '@react-native-picker/picker';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import { app } from '../firebase/firebaseconfig.js';

export default function PartyModeOptions({ route, navigation }) {

    // Variables for gameoptions
    const [selectedNum, setSelectedNum] = useState(0);
    const [selectedDrink, setSelectedDrink] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const pickerRef = useRef();
    const { selectedCategories } = route.params;

    //Add player variables
    const [playerNames, setPlayerNames] = useState([]);
    const [playerNameTemp, setPlayerNameTemp] = useState('');
    const [playerNumber, setPlayerNumber] = useState(1);
    const [firebasePlayers, setFirebasePlayers] = useState([]);

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
        const playerNames = data ? Object.keys(data).map(id => ({ id, ...data[id]})) : [];
        setPlayerNames(playerNames);
        })
    }, []);


    const addPlayers = () => {
        let playerNameGenerator = "player" + playerNumber
        //setPlayerNameGenerator("player" + playerNumber);
        setPlayerNumber(playerNumber + 1);
        //setPlayerNames({${playerNameGenerator}: playerNameTemp});
        //setPlayerNameTemp('');
        //console.log(playerNames);
        //setPlayerNames([...playerNames, { name: playerNameTemp, id: playerNameGenerator }]);

        push(
            ref(database, 'players/'),
            { 'name': playerNameTemp, 'id': playerNameGenerator });

        setPlayerNameTemp('');
    }

    // start game and pass params to PartyModeScreen
    const startGame = () => {
        navigation.navigate('PartyModeGame', {
            categories,
            selectedDifficulty,
            selectedDrink,
            selectedNum,
        });
    }

    // set number of guestions per player
    const setNumberOfQuestions = () => {
        setSelectedNum(selectedNum)
    }

    return(
        <SafeAreaView style={Styles.partyOptionsContainer}>
        <ScrollView style={Styles.scrollView}>
            <View style={Styles.playerNames}>
            <Text style={Styles.title}>Players:</Text>
            <FlatList
                style={{marginLeft : "5%"}}
                data={playerNames}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                <View style={Styles.playerContainer}>
                    <Text style={Styles.flatlistPlayerNames}>{item.name}</Text>
                    <Text style={{color: '#0000ff'}} onPress={() => deleteItem(item.id)}>delete</Text>
                </View>}
            />
            </View>
            <View style={Styles.playerContainer}>
            <TextInput
                placeholderTextColor={'white'}
                style={Styles.addPlayers}
                placeholder='Add player'
                onChangeText={playerNameTemp => setPlayerNameTemp(playerNameTemp)}
                value={playerNameTemp}/>
            <Button
                title={"Add"}
                onPress={addPlayers} >
            </Button>
            </View>
            <Text style={Styles.title}>Questions per Player</Text>
                <TextInput
                    keyboardType='number-pad'
                    style={Styles.addNumber}
                    onChangeText={selectedNum => setSelectedNum(Number(selectedNum))}
                    value={selectedNum} 
                />
            <Button
                style={Styles.buttons}
                title='Set'
                onPress={setNumberOfQuestions}
            />
            <Text style={Styles.title}>Drink</Text>
                <Picker
                    style={Styles.pickerPartyMode} itemStyle={{height: 60}}
                    ref={pickerRef}
                    selectedValue={selectedDrink}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedDrink(itemValue)
                }>
                    <Picker.Item label="Mild (Beer, Cider etc.)" value="Mild" />
                    <Picker.Item label="Medium (Wine etc.)" value="Medium" />
                    <Picker.Item label="Strong (Spririts, Liquor etc.)" value="Strong" />
                </Picker>

            {/* TODO: Select categories */}
            <Button
                title='Select categories'
                onPress={() => navigation.navigate('Categories')}
            />

            <Button
                title='show categories'
                onPress={console.log(categories)}
            />

            <Text style={Styles.title}>Difficulty</Text>
                <Picker
                    style={Styles.pickerPartyMode} itemStyle={{height: 60}}
                    ref={pickerRef}
                    selectedValue={selectedDifficulty}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedDifficulty(itemValue)
                }>
                {/*Muutokset näihin, alustavat vaan */}
                    <Picker.Item label="Easy" value="Easy" />
                    <Picker.Item label="Medium" value="Medium" />
                    <Picker.Item label="Hard" value="Hard" />
                </Picker>
            
            <Button
                style={Styles.buttons}
                title='Start game'
                onPress={startGame}
            />
        </ScrollView>
        </SafeAreaView>
    );
}

