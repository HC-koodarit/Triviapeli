import React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Alert, Platform, Image } from 'react-native';
import { Input, Button, ListItem, Icon } from 'react-native-elements';
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
    const [isPlaying, setIsPlaying] = useState(false);
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
            buttons.push(<Button title={allAnswers[i]} type="outline" onPress={() =>
                checkAnswer(allAnswers[i])} key={i} />);
        }
        return buttons;
    }

    // time running out
    const timeIsUp = () => {
        if (Platform.OS === 'web') {
            alert("Time is up! The correct answer was " + correctAnswer);
            getQuestion();
        } else {
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
        }
    }


    // check if answer is correct
    const checkAnswer = (answer) => {
        if (answer === correctAnswer) {
            setPoints(setPoints => setPoints + 1);
            setKey(prevKey => prevKey + 1);
            setIsPlaying(false);
            if (Platform.OS === 'web') {
                alert("Correct! Good job! :)");
                getQuestion();
            } else {
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
            };
        } else if (answer !== correctAnswer) {
            setKey(prevKey => prevKey + 1);
            setIsPlaying(false);
            if (Platform.OS === 'web') {
                alert("Wrong! The correct answer was " + correctAnswer);
                getQuestion();
            } else {
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
            }
        }
    }

    // 15 sec countdown timer
    const TimerForQuestions = () => (
        <View style={Styles.timer}>
            <CountdownCircleTimer
                key={key}
                isPlaying={isPlaying}
                duration={15}
                colors={'#004777'}
                size={90}
                onComplete={() => {
                    setKey(prevKey => prevKey + 1);
                    setIsPlaying(false);
                    timeIsUp();
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
            <Image source={require('../assets/thinking.gif')} style={
                {
                    width: 50,
                    height: 70,
                    marginBottom: 0,
                }
            } />
            <Text style={Styles.pointsText}>Pointcount: {points}</Text>
            <Button
                title="End Game"
                type="outline"
                onPress={() => {
                    setIsPlaying(false);
                    navigation.navigate('Pointscreen', { points: points });
                }}
            />
        </SafeAreaView>
    );
};