import React from 'react';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen( { navigation }) {

    return(
        <View style={styles.container}>
            <Button
                style={styles.buttons}
                title="Partymode"
            />
            <Button
                style={styles.buttons}
                title="Quickplay"
                onPress={() => navigation.navigate('Questions')}
            />
            <Button
                style={styles.buttons}
                title="Rules"
                onPress={() => navigation.navigate('Rules')}
            />
            <Button
                style={styles.buttons}
                title="About"
                onPress={() => navigation.navigate('About')}
            />
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        flexDirection: 'column',
    },
});
