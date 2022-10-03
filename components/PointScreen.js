import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Styles from './Styles';

export default function RulesScreen({ navigation }, {route}) {

   //const points = navigation.getParam('points');
   //const [newPoints, setNewPoints] = useState(0);
   const { points } = route?.params || {};

    return (
        <View style={Styles.container}>
            <Text style={Styles.header}>Scores</Text>
            <Text style={Styles.pointsText}>your game results, 
            Points: {points}
            </Text>
            <Button
                style={Styles.buttons}
                title="Back to game"
                onPress={() => navigation.navigate('Gamescreen')}
            />
        </View>
        
    );
}