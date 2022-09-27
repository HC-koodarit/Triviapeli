import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from'@react-navigation/native';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import GameScreen from './components/GameScreen';
import RulesScreen from './components/RulesScreen';
import About from './components/About';

const Tab = createBottomTabNavigator();

export default function App() {


  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              
              if (route.name === 'Game') {
                iconName = 'md-home';
              } else if (route.name === 'Rules') {
                iconName = 'book-sharp';
              } else if (route.name === "About") {
                iconName = 'information-circle';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}>
            <Tab.Screen name="Game" component={GameScreen} />
            <Tab.Screen name="Rules" component={RulesScreen} />
            <Tab.Screen name="About" component={About} />
        </Tab.Navigator>
    </NavigationContainer>
    </View>
  );
}

// Style
const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});