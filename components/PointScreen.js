import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Styles from './Styles';

export default function PointScreen({ route, navigation }) {

   const { points } = route.params;

   // Score haetaan tietokannasta, tämä pitää tehdä vielä
    return (
        <View style={Styles.container}>
            <Text style={Styles.header}>Scores</Text>
            <Text style={Styles.pointsText}>Your score was {points}
            </Text>
            <Button
                style={Styles.buttons}
                title="Back to main page"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}