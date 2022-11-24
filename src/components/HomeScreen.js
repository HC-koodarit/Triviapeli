import React from 'react';
import { Image, Text, View } from 'react-native';
import Styles from './Styles';
import { Button } from 'react-native-elements';

export default function HomeScreen({ navigation }) {

    return (
        <View style={Styles.container} >
            <Text style={{
                fontSize: 100,
                fontWeight: 'bold',
                color: '#98c1d9',
                marginTop: 50,
                padding: 10,
                fontFamily: 'VT323_400Regular',
            }}>Trivia</Text>

            <Button
                title="Partymode"
                icon={{
                    name: 'users',
                    type: 'font-awesome',
                    size: 30,
                    color: 'white',
                }}
                iconContainerStyle={{ marginRight: 10 }}
                titleStyle={{ fontWeight: '800', fontFamily: 'VT323_400Regular', fontSize: 30 }}
                buttonStyle={{
                    backgroundColor: '#6969B3',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 30,
                    marginTop: 10,
                }}
                containerStyle={{
                    width: 250,
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
                    size: 30,
                    color: 'white',
                }}
                iconContainerStyle={{ marginRight: 10 }}
                titleStyle={{ fontWeight: '800', fontFamily: 'VT323_400Regular', fontSize: 30 }}
                buttonStyle={{
                    backgroundColor: '#6969B3',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 30,
                }}
                containerStyle={{
                    width: 250,
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
                    size: 30,
                    color: 'white',
                }}
                iconContainerStyle={{ marginRight: 10 }}
                titleStyle={{ fontWeight: '800', fontFamily: 'VT323_400Regular', fontSize: 30 }}
                buttonStyle={{
                    backgroundColor: '#6969B3',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 30,
                }}
                containerStyle={{
                    width: 250,
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
                    size: 30,
                    color: 'white',
                }}
                iconContainerStyle={{ marginRight: 10 }}
                titleStyle={{ fontWeight: '800', fontFamily: 'VT323_400Regular', fontSize: 30 }}
                buttonStyle={{
                    backgroundColor: '#6969B3',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 30,
                }}
                containerStyle={{
                    width: 250,
                    marginHorizontal: 50,
                    marginVertical: 20,
                    marginBottom: 0
                }}
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