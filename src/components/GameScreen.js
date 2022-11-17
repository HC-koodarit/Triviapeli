import React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Alert, Platform, Image, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from './Styles.js';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

export default function GameScreen({ navigation }) {

    // variables for questions and answers
    const [question, setQuestion] = useState('');
    const [category, setCategory] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);
    const [allAnswers, setAllAnswers] = useState([]);
    const [message, setMessage] = useState('');

    // variable for the player's score
    const [points, setPoints] = useState(0);

    // variables for the countdown timer
    const [isPlaying, setIsPlaying] = useState(false);
    const [key, setKey] = useState(0);

    // variable for loadingscreen
    const [isLoading, setIsLoading] = useState(false);

    // fetch question data from api and set to variables
    const getQuestion = () => {
        setIsLoading(true);
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
                setIsLoading(false);
                setIsPlaying(true);  // start timer
                setMessage('');

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
        setMessage("Time is up! The correct answer was " + correctAnswer);
    }


    // check if answer is correct
    const checkAnswer = (answer) => {
        if (answer === correctAnswer) {
            setPoints(setPoints => setPoints + 1);
            setKey(prevKey => prevKey + 1);
            setIsPlaying(false);
            setMessage("Correct! Good job! :)");

        } else if (answer !== correctAnswer) {
            setKey(prevKey => prevKey + 1);
            setIsPlaying(false);
            setMessage("Wrong! The correct answer was " + correctAnswer);
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
                {({ remainingTime }) =>
                    <Text style={Styles.normalText}>{remainingTime}</Text>}
            </CountdownCircleTimer>
        </View>
    )

    // Loading screen, when question fetching is not done.  
    if (isLoading) {
        return (
            <View style={[Styles.PartyModeGameContainer, Styles.loading]}>
                <ActivityIndicator size="large" color="#03bafc" />
            </View>
        );
    } else if (message === '') {
        return (
            <SafeAreaView style={Styles.container}>
                <Text style={Styles.title}>Trivia</Text>
                <Text style={Styles.category}>{category}</Text>
                <Text style={Styles.question}>{question}</Text>
                <Text style={Styles.pointsText}>Points: {points}</Text>
                <View style={Styles.buttons}>
                    {answerButtons()}
                </View>
                <View>
                    {TimerForQuestions()}
                </View>
                <Text> </Text>
                <Image source={require('../assets/thinking.gif')} style={
                    {
                        width: 50,
                        height: 70,
                        marginBottom: 0,
                    }
                } />
                <Text> </Text>
                <Button style={Styles.startGamePContainer}
                    title="End game"
                    buttonStyle={Styles.backButton}
                    titleStyle={{ color: 'white', marginHorizontal: 30 }}
                    onPress={() => {
                        setIsPlaying(false);
                        navigation.navigate('Pointscreen', { points: points });
                    }}
                />
            </SafeAreaView>
        );
    } else {
        return (
            <View style={Styles.PartyModeGameContainer}>
                <Text style={Styles.normalText}>{message}</Text>
                <Text style={Styles.normalText}>Points: {points}</Text>
                <Button title="Next question" onPress={() => getQuestion()} />
            </View>
        )
    }
};