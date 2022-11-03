import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from './Styles';

export default function PartyModeInBetweenResults({ route, navigation }) {

   const { points } = route.params;
   const { players } = route.params;

   // Score haetaan tietokannasta, tämä pitää tehdä vielä
    return (
        <View style={Styles.container}>
            <Text style={Styles.header}>Partymode scores</Text>
            <Text style={Styles.pointsText}>Your score was {points} </Text>
            <Text style={Styles.pointsText}>Player was {players} </Text>
            <Button
                title="End game and go back to main page"
                type="outline"
                onPress={() => navigation.navigate('Home')}
            />
            <Button
                title="Back to game"
                type="outline"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
}