import React from 'react';
import { useState } from 'react';
import { SafeAreaView, Text, View, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from './Styles.js';

export default function PartyModeResults({ route, navigation, params }) {

    const { players } = route.params;
    //const [playerName, setPlayerName] = players.name;

    const playersPoints = [...players].sort((a, b) => b.points - a.points);

    return (
        <SafeAreaView style={Styles.PartyModeResultsContainer}>
            <Text style={Styles.normalText}>Results coming</Text>
            <FlatList
                style={Styles.playerFlatlist}
                data={playersPoints}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <View style={Styles.playerContainer}>
                        <Text style={Styles.flatlistPlayerNames}>{item.name} – </Text>
                        <Text style={Styles.flatlistPlayerNames}> Points: {item.points} </Text>
                    </View>
                }
            />
            <Button
                title='Home'
                titleStyle={{ fontWeight: '700' }}
                buttonStyle={Styles.backButton}
                onPress={() => navigation.navigate('Home')}
            />
        </SafeAreaView>
    );
};