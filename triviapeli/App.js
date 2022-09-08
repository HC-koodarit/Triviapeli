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

  // set data to state
  const [data, setData] = useState([]);
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]);


  // button for getting the question
  const getQuestion = () => {
    fetch("https://opentdb.com/api.php?amount=1&encode=url3986")
      .then(response => response.json())
      .then(data => {
        setQuestion(decodeURIComponent(data.results[0].question));
        setCategory(decodeURIComponent(data.results[0].category));
        setCorrectAnswer(decodeURIComponent(data.results[0].correct_answer));
        setIncorrectAnswers(decodeURIComponent(data.results[0].incorrect_answers));
        console.log(question);
        console.log(correctAnswer);
        //console.log(incorrectAnswers);
        setAllAnswers([]);
      })
      .catch(err => console.error(err))
  }

  const mixAnswers = () => {
    allAnswers.push(incorrectAnswers);
    allAnswers.push(correctAnswer);
    console.log(allAnswers);
  }



  return (

    <View style={styles.container}>
      <Text>Triviapeli</Text>
      <Button title="Get question" onPress={getQuestion} />
      <Text>{category}</Text>
      <Text>{question}</Text>
      <Button title = "vastausvaihtoehdot" onPress={mixAnswers}></Button>
      <StatusBar style="auto" />

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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});