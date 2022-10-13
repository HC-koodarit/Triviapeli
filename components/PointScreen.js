import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
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
                title="Back to main page"
                type="outline"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}