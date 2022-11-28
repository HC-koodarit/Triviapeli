import React from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from './Styles.js';

export default function PartyModeResults({ route, navigation }) {
    const { players } = route.params;

    // sort players by points from highest to lowest 
    const playersPoints = [...players].sort((a, b) => b.points - a.points);

    return (
        <View style={Styles.container}>
            <Text style={Styles.header}>Results</Text>
            <FlatList
                style={Styles.playerFlatlistResults}
                data={playersPoints}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <View style={Styles.resultsContainer}>
                        <Text style={Styles.flatlistPlayerNameResults}>{item.name}    </Text>
                        <Text style={Styles.flatlistPlayerNameResults}>{item.points} points</Text>
                    </View>
                }
            />
            <Image source={require('../assets/podium.png')} style={
                {
                    width: 200,
                    height: 200,
                    marginBottom: 10,
                }
            } />
            <Button
                title='Home'
                titleStyle={Styles.homeTitle}
                buttonStyle={Styles.backButton}
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
};