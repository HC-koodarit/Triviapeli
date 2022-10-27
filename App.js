import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import GameScreen from './components/GameScreen';
import RulesScreen from './components/RulesScreen';
import About from './components/About';
import HomeScreen from './components/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Styles from './components/Styles';
import PointScreen from './components/PointScreen';
import PartyModeOptions from './components/PartyModeOptions';
import Categories from './components/Categories';
import PartyModeGame from './components/PartyModeGame';
import PartyModeResults from './components/PartyModeResults';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Home'
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

        </Stack.Navigator>
      </NavigationContainer>
    </View>

  );
}