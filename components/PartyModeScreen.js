import React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, Button, Text, View, TextInput, Alert } from 'react-native';
import CountDown from 'react-native-countdown-component';
import Styles from './Styles.js';
import PartyModeOptions from './PartyModeOptions.js';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import { app } from '../firebase/firebaseconfig.js';
import * as SQLite from 'expo-sqlite';

export default function PartyModeScreen({ route, navigation, params }) {

    // passed params from PartyModeOptions
    const { selectedCategory, selectedDifficulty, selectedDrink, playerNames } = route.params;
    const [activePlayer, setActivePlayer] = useState(0);

    const [firebasePoints, setFirebasePoints] = useState([]);
    const [points, setPoints] = useState('');


    // ---TÄSTÄ ALKAA SQLITE-HOMMELIT---
    // make player profile for each player and use sqlite to store the data
    const db = SQLite.openDatabase('players.db');

    // create table for players
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                'create table if not exists players (id integer primary key not null, name text, points int, powerup text, drink text);'
            );
        });
    }, []);

    // insert player profiles into the table
    const insertPlayer = (name, points, powerup, drink) => {
        db.transaction(tx => {
            tx.executeSql(
                'insert into players (name, points, powerup, drink) values (?, ?, ?, ?);',
                [playerNames[0], 0, 'none', 'none'],
                null,
                null
            );
        });
    }

    // update player profiles
    const updatePlayer = (id, name, points, powerup, drink) => {
        db.transaction(tx => {
            tx.executeSql(
                'update players set name = ?, points = ?, powerup = ?, drink = ? where id = ?;',
                [name, points, powerup, drink, id],
                null,
                null
            );
        });
    }

    // delete player profiles
    const deletePlayer = (id) => {
        db.transaction(tx => {
            tx.executeSql(
                'delete from players where id = ?;',
                [id],
                null,
                null
            );
        });
    }

    // get all player profiles
    const getPlayers = () => {
        db.transaction(tx => {
            tx.executeSql(
                'select * from players;',
                [],
                (_, { rows: { _array } }) => setPlayers(_array),
                null,
                null
            );
        });
    }
    
    // get all player profiles from the table
    useEffect(() => {
        getPlayers();
    }, []);

    // ---TÄHÄN LOPPUU SQLITE-HOMMELIT---




    // Initialize Firebase
    const database = getDatabase(app);

    // Use Effect for database connection
    useEffect(() => {
        const itemsRef = ref(database, 'points/');
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            const items = data ? Object.keys(data).map(id => ({ id, ...data[id] })) : [];
            setFirebasePoints(items);
        })
    }, []);

    // Save item to firebase realtime database
    const saveItem = () => {
        push(
            ref(database, 'points/'),
            { 'points': points });
    }

    return (
        <View style={Styles.container}>
            <Text style={Styles.normalText}>Player: {activePlayer}</Text>
            <Text style={Styles.normalText}>Drink: {selectedDrink}</Text>
            <Text style={Styles.normalText}>Categories: {selectedCategories}</Text>
            <Text style={Styles.normalText}>Difficulty: {selectedDifficulty}</Text>
            <Text style={Styles.normalText}>Questions per Player: {selectedNum}</Text>
            <TextInput
                style={Styles.textInput}
                placeholder='Amount'
                onChangeText={points => setPoints(points)}
            />
            <Button title="Save" onPress={saveItem} />
        </View>
    );
};