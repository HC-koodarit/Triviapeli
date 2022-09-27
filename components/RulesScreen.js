import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function RulesScreen() {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>How to play single player mode</Text>
            <Text>1. Start the game</Text>
            <Text>2. Answer the questions</Text>
            <Text>3. Get the highest score</Text>
            <Text> 4. Brag about it</Text>
            <Text style={styles.header}>How to play party mode</Text>
            <Text>1. Add players</Text>
            <Text>2. Choose your poison</Text>
            <Text>3. Start the game</Text>
            <Text>4. Answer the questions</Text>
            <Text>5. Fail and get wasted</Text>
            <Text style={styles.header}>Powerups</Text>
            <Text> Bla bla bla</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});