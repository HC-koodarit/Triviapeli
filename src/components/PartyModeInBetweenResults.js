import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from './Styles';

export default function PartyModeInBetweenResults({ route, navigation }) {

   const { chosenPlayer } = route.params;
   const { playerDetails } = route.params;

    return (
        <View style={Styles.container}>
            <Text style={Styles.header}>Partymode scores</Text>
            <Text style={Styles.pointsText}>Your score was {playerDetails} </Text>
            <Text style={Styles.pointsText}>Player was {chosenPlayer.name} </Text>
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