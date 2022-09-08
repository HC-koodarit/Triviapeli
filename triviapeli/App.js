import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from'@react-navigation/native';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from './components/HomeScreen';
import RulesScreen from './components/RulesScreen';

const Tab = createBottomTabNavigator();

export default function App() {


  return (

    <View style={{flex: 1}}>
      


      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              
              if (route.name === 'Home') {
                iconName = 'md-home';
              } else if (route.name === 'Rules') {
                iconName = 'book-sharp';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}>
            
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Rules" component={RulesScreen} />
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