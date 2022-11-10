import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Alert, Platform, Image, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from './Styles.js';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

export default function GameScreen({ navigation, route }) {
    const { playerDetails, selectedDifficulty, selectedCategories } = route.params;

    // Use first player from route params as the initial value
    const [players, setPlayers] = useState(playerDetails);
    const [chosenPlayer, setChosenPlayer] = useState(players[0]);
    const [playersCorrectAnswers, setPlayersCorrectAnswers] = useState([0]);
    // const [playersStreak, setPlayersStreak] = useState([]);   // ei käytössä

    // variables for questions and answers
    const [question, setQuestion] = useState('');
    const [category, setCategory] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);
    const [allAnswers, setAllAnswers] = useState([]);
    const [message, setMessage] = useState('welcome');

    // variable for the player's score
    const [points, setPoints] = useState(0);

    // count correct answers for powerups HUOM! Ei laske streakkiä
    const [correctAnswers, setCorrectAnswers] = useState(0);

    // variables for the countdown timer
    const [isPlaying, setIsPlaying] = useState(false);
    const [key, setKey] = useState(0);

    // fetch question data from api and set to variables
    const getQuestion = useCallback(() => {
        const random = Math.floor(Math.random() * selectedCategories.length);
        const categoryForQuestion = selectedCategories[random];
        fetch(`https://opentdb.com/api.php?amount=1&category=${categoryForQuestion}&difficulty=${selectedDifficulty}&encode=url3986`)
            .then(response => response.json())
            .then(data => {
                setCorrectAnswers(correctAnswers + 1);
                const currentPlayerIndex = players.findIndex(p => p.id === chosenPlayer.id);
                // Set new index for player, and fallback to 0 if next index larger than player count
                const nextIndex = (currentPlayerIndex + 1) % players.length;
                setChosenPlayer(players[nextIndex]);

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
                setMessage('');
            })
            .catch(err => console.error(err));

    }, [selectedCategories, chosenPlayer])
/*
    useEffect(() => {
        getQuestion();
    }, []);
*/
    // buttons for answers
    const AnswerButtons = () => {
        return (
            <View>
                {
                    allAnswers.map((answer) => {
                        return (
                            <Button
                                title={answer}
                                titleStyle={{ color: 'white', marginHorizontal: 20 }}
                                type="outline"
                                onPress={() => checkAnswer(answer)}
                                key={answer}
                            />
                        )
                    })
                }
            </View>
        )
    }

    // timer runs out
    const timeIsUp = () => {
        let streakCounter = chosenPlayer.streak = 0;
        const newState = players.map(obj => {
            if (obj.id === chosenPlayer.id) {
                return { ...obj, streak: streakCounter };
            } else {
                return obj;
            }
        });
        setPlayers(newState);
        setMessage("Time is up! The correct answer was " + correctAnswer);
    }

    // check if answer is correct
    const checkAnswer = (answer) => {

        if (answer === correctAnswer) {
            let pointsCounter = chosenPlayer.points + 1;
            let streakCounter = chosenPlayer.streak + 1;
            const newState = players.map(obj => {
                // 👇️ if id equals chosenPlayer id, update player points and streak
                if (obj.id === chosenPlayer.id) {
                    return { ...obj, points: pointsCounter, streak: streakCounter };
                }
                // 👇️ otherwise return object as is
                return obj;
            });

            setPlayers(newState);
            setKey(prevKey => prevKey + 1);
            setIsPlaying(false);
            setMessage("Correct! Good job! :)");

        } else if (answer !== correctAnswer) {
            let streakCounter = chosenPlayer.streak = 0;
            const newState = players.map(obj => {
                if (obj.id === chosenPlayer.id) {
                    return { ...obj, streak: streakCounter };
                } else {
                    return obj;
                }
            });

            setPlayers(newState);
            setKey(prevKey => prevKey + 1);
            setIsPlaying(false);
            setCorrectAnswers(0);
            setMessage("Wrong! The correct answer was " + correctAnswer);
        }
    }

    // 15 sec countdown timer
    const TimerForQuestions = () => {
        return (
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
    }

    // if answer button is pressed, show player stats
    if (message === "") {
        return (
            <SafeAreaView style={Styles.PartyModeGameContainer}>
                <Text style={Styles.title}>Trivia</Text>
                <Text style={Styles.category}>{category}</Text>
                <Text style={Styles.question}>{question}</Text>
                <Text style={Styles.question}>{chosenPlayer.name}</Text>
                <View style={Styles.buttons}>
                    <AnswerButtons />
                </View>
                <View>
                    <TimerForQuestions />
                </View>
                <Image source={require('../assets/thinking.gif')} style={
                    {
                        width: 50,
                        height: 70,
                        marginBottom: 0,
                    }
                } />
                <Text style={Styles.pointsText}>
                    Points for {chosenPlayer.name}: {chosenPlayer.points}
                </Text>
                {/* Streak button for every player*/}
                <Text style={Styles.pointsText}>
                    Streak: {chosenPlayer.streak}
                </Text>
                <Button
                    title="Use your powerup"
                    type="outline"
                    titleStyle={{ color: 'white', marginHorizontal: 0 }}
                    onPress={() => {
                        alert("Powerups coming soon!")
                    }}
                />
                <Button
                    title="End game"
                    type="outline"
                    titleStyle={{ color: 'white', marginHorizontal: 30 }}
                    onPress={() => {
                        setIsPlaying(false);
                        navigation.navigate('PartyModeResults');
                    }}
                />
            </SafeAreaView>
        );

    } else if (message === "welcome") {
        return (
            <View style={Styles.PartyModeGameContainer}>
                <Text style={Styles.title}>Welcome!</Text>
                <Text style={Styles.normalText}>Next player is: {players[(players.findIndex(p => p.id === chosenPlayer.id) + 1) % players.length].name}</Text>
                <Button
                    title="Start game"
                    type="outline"
                    titleStyle={{ color: 'white', marginHorizontal: 30 }}
                    onPress={() => {
                        setMessage("");
                        getQuestion();
                    }
                    }
                />
            </View>
        )

    } else {
        return (
            <View style={Styles.PartyModeGameContainer}>
                <Text style={Styles.normalText}>{message}</Text>
                <Text style={Styles.playersTitle}>Players</Text>
                <View style={Styles.playerNames}>
                    <FlatList
                        style={Styles.playerFlatlist}
                        data={players}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <View style={Styles.playerContainer}>
                                <Text style={Styles.flatlistPlayerNames}>{item.name} </Text>
                                <Text style={Styles.flatlistPlayerNames}> Points: {item.points} </Text>
                                <Text style={Styles.flatlistPlayerNames}> Streak: {item.streak} </Text>
                            </View>
                        }
                    />
                </View>
                <Text style={Styles.normalText}>Next player is: {players[(players.findIndex(p => p.id === chosenPlayer.id) + 1) % players.length].name}</Text>
                <Button title="Next question" onPress={() => getQuestion()} />
            </View>
        )
    }
}