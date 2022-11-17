import React from 'react';
import { Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from './Styles';

export default function PointScreen({ route, navigation }) {
    const { points } = route.params;

    return (
        <View style={Styles.container}>
            <Text style={Styles.header}>Results</Text>
            <Text style={Styles.pointsText}>Your score was {points}
            </Text>
            <Image source={require('../assets/podium.png')} style={
                {
                    width: 200,
                    height: 200,
                    marginBottom: 10,
                }
            } />
            <Button
                title='Home'
                titleStyle={{ fontWeight: '700' }}
                buttonStyle={Styles.backButton}
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}