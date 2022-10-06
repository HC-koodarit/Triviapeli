import { useEffect, useState, useRef } from 'react';
import { SafeAreaView, Button, Text, View, TextInput, FlatList, ScrollView } from 'react-native';
import Styles from './Styles';
import {Picker} from '@react-native-picker/picker';

export default function PartyModeOptions( { navigation }) {

    // Variables for gameoptions
    const [selectedNum, setSelectedNum] = useState(0);
    const [selectedDrink, setSelectedDrink] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const pickerRef = useRef();

    //Add player variables
    const [playerNames, setPlayerNames] = useState([]);
    const [playerNameTemp, setPlayerNameTemp] = useState('');
    const [playerNumber, setPlayerNumber] = useState(1);

    function open() {
       pickerRef.current.focus();
    }

    function close() {
       pickerRef.current.blur();
    }

    const addPlayers = () => {
        let playerNameGenerator = "player" + playerNumber
        //setPlayerNameGenerator("player" + playerNumber);
        setPlayerNumber(playerNumber + 1);
        //setPlayerNames({${playerNameGenerator}: playerNameTemp});
        //setPlayerNameTemp('');
        console.log(playerNames);
        setPlayerNames([...playerNames, { name: playerNameTemp, id: playerNameGenerator }]);

        setPlayerNameTemp('');
    }

    // start game and pass params to PartyModeScreen
    const startGame = () => {
        navigation.navigate('PartyModeGame', {
            selectedCategory,
            selectedDifficulty,
            selectedDrink,
            selectedNum,
        });
    }

    const setNumberOfQuestions = () => {
        setSelectedNum(selectedNum)
    }

    return(
        <SafeAreaView style={Styles.partyOptionsContainer}>
        <ScrollView style={Styles.scrollView}>
            <View style={Styles.playerNames}>
            <Text style={Styles.title}>Players:</Text>
            <FlatList
                data={playerNames}
                renderItem={({ item }) =>
                    <Text style={Styles.flatlistPlayerNames}>{item.name}</Text>
                }
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
                    style={Styles.picker} itemStyle={{height: 60}}
                    ref={pickerRef}
                    selectedValue={selectedDrink}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedDrink(itemValue)
                }>
                    <Picker.Item label="Mild (Beer, Cider etc.)" value="Mild" />
                    <Picker.Item label="Medium (Wine etc.)" value="Medium" />
                    <Picker.Item label="Strong (Spririts, Liquor etc.)" value="Strong" />
                </Picker>

            {/*  TÄMÄN POISTO */}
            <Text style={Styles.title}>Category</Text>
                <Picker
                    style={Styles.picker} itemStyle={{height: 60}}
                    ref={pickerRef}
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedCategory(itemValue)
                }>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                </Picker>

            <Text style={Styles.title}>Difficulty</Text>
                <Picker
                    style={Styles.picker} itemStyle={{height: 60}}
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

