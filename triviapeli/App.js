import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {

fetch('https://opentdb.com/api.php?amount=1&difficulty=medium&type=multiple')
.then((response) => response.json())
.then((json) => {
console.log(json);
setData(json.results[0]);
})
.catch((error) => {
console.error(error);
});

const [data, setData] = useState([]);
const [question, setQuestion] = useState('');
const [correctAnswer, setCorrectAnswer] = useState('');
const [incorrectAnswers, setIncorrectAnswers] = useState([]);

useEffect(() => {
setQuestion(data.question);
}, []);

  return (
    <View style={styles.container}>
      <Text>Triviapeli</Text>
      <Text>{question}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
