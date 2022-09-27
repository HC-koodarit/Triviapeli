import React from 'react';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Styles from './Styles';

export default function HomeScreen( { navigation }) {

    return(
        <View style={Styles.container}>
            <Button
                style={Styles.buttons}
                title="Partymode"
            />
            <Button
                style={Styles.buttons}
                title="Quickplay"
                onPress={() => navigation.navigate('Questions')}
            />
            <Button
                style={Styles.buttons}
                title="Rules"
                onPress={() => navigation.navigate('Rules')}
            />
            <Button
                style={Styles.buttons}
                title="About"
                onPress={() => navigation.navigate('About')}
            />
        </View>
    );

};