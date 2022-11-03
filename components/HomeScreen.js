import React from 'react';
import { Image, Text, View } from 'react-native';
import Styles from './Styles';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen({ navigation }) {

    return (
        <SafeAreaView style={Styles.container}>
            <Text style={Styles.header}>Trivia</Text>
            <Button
                title="Partymode"
                type="outline"
                onPress={() => { navigation.navigate('Partymode')}}
            />
            <Button
                title="Quickplay"
                type="outline"
                onPress={() => navigation.navigate('Quickplay')}
            />
            <Button
                title="Rules"
                type="outline"
                onPress={() => navigation.navigate('Rules')}
            />
            <Button
                title="About"
                type="outline"
                onPress={() => navigation.navigate('About')}
            />
            <Button
                title="Test PartymodeGame"
                type="outline"
                onPress={() => navigation.navigate('PartyModeGame')}
            />
            <Image source={require('../assets/people.png')} style={
                {
                    width: 400,
                    height: 400,
                    marginBottom: 0,
                }
            } />
        </SafeAreaView>
    );

};