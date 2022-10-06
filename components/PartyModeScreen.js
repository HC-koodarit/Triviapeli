import React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, Button, Text, View, TextInput, Alert } from 'react-native';
import CountDown from 'react-native-countdown-component';
import Styles from './Styles.js';
import PartyModeOptions from './PartyModeOptions.js';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import { app } from '../firebase/firebaseconfig.js';

export default function PartyModeScreen({ route, navigation }) {

    // passed params from ParyModeOptions
    const { selectedCategory, selectedDifficulty, selectedDrink, selectedNum } = route.params;

    const [firebasePoints, setFirebasePoints] = useState([]);
    const [points, setPoints] = useState('');
    // Initialize Firebase
    
    const database = getDatabase(app);

    //Use Effect for database connection
    useEffect(() => {
        const itemsRef = ref(database, 'points/');
        onValue(itemsRef, (snapshot) => {
        const data = snapshot.val();
        const items = data ? Object.keys(data).map(id => ({ id, ...data[id]})) : [];
        setFirebasePoints(items);
        })
    }, []);

    //Save item to firebase realtime database
    const saveItem = () => {
        push(
        ref(database, 'points/'),
        { 'points': points });
    }

    /*
    const getCustomQuestion = () => {
        fetch(`https://opentdb.com/api.php?amount=1&category=${selectedCategory}&difficulty=${selectedDifficulty`)
    }
    */

    return(
        <View style={Styles.container}>
            <Text style={Styles.normalText}>Drink: {selectedDrink}</Text>
            <Text style={Styles.normalText}>Category: {selectedCategory}</Text>
            <Text style={Styles.normalText}>Difficulty: {selectedDifficulty}</Text>
            <Text style={Styles.normalText}>Questins per Player: {selectedNum}</Text>
            <TextInput
                style={Styles.textInput}
                placeholder='Amount'
                onChangeText={points => setPoints(points) }
            />
            <Button title="Save" onPress= {saveItem} />
        </View>
    );
};

