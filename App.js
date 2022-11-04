import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import GameScreen from './src/components/GameScreen';
import RulesScreen from './src/components/RulesScreen';
import About from './src/components/About';
import HomeScreen from './src/components/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Styles from './src/components/Styles';
import PointScreen from './src/components/PointScreen';
import PartyModeOptions from './src/components/PartyModeOptions';
import Categories from './src/components/Categories';
import PartyModeGame from './src/components/PartyModeGame';
import PartyModeResults from './src/components/PartyModeResults';
import PartyModeInBetweenResults from './src/components/PartyModeInBetweenResults';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} style={Styles.title} />
          <Stack.Screen name="Partymode" component={PartyModeOptions} style={Styles.title} />
          <Stack.Screen name="Quickplay" component={GameScreen} style={Styles.title} />
          <Stack.Screen name="Rules" component={RulesScreen} style={Styles.title} />
          <Stack.Screen name="About" component={About} style={Styles.title} />
          <Stack.Screen name="Pointscreen" component={PointScreen} style={Styles.title} />
          <Stack.Screen name="Gamescreen" component={GameScreen} style={Styles.title} />
          <Stack.Screen name="PartyModeResults" component={PartyModeResults} style={Styles.title} />
          <Stack.Screen name="Categories" component={Categories} style={Styles.title} />
          <Stack.Screen name="PartyModeGame" component={PartyModeGame} style={Styles.title} />
          <Stack.Screen name="PartyModeInBetweenResults" component={PartyModeInBetweenResults} style={Styles.title} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
    
  );
}