import React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, Button, Text, View, TextInput, Alert } from 'react-native';
import CountDown from 'react-native-countdown-component';
import Styles from './Styles.js';
import PartyModeOptions from './PartyModeOptions.js';


export default function PartyModeScreen() {

/*
    console.log(`Difficulty and Category: ${PartyModeOptions()}`)

    const getCustomQuestion(category, difficulty) {
        fetch(`https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty`)
    }
    */

    return(
        <View style={Styles.container}>
            <Text style={Styles.title}>Juodaa kännit</Text>
        </View>
    );
};

