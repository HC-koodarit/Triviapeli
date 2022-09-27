import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function About() {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>About</Text>
            <Text>This application uses data from The Open Trivia Database API for trivia questions and answers.</Text>
            <Text>All data provided by the API is available under the Creative Commons Attribution-ShareAlike 4.0 International License.</Text>
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