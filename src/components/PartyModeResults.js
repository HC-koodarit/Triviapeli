import React from 'react';
import { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from './Styles.js';

export default function PartyModeResults({ route, navigation, params }) {

    const { players } = route.params;
    const [playerName, setPlayerName] = players.name;

    return (
        <SafeAreaView style={Styles.PartyModeResultsContainer}>
            <Text style={Styles.normalText}>Results coming</Text>
            <Text>player was {playerName} </Text>
            <Button
                title='Home'
                titleStyle={{ fontWeight: '700' }}
                buttonStyle={Styles.backButton}
                onPress={() => navigation.navigate('Home')}
            />
        </SafeAreaView>
    );
};