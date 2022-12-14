import React from 'react';
import { useEffect, useState } from 'react';
import { Text, View, Image, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from './Styles.js';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import * as Speech from 'expo-speech';

export default function GameScreen({ navigation }) {

    // variables for questions and answers
    const [question, setQuestion] = useState('');
    const [category, setCategory] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);
    const [allAnswers, setAllAnswers] = useState([]);
    const [message, setMessage] = useState('');

    const [answerMessage, setAnswerMessage] = useState('');

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
                const speak = () => {
                    const thingToSay = decodeURIComponent(data.results[0].question);
                    Speech.speak(thingToSay, { language: 'en' });
                };
                speak(data.results[0].question);
                setAllAnswers(['']);
                setQuestion(decodeURIComponent(data.results[0].question));
                setCategory(decodeURIComponent(data.results[0].category));
                setCorrectAnswer(decodeURIComponent(data.results[0].correct_answer));
                let incorrectAnswersArray = [];
                for (let i = 0; i < data.results[0].incorrect_answers.length; i++) {
                    incorrectAnswersArray.push(decodeURIComponent(data.results[0].incorrect_answers[i]));
                }
                setIncorrectAnswers(incorrectAnswersArray);
                let allAnswersArray = [];
                for (let i = 0; i < data.results[0].incorrect_answers.length; i++) {
                    allAnswersArray.push(decodeURIComponent(data.results[0].incorrect_answers[i]));
                }
                allAnswersArray.push(decodeURIComponent(data.results[0].correct_answer));
                allAnswersArray = allAnswersArray.sort(() => Math.random() - 0.5);
                setAllAnswers(allAnswersArray);
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
            buttons.push(<Button
                title={allAnswers[i]}
                titleStyle={Styles.homeTitle}
                type="outline"
                onPress={ () => 
                    checkAnswer(allAnswers[i])} key={i} />);
        }
        return buttons;
    }

    // time running out
    const timeIsUp = () => {
        setIsPlaying(false);
        setAnswerMessage("Time is up!");
        setMessage("The correct answer was: " + correctAnswer);
    }

    // check if answer is correct
    const checkAnswer = (answer) => {
        if (answer === correctAnswer) {
            Speech.stop();
            Speech.speak("Correct!", { language: 'en' });
            setPoints(setPoints => setPoints + 1);
            setKey(prevKey => prevKey + 1);
            setIsPlaying(false);
            setAnswerMessage("Correct!");
            setMessage("Your answer was: " + correctAnswer + "\n\nGood job! :)");

        } else if (answer !== correctAnswer) {
            Speech.stop();
            Speech.speak("Wrong!", { language: 'en' });
            setKey(prevKey => prevKey + 1);
            setIsPlaying(false);
            let answerText = answer.toString();
            setAnswerMessage("Wrong!");
            setMessage("Your answer was: " + "\n" + answerText + "\n\nThe correct answer was: " + "\n" + correctAnswer);
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
                size={60}
                marginBottom={0}
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
            <View style={Styles.quickPlayContainer}>
                <Text style={Styles.category}>{category}</Text>
                <View style={Styles.box}>
                    <Text style={Styles.questionText}>{question}</Text>
                </View>
                <Text style={Styles.pointsText}>Points: {points}</Text>
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
                <Button style={Styles.startGamePContainer}
                    title="End game"
                    buttonStyle={Styles.backButton}
                    titleStyle={Styles.homeTitle}
                    onPress={() => {
                        setIsPlaying(false);
                        Speech.stop();
                        navigation.navigate('Pointscreen', { points: points });
                    }}
                />
            </View>
        );
    } else {
        return (
            <View style={Styles.quickPlayContainer}>
                <View style={Styles.PartyModeGameContainer}>
                    <Text style={Styles.answerMessageText(answerMessage)}>{answerMessage}</Text>
                    <View style={Styles.box}>
                        <Text style={Styles.questionText}>{question}</Text>
                        <Text style={Styles.normalTextCentered}>{message}</Text>
                    </View>

                    <Text style={Styles.normalText}>Points: {points}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Button style={Styles.startGamePContainer}
                            title="End game"
                            buttonStyle={Styles.backButton}
                            titleStyle={Styles.homeTitle}
                            onPress={() => {
                                setIsPlaying(false);
                                navigation.navigate('Pointscreen', { points: points });
                            }}
                        />
                        <Button
                            buttonStyle={Styles.continueButton}
                            type=""
                            title="Next question"
                            titleStyle={Styles.homeTitle}
                            onPress={() => getQuestion()} />
                    </View>
                </View>
            </View>
        )
    }
};