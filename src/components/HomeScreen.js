import React from 'react';
import { Image, Text, View } from 'react-native';
import Styles from './Styles';
import { Button } from 'react-native-elements';

export default function HomeScreen({ navigation }) {

    return (
        <View style={Styles.container} >
            <Text style={Styles.homeHeader}>Trivia</Text>

            <Button
                title="Partymode"
                icon={{
                    name: 'users',
                    type: 'font-awesome',
                    size: 30,
                    color: 'white',
                }}
                iconContainerStyle={{ marginRight: 10 }}
                titleStyle={Styles.homeTitle}
                buttonStyle={Styles.homeButton}
                containerStyle={Styles.homeContainer}
                onPress={() => { navigation.navigate('Partymode') }}
            />
            <Button
                title="Quickplay"
                icon={{
                    name: 'user',
                    type: 'font-awesome',
                    size: 30,
                    color: 'white',
                }}
                iconContainerStyle={{ marginRight: 10 }}
                titleStyle={Styles.homeTitle}
                buttonStyle={Styles.homeButton}
                containerStyle={Styles.homeContainer}
                onPress={() => { navigation.navigate('Quickplay') }}
            />
            <Button
                title="Rules"
                icon={{
                    name: 'comment',
                    type: 'font-awesome',
                    size: 30,
                    color: 'white',
                }}
                iconContainerStyle={{ marginRight: 10 }}
                titleStyle={Styles.homeTitle}
                buttonStyle={Styles.homeButton}
                containerStyle={Styles.homeContainer}
                onPress={() => { navigation.navigate('Rules') }}
            />
            <Button
                title="About"
                icon={{
                    name: 'heart',
                    type: 'font-awesome',
                    size: 30,
                    color: 'white',
                }}
                iconContainerStyle={{ marginRight: 10 }}
                titleStyle={Styles.homeTitle}
                buttonStyle={Styles.homeButton}
                containerStyle={Styles.homeContainer}
                onPress={() => { navigation.navigate('About') }}
            />

            <Image source={require('../assets/people.png')} style={
                {
                    width: 300,
                    height: 300,
                    opacity: 0.9,
                }
            } />
        </View>
    );

};