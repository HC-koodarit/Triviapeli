import React from 'react';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
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
                let answerArray = [];
                for (let i = 0; i < data.results[0].incorrect_answers.length; i++) {
                    answerArray.push(decodeURIComponent(data.results[0].incorrect_answers[i]));
                }
                setIncorrectAnswers(answerArray);
                console.log(question);
                console.log(correctAnswer);
                console.log(incorrectAnswers);
                setAllAnswers([]);
            })
            .catch(err => console.error(err))
    }

    const mixAnswers = () => {
        for (let i = 0; i < incorrectAnswers.length; i++) {
            allAnswers.push(incorrectAnswers[i]);
        }
        allAnswers.push(correctAnswer);
        console.log(allAnswers);
    }

    return (
        <View style={styles.container} >
            <Text style={styles.header}>Trivia Game</Text>
            <Button title="Get question" onPress={getQuestion} />
            <Text>{category}</Text>
            <Text>{question}</Text>
            <Text>{correctAnswer}</Text>
            <Text>{incorrectAnswers}</Text>
            <Button title="vastausvaihtoehdot" onPress={mixAnswers}></Button>
            <StatusBar style="auto" />
        </View>
    );
};

// Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});