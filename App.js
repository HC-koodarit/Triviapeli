import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import GameScreen from './components/GameScreen';
import RulesScreen from './components/RulesScreen';
import About from './components/About';
import HomeScreen from './components/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Styles from './components/Styles';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Home'
        >
          <Stack.Screen name="Home" component={HomeScreen} style={Styles.title} />
          <Stack.Screen name="Questions" component={GameScreen} style={Styles.title} />
          <Stack.Screen name="Rules" component={RulesScreen} style={Styles.title} />
          <Stack.Screen name="About" component={About} style={Styles.title} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}