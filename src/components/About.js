import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from './Styles';

export default function About({ navigation }) {

    return (
        <View style={Styles.aboutContainer}>
            <Text style={Styles.header}>About</Text>
            <Text style={Styles.normalText}>This game is the work of the Ohjelmistoprojekti II (Software Project II) course at Haaga-Helia University of Applied Sciences.</Text>
            <Text> </Text>
            <Text style={Styles.normalText}>The team members in alphabetical order are:</Text>
            <Text style={Styles.normalText}>- Sebastian Bergman</Text>
            <Text style={Styles.normalText}>- Henni Haavistola</Text>
            <Text style={Styles.normalText}>- Sofia Lumme</Text>
            <Text style={Styles.normalText}>- Mari Paltiala</Text>
            <Text style={Styles.normalText}>- Kristian Riihelä</Text>
            <Text style={Styles.normalText}>- Daniel Ristikari</Text>
            <Text> </Text>
            <Text style={Styles.normalText}>This application uses data from <Text style={Styles.hyperlinkText} onPress={ ()=>{ Linking.openURL('https://opentdb.com/')}}>The Open Trivia Database API</Text> for trivia questions and answers.</Text>
            <Text> </Text>
            <Image source={require('../assets/license.png')} style={
                {
                    height: 15,
                    width: 80,
                    marginBottom: 10,
                }
            } />
            <Text style={Styles.normalText}>This work is licensed under a <Text style={Styles.hyperlinkText} onPress={() => { Linking.openURL('https://creativecommons.org/licenses/by-sa/4.0/') }}>Creative Commons Attribution-ShareAlike 4.0 International License</Text>.</Text>
            <Button
                title='Back'
                titleStyle={{ fontWeight: '700' }}
                buttonStyle={Styles.backButton}
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}