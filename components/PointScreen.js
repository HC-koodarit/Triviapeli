import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Styles from './Styles';

export default function RulesScreen({ navigation }) {

    return (
        <View style={Styles.container}>
            <Text style={Styles.header}>Score</Text>
            <Text>your game results</Text>

            <Button
                style={Styles.buttons}
                title="Points"
                onPress={() => navigation.navigate('Gamescreen')}
            />
        </View>
        
    );
}