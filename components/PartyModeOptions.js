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
            <Text style={Styles.title}>Players:</Text>
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
            <View style={{ borderWidth: 1, borderColor: 'white', borderRadius: 4 }}>
                <Picker
                    style={Styles.picker}
                    ref={pickerRef}
                    selectedValue={selectedDrink}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedDrink(itemValue)
                }>
                <Picker.Item label="Mild" value="Mild" />
                <Picker.Item label="Medium" value="Medium" />
                <Picker.Item label="Strong" value="Strong" />
                </Picker>
            </View>

            <Text style={Styles.title}>Category</Text>
            
            <Text style={Styles.title}>Difficulty</Text>
            
            <Button
                title='Start game'
                onPress={() => navigation.navigate('PartyModeGame')}
            />
        </View>
    );
}

