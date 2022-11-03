import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Alert, Platform, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from './Styles.js';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

export default function GameScreen({ navigation, route }) {
    const { playerDetails, selectedDifficulty, selectedCategories } = route.params;
    
    // Use first player from route params as the initial value
    const [players, setPlayers] = useState(playerDetails);
    const [chosenPlayer, setChosenPlayer] = useState(players[0]);
    const [playersCorrectAnswers, setPlayersCorrectAnswers] = useState([0]);
    //const [playersStreak, setPlayersStreak] = useState([]);   // not yet in use

    // variables for questions and answers
    const [question, setQuestion] = useState('');
    const [category, setCategory] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);
    const [allAnswers, setAllAnswers] = useState([]);

    // variable for the player's score
    const [points, setPoints] = useState(0);

    // count correct answers for powerups
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
            })
            .catch(err => console.error(err));

    }, [selectedCategories, chosenPlayer])

    useEffect(() => {
        getQuestion();
    }, []);

    // buttons for answers
    const answerButtons = () => allAnswers.map((answer) => 
        <Button title={answer} type="outline" onPress={() =>
            checkAnswer(answer)} key={answer} />)

    // timer runs out
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
            let pointsCounter = chosenPlayer.points + 1;
            const newState = players.map(obj => {
                // 👇️ if id equals chosenPlayer id, update player points
                if (obj.id === chosenPlayer.id) {
                  return {...obj, points: pointsCounter};
                }
                // 👇️ otherwise return object as is
                return obj;
            });

            setPlayers(newState);
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
            setCorrectAnswers(0);

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
                {({ remainingTime }) => 
                <Text style={Styles.normalText}>{remainingTime}</Text>}
            </CountdownCircleTimer>
        </View>
    )

    return (
        <SafeAreaView style={Styles.container}>
            <Text style={Styles.title}>Trivia</Text>
            <Text style={Styles.category}>{category}</Text>
            <Text style={Styles.question}>{question}</Text>
            <Text style={Styles.question}>{chosenPlayer.name}</Text>
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
            <Text style={Styles.pointsText}>
                Points for {chosenPlayer.name}: {chosenPlayer.points}
            </Text>
            {/* Streak button for every player
            <Text style={Styles.pointsText}>
                Streak: {correctAnswers}
            </Text>
            */}
            <Button
                title="Use your powerup"
                type="outline"
                onPress={() => {
                    alert("Powerups coming soon!")
                }}
            />
            <Button
                title="End game"
                type="outline"
                onPress={() => {
                    setIsPlaying(false);
                    navigation.navigate('PartyModeResults');
                }}
            />
        </SafeAreaView>
    );
};