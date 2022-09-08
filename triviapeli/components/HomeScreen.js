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
                setIncorrectAnswers(decodeURIComponent(data.results[0].incorrect_answers));
                console.log(question);
                console.log(correctAnswer);
                console.log(incorrectAnswers);
            })
            .catch(err => console.error(err))
    }

    return (
        <View style = { styles.container } >
            <Text> Triviapeli </Text>
            <Button title = "Get question" onPress = { getQuestion } />
            <Text > { category } </Text>
            <Text > { question } </Text>
            <StatusBar style = "auto" />
        </View>
    );
};