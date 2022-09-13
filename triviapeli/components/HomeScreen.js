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
                answerArray.push(decodeURIComponent(data.results[0].correct_answer));

                //tämä lisää jostain syystä edellisen kysymyksen väärät vastaukset
                setAllAnswers(answerArray);
                console.log(question);
                console.log(correctAnswer);
                console.log(incorrectAnswers);
                console.log(allAnswers);
            })
            .catch(err => console.error(err));
    }

    // buttons for answers
    const answerButtons = () => {
        let buttons = [];
        for (let i = 0; i < allAnswers.length; i++) {
            buttons.push(<Button title={allAnswers[i]} onPress={() => checkAnswer(allAnswers[i])} />);
        }
        
        let shuffled = buttons
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
        return shuffled;
        
    }

    // check if answer is correct
    const checkAnswer = (answer) => {
        if (answer === correctAnswer) {
            alert("Correct!");
        } else {
            alert("Drink!!");
        }
    }

    const mixAnswers = () => {
        for (let i = 0; i < incorrectAnswers.length; i++) {
            allAnswers.push(incorrectAnswers[i]);
        }
        allAnswers.push(correctAnswer);
        console.log(allAnswers);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Trivia</Text>
            <Text style={styles.category}>{category}</Text>
            <Text style={styles.question}>{question}</Text>
            {answerButtons()}
            <Button title="Get question" onPress={getQuestion} />
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

// tässä shufflaus tapahtuu dataa haettaessa
/*

import React from 'react';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { flushSync } from 'react-dom';


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
                    answerArray.push(decodeURIComponent(data.results[0].correct_answer));

                    answerArray = answerArray.sort(() => Math.random() - 0.5);

                    setAllAnswers(answerArray);
                    console.log(question);
                    console.log(correctAnswer);
                    console.log(incorrectAnswers);
                    console.log(allAnswers);
            })
            .catch(err => console.error(err));
    }

    // buttons for answers
    const answerButtons = () => {

        let buttons = [];
        for (let i = 0; i < allAnswers.length; i++) {
            buttons.push(<Button title={allAnswers[i]} onPress={() => checkAnswer(allAnswers[i])} />);
        }
        return buttons;
    }

    // check if answer is correct
    const checkAnswer = (answer) => {
        if (answer === correctAnswer) {
            alert("Correct!");
        } else {
            alert("Drink!!");
        }
    }

    const mixAnswers = () => {
        for (let i = 0; i < incorrectAnswers.length; i++) {
            allAnswers.push(incorrectAnswers[i]);
        }
        allAnswers.push(correctAnswer);
        console.log(allAnswers);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Trivia</Text>
            <Text style={styles.category}>{category}</Text>
            <Text style={styles.question}>{question}</Text>
            {answerButtons()}
            <Button title="Get question" onPress={getQuestion} />
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
*/