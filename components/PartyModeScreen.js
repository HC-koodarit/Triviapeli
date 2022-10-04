import React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, Button, Text, View, TextInput, Alert } from 'react-native';
import CountDown from 'react-native-countdown-component';
import Styles from './Styles.js';
import PartyModeOptions from './PartyModeOptions.js';


export default function PartyModeScreen({ route, navigation }) {

    // passed params from ParyModeOptions
    const { selectedCategory, selectedDifficulty, selectedDrink,} = route.params;

/*
    const getCustomQuestion(category, difficulty) {
        fetch(`https://opentdb.com/api.php?amount=1&category=${selectedCategory}&difficulty=${selectedDifficulty`)
    }
    */

    return(
        <View style={Styles.container}>
            <Text style={Styles.normalText}>Drink: {selectedDrink}</Text>
            <Text style={Styles.normalText}>Category: {selectedCategory}</Text>
            <Text style={Styles.normalText}>Difficulty: {selectedDifficulty}</Text>
        </View>
    );
};

