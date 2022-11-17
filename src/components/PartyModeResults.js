import React from 'react';
import { useState } from 'react';
import { SafeAreaView, Text, View, FlatList, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from './Styles.js';

export default function PartyModeResults({ route, navigation, params }) {
    const { players } = route.params;

    // sort players by points from highest to lowest 
    const playersPoints = [...players].sort((a, b) => b.points - a.points);

    return (
        <SafeAreaView style={Styles.PartyModeResultsContainer}>
            <View style={Styles.PMResultsFlatlistContainer}>
                <Text style={Styles.headingText}>Results:</Text>
                <FlatList
                    style={Styles.playerFlatlistResults}
                    data={playersPoints}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <View>
                            <Text style={Styles.flatlistPlayerNameResults}>{item.name} – Points: {item.points}</Text>
                        </View>
                    }
                />
            </View>
            <View style={Styles.PMResultsButtonContainer}>
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
                    buttonStyle={Styles.backButtonResults}
                    onPress={() => navigation.navigate('Home')}
                />
            </View>
        </SafeAreaView>
    );
};