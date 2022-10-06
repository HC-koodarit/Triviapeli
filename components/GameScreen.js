import React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, Button, StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import Styles from './Styles.js';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

export default function GameScreen({ navigation }) {
    
    // variables for questions and answers
    const [question, setQuestion] = useState('');
    const [category, setCategory] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);
    const [allAnswers, setAllAnswers] = useState([]);

    // variable for the player's score
    const [points, setPoints] = useState(0);

    // variables for the countdown timer
    const [isPlaying, setIsPlaying] = useState(true);
    const [key, setKey] = useState(0);

    // fetch question data from api and set to variables
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
                setIsPlaying(true);  // start timer

            })
            .catch(err => console.error(err));

    }

    useEffect(() => {
        getQuestion();
    }, []);


    // buttons for answers
    const answerButtons = () => {
        let buttons = [];
        for (let i = 0; i < allAnswers.length; i++) {
            buttons.push(<Button title={allAnswers[i]} onPress={() =>
                checkAnswer(allAnswers[i])} key={i} />);
        }
        return buttons;
    }

    const correctAlert = () =>
        Alert.alert(
            "Correct",
            "Good job! :)",
            [
            {
                text: "Next question",
                onPress: () => getQuestion(),
                style: "ok",
            },
            ],
        );

    const wrongAlert = () =>
        Alert.alert(
            "Wrong",
            "The correct answer was " + correctAnswer,
            [
            {
                text: "Next question",
                onPress: () => getQuestion(),
                style: "ok",
            },
            ],
        );

    // check if answer is correct
    const checkAnswer = (answer) => {
        if (answer === correctAnswer) {
            setPoints(setPoints => setPoints + 1);
            setKey(prevKey => prevKey + 1);
            setIsPlaying(false);
            correctAlert();
        } else {
            setKey(prevKey => prevKey + 1);
            setIsPlaying(false);
            wrongAlert();
        }
    }

    const timeIsUpAlert = () =>
        Alert.alert(
            "Time is up!",
            "The correct answer was " + correctAnswer,
            [
            {
                text: "Next question",
                onPress: () => getQuestion(),
                style: "ok",
            },
            ],
    );


    // 15 sec countdown timer
    const TimerForQuestions = () => (
        <View style={Styles.timer}>
        <CountdownCircleTimer
            key={key}
            isPlaying={isPlaying}
            duration={15}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            onComplete={() => {

                setKey(prevKey => prevKey + 1);
                setIsPlaying(false);
                timeIsUpAlert();
            }}
        >
            {({ remainingTime }) => <Text style={Styles.normalText}>{remainingTime}</Text>}
        </CountdownCircleTimer>
        </View>
    )

    return (
        <SafeAreaView style={Styles.container}>
            <Text style={Styles.title}>Trivia</Text>
            <Text style={Styles.category}>{category}</Text>
            <Text style={Styles.question}>{question}</Text>

            <View style={Styles.buttons}>
                {answerButtons()}
            </View>
            <View>
                {TimerForQuestions()}
            </View>
            <Text
                style={Styles.pointsText}
            >Pointcount: {points}</Text>

        </SafeAreaView>
    );
};