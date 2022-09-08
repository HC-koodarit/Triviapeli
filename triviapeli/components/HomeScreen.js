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
                setAllAnswers(['']);
                setQuestion(decodeURIComponent(data.results[0].question));
                setCategory(decodeURIComponent(data.results[0].category));
                setCorrectAnswer(decodeURIComponent(data.results[0].correct_answer));
                let answerArray = [];
                for (let i = 0; i < data.results[0].incorrect_answers.length; i++) {
                    answerArray.push(decodeURIComponent(data.results[0].incorrect_answers[i]));
                }
                setIncorrectAnswers(answerArray);
                
                //tämä lisää jostain syystä edellisen kysymyksen väärät vastaukset
                setAllAnswers(answerArray);
                console.log(question);
                console.log(correctAnswer);
                console.log(incorrectAnswers);
                console.log(allAnswers);
            })
            .catch(err => console.error(err));
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
            <Text>Kategoria: {category}</Text>
            <Text>Kysymys: {question}</Text>
            <Text>Oikea vastaus: {correctAnswer}</Text>
            <Text></Text>
            <Text>Väärä vastaus: {incorrectAnswers}</Text>
            <Text></Text>
            <Text>Kaikki vastaukset: {allAnswers}</Text>
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