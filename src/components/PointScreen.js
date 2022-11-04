import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from './Styles';

export default function PointScreen({ route, navigation }) {
    const { points } = route.params;

    return (
        <View style={Styles.container}>
            <Text style={Styles.header}>Scores</Text>
            <Text style={Styles.pointsText}>Your score was {points}
            </Text>
            <Button
                title='Home'
                titleStyle={{ fontWeight: '700' }}
                buttonStyle={Styles.backButton}
                containerStyle={Styles.backButtonContainer}
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}