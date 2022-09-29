import { useEffect, useState, useRef } from 'react';
import { SafeAreaView, Button, Text, View, TextInput } from 'react-native';
import Styles from './Styles';
import {Picker} from '@react-native-picker/picker';

export default function PartyModeOptions( { navigation }) {

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
        //console.log(playerNames);
        const newList = playerNames.concat({ Name: playerNameTemp, id: playerNameGenerator });

        setPlayerNames(newList);
        setPlayerNameTemp('');
    }

    return(
        <View style={Styles.container}>
            <Text style={Styles.title}>Players</Text>
            <TextInput
                style={Styles.addPlayers}
                placeholder='Add player'
                onChangeText={playerNameTemp => setPlayerNameTemp(playerNameTemp)}
                value={playerNameTemp}/>
            <Button
                title={"Add"}
                onPress={addPlayers} >
            </Button>

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
                <Picker.Item label="1" value="" />
                <Picker.Item label="2" value="" />
                <Picker.Item label="3" value="" />
                </Picker>

            <Text style={Styles.title}>Difficulty</Text>
                <Picker
                    style={Styles.picker} itemStyle={{height: 60}}
                    ref={pickerRef}
                    selectedValue={selectedDifficulty}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedDifficulty(itemValue)
                }>
                <Picker.Item label="Easy" value="Easy" />
                <Picker.Item label="Medium" value="Medium" />
                <Picker.Item label="Hard" value="Hard" />
                </Picker>
            
            <Button
                style={Styles.buttons}
                title='Start game'
                onPress={() => navigation.navigate('PartyModeGame')}
            />
        </View>
    );
}

