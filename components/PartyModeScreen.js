import React from 'react';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Button, StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import CountDown from 'react-native-countdown-component';
import Styles from './Styles.js';


export default function PartyModeScreen() {

    return(
        <View style={Styles.container}>
            <Text>Juodaa kännit</Text>
        </View>
    );
};

