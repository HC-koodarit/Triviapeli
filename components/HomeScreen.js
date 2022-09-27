import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import Styles from './Styles';
import SelectDropdown from 'react-native-select-dropdown'

export default function HomeScreen( { navigation }) {


    return(
        <View style={Styles.container}>
            <Button
                style={Styles.buttons}
                title="Partymode"
                onPress={() => navigation.navigate('Partymode')}
            />
            <Button
                style={Styles.buttons}
                title="Quickplay"
                onPress={() => navigation.navigate('Quickplay')}
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
            <Image source={require('../assets/titlescreen.png')} style={{width: 400, height: 400}} />
        </View>
    );

};