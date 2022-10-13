import { useEffect, useState, useRef } from 'react';
import { SafeAreaView, Button, Text, View, TextInput, FlatList } from 'react-native';
import Styles from './Styles';
import {Picker} from '@react-native-picker/picker';

export default function PartyModeOptions( { navigation }) {

    // Variables for gameoptions
    const [selectedDrink, setSelectedDrink] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const pickerRef = useRef();

    // const category = selectedCategory;
    // const difficulty = selectedDifficulty;

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
        //Generate id for player
        let playerNameGenerator = "player" + playerNumber
        setPlayerNumber(playerNumber + 1);
        
        //console.log(playerNames);
        //Save the player name and id to a list
        setPlayerNames([...playerNames, { id: playerNameGenerator, name: playerNameTemp }]);

        //Empty add player textinput
        setPlayerNameTemp('');
    }

    // start game and pass params to PartyModeScreen
    const startGame = () => {
        navigation.navigate('PartyModeGame', {
            selectedCategory,
            selectedDifficulty,
            selectedDrink,
            playerNames,
        });
    }

    return(
        <SafeAreaView style={Styles.partyOptionsContainer}>
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
            <View style={Styles.otherOptionsContainer}>
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

            <Text style={Styles.title}>Category</Text>
                <Picker
                    style={Styles.picker} itemStyle={{height: 60}}
                    ref={pickerRef}
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedCategory(itemValue)
                }>
                {/*Muutokset näihin, alustavat vaan */}
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
            </View>
        </SafeAreaView>
    );
}

