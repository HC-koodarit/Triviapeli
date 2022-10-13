import React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, Button, Text, View, TextInput, Alert } from 'react-native';
import CountDown from 'react-native-countdown-component';
import Styles from './Styles.js';
import PartyModeOptions from './PartyModeOptions.js';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import { app } from '../firebase/firebaseconfig.js';

export default function PartyModeScreen({ route, navigation, params }) {

    // passed params from PartyModeOptions
    const { selectedCategory, selectedDifficulty, selectedDrink, playerNames} = route.params;
    const [activePlayer, setActivePlayer] = useState(0);

    const [firebasePoints, setFirebasePoints] = useState([]);
    const [points, setPoints] = useState('');
    
    // Initialize Firebase
    const database = getDatabase(app);

    // Use Effect for database connection
    useEffect(() => {
        const itemsRef = ref(database, 'points/');
        onValue(itemsRef, (snapshot) => {
        const data = snapshot.val();
        const items = data ? Object.keys(data).map(id => ({ id, ...data[id]})) : [];
        setFirebasePoints(items);
        })
    }, []);

    // Save item to firebase realtime database
    const saveItem = () => {
        push(
        ref(database, 'points/'),
        { 'points': points });
    }

    return(
        <View style={Styles.container}>
            <Text style={Styles.normalText}>Player: {activePlayer}</Text>
            <Text style={Styles.normalText}>Drink: {selectedDrink}</Text>
            <Text style={Styles.normalText}>Categories: {selectedCategories}</Text>
            <Text style={Styles.normalText}>Difficulty: {selectedDifficulty}</Text>
            <Text style={Styles.normalText}>Questions per Player: {selectedNum}</Text>
            <TextInput
                style={Styles.textInput}
                placeholder='Amount'
                onChangeText={points => setPoints(points) }
            />
            <Button title="Save" onPress= {saveItem} />
        </View>
    );
};