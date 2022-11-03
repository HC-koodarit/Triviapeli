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
                icon={{
                    name: 'users',
                    type: 'font-awesome',
                    size: 20,
                    color: 'white',
                }}
                iconContainerStyle={{ marginRight: 10 }}
                titleStyle={{ fontWeight: '700' }}
                buttonStyle={{
                    backgroundColor: 'rgba(80, 154, 230, 1)',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 30,
                }}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 20,
                }}
                onPress={() => { navigation.navigate('Partymode') }}
            />
            <Button
                title="Quickplay"
                icon={{
                    name: 'user',
                    type: 'font-awesome',
                    size: 20,
                    color: 'white',
                }}
                iconContainerStyle={{ marginRight: 10 }}
                titleStyle={{ fontWeight: '700' }}
                buttonStyle={{
                    backgroundColor: 'rgba(80, 154, 230, 1)',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 30,
                }}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 20,
                }}
                onPress={() => { navigation.navigate('Quickplay') }}
            />
            <Button
                title="Rules"
                icon={{
                    name: 'comment',
                    type: 'font-awesome',
                    size: 20,
                    color: 'white',
                }}
                iconContainerStyle={{ marginRight: 10 }}
                titleStyle={{ fontWeight: '700' }}
                buttonStyle={{
                    backgroundColor: 'rgba(80, 154, 230, 1)',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 30,
                }}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 20,
                }}
                onPress={() => { navigation.navigate('Rules') }}
            />
            <Button
                title="About"
                icon={{
                    name: 'heart',
                    type: 'font-awesome',
                    size: 20,
                    color: 'white',
                }}
                iconContainerStyle={{ marginRight: 10 }}
                titleStyle={{ fontWeight: '700' }}
                buttonStyle={{
                    backgroundColor: 'rgba(80, 154, 230, 1)',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 30,
                }}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 20,
                }}
                onPress={() => { navigation.navigate('About') }}
            />

            <Image source={require('../assets/people.png')} style={
                {
                    width: 200,
                    height: 200,
                    marginBottom: 0,
                }
            } />
        </SafeAreaView>
    );

};