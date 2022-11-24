import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from './Styles';

export default function About({ navigation }) {

    return (
        <View style={Styles.aboutContainer}>
            <Text style={Styles.header}>About</Text>
            <Text style={Styles.normalText}>This game is the work of the Ohjelmistoprojekti II (Software Project II) course at Haaga-Helia University of Applied Sciences.</Text>
            <Text> </Text>
            <Text style={Styles.normalText}>The team members in alphabetical order are:</Text>
            <Text style={Styles.normalText}>- Bergman Sebastian</Text>
            <Text style={Styles.normalText}>- Haavistola Henni</Text>
            <Text style={Styles.normalText}>- Lumme Sofia</Text>
            <Text style={Styles.normalText}>- Paltiala Mari</Text>
            <Text style={Styles.normalText}>- Riihelä Kristian</Text>
            <Text style={Styles.normalText}>- Ristikari Daniel</Text>
            <Text> </Text>
            <Text style={Styles.normalText}>This application uses data from The Open Trivia Database API for trivia questions and answers.</Text>
            <Text> </Text>
            <Text style={Styles.normalText}>All data provided by the API is available under the Creative Commons Attribution-ShareAlike 4.0 International License.</Text>
            <Button
                title='Back'
                titleStyle={{ fontWeight: '700' }}
                buttonStyle={Styles.backButton}
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}