import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Styles from './Styles';

export default function RulesScreen() {

    return (
        <View style={Styles.container}>
            <Text style={Styles.header}>How to play single player mode</Text>
            <Text>1. Start the game</Text>
            <Text>2. Answer the questions</Text>
            <Text>3. Get the highest score</Text>
            <Text> 4. Brag about it</Text>
            <Text style={Styles.header}>How to play party mode</Text>
            <Text>1. Add players</Text>
            <Text>2. Choose your poison</Text>
            <Text>3. Start the game</Text>
            <Text>4. Answer the questions</Text>
            <Text>5. Fail and get wasted</Text>
            <Text style={Styles.header}>Powerups</Text>
            <Text> Bla bla bla</Text>
        </View>
    );
}