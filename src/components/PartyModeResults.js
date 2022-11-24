import React from 'react';
import { useState } from 'react';
import { SafeAreaView, Text, View, FlatList, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-web';
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
            <Image source={require('../assets/podium.png')} style={
                {
                    width: 300,
                    height: 300,
                    marginBottom: 10,
                }
            } />
                <Button
                    title='Home'
                    titleStyle={{ fontWeight: '700' }}
                    buttonStyle={Styles.backButtonResults}
                    onPress={() => navigation.navigate('Home')}
                />
        </SafeAreaView>
    );
};