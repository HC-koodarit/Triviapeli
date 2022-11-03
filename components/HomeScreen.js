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
                size="lg"
                onPress={() => { navigation.navigate('Partymode')}}
            />
            <Text> </Text>
            <Button
                title="Quickplay"
                type="outline"
                onPress={() => navigation.navigate('Quickplay')}
            />
            <Text> </Text>
            <Button
                title="Rules"
                type="outline"
                onPress={() => navigation.navigate('Rules')}
            />
            <Text> </Text>
            <Button
                title="About"
                type="outline"
                onPress={() => navigation.navigate('About')}
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