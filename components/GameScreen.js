import React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, Button, StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import Styles from './Styles.js';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';


export default function GameScreen({ navigation }) {


    // set data to state
    const [data, setData] = useState([]);
    const [question, setQuestion] = useState('');
    const [category, setCategory] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);
    const [allAnswers, setAllAnswers] = useState([]);

    const [points, setPoints] = useState(0);

    const [isPlaying, setIsPlaying] = useState(true);
    const [key, setKey] = useState(0);

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
                //console.log(question);
                //console.log(decodeURIComponent(data.results[0].correct_answer));
                //console.log(incorrectAnswers);
                //console.log(allAnswers);
                setIsPlaying(true);

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

    // check if answer is correct
    const checkAnswer = (answer) => {
        if (answer === correctAnswer) {
            setPoints(setPoints => setPoints + 1);
            setKey(prevKey => prevKey + 1);
            setIsPlaying(false);
            //navigation.push('Pointscreen', {points})
            { getQuestion() };
        } else {
            //navigation.push('Pointscreen', {points})
            setKey(prevKey => prevKey + 1);
            setIsPlaying(false);
            { getQuestion() };
        }
    }

    const TimerForQuestions = () => (
        <CountdownCircleTimer
            key={key}
            isPlaying={isPlaying}
            duration={15}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            onComplete={() => {
                setKey(prevKey => prevKey + 1);
                setIsPlaying(false);
                getQuestion();
            }}
        >
            {({ remainingTime }) => <Text>{remainingTime}</Text>}
        </CountdownCircleTimer>
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