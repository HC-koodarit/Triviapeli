import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Styles from './Styles';

export default function About() {

    return (
        <View style={Styles.container}>
            <Text style={Styles.header}>About</Text>
            <Text style={Styles.normalText}>This application uses data from The Open Trivia Database API for trivia questions and answers.</Text>
            <Text> </Text>
            <Text style={Styles.normalText}>All data provided by the API is available under the Creative Commons Attribution-ShareAlike 4.0 International License.</Text>
        </View>
    );
}