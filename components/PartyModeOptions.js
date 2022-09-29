import { useEffect, useState, useRef } from 'react';
import { SafeAreaView, Button, Text, View, TextInput } from 'react-native';
import Styles from './Styles';
import {Picker} from '@react-native-picker/picker';

export default function PartyModeOptions( { navigation }) {

    const [selectedDrink, setSelectedDrink] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');

     //Add player variables
     const [playerNames, setPlayerNames] = useState([]);
     const [playerNameTemp, setPlayerNameTemp] = useState('');
     const [playerNumber, setPlayerNumber] = useState(1);

     const pickerRef = useRef();

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
            <Text style={Styles.title}>Pick your drink:</Text>
            <TextInput
                style={Styles.addPlayers}
                placeholder='Add player'
                onChangeText={playerNameTemp => setPlayerNameTemp(playerNameTemp)}
                value={playerNameTemp}/>
            <Button
                title={"Add"}
                onPress={addPlayers} >
            </Button>

            <Text style={Styles.title}>Pick your drink:</Text>
            <View style={{ borderWidth: 1, borderColor: 'white', borderRadius: 4 }}>
                <Picker
                style={Styles.picker}
                ref={pickerRef}
                selectedValue={selectedDrink}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedDrink(itemValue)
                }>
                <Picker.Item label="Beer / Cider / Long drink" value="Beer / Cider / Long drink" />
                <Picker.Item label="Shots" value="Shots" />
                <Picker.Item label="Mixed drinks" value="Mixed drinks" />
                </Picker>
            </View>

            <Text style={Styles.title}>Pick category:</Text>
            
            <Text style={Styles.title}>Pick difficulty:</Text>
            
            <Button
                title='Start game'
                onPress={() => navigation.navigate('PartyModeGame')}
            />
        </View>
    );
}

