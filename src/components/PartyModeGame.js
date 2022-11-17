import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Alert, Platform, Image, FlatList, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from './Styles.js';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

export default function GameScreen({ navigation, route }) {
    const { playerDetails, selectedDifficulty, selectedCategories } = route.params;

    const {powerUpTrue, setPowerUpTrue} = useState(false);

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

    // variable for loadingscreen
    const [isLoading, setIsLoading] = useState(false);

    // fetch question data from api and set to variables
    const getQuestion = useCallback(() => {
        setIsLoading(true);
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
                setIsLoading(false);
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
        let streakCounter = chosenPlayer.streak = 0;    // reset player's streak
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
                    size={60}
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


    // Loading screen, when question fetching is not done.  
    if (isLoading) {
        return(
            <View style={[Styles.PartyModeGameContainer, Styles.loading]}>
                <ActivityIndicator size="large" color="#03bafc" />
            </View>
        );
    }
    
    const PowerUpButton = () => {
        let powerUpCounter = chosenPlayer.streak;
        if (powerUpCounter === 3) {
            return (
                <Button 
                title="Use your powerup"
                buttonStyle={Styles.powerUpButton}
                titleStyle={{ color: 'white', marginHorizontal: 0 }}
                onPress={() => {
                    alert("Choose a player to do ten pushups")
                }}
            />
        )
        } else {
        return (
            <Button 
            title="No powerup yet"
            buttonStyle={Styles.notYetPowerUpButton}
            titleStyle={{ color: 'white', marginHorizontal: 0 }}
            />
        );
    }
    }
    

    // gameplay screen
    if (message === "") {
        return (
            <SafeAreaView style={Styles.PartyModeGameContainer}>
                <Text style={Styles.title}>Trivia</Text>
                <Text style={Styles.category}>{category}</Text>
                <Text style={Styles.question}>{question}</Text>
                <Text style={Styles.playerName}>{chosenPlayer.name}</Text>
                <Text style={Styles.pointsText}>
                    Points: {chosenPlayer.points}, Streak: {chosenPlayer.streak}
                </Text>
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
            <View style={{ flexDirection:"row" }}>
                <View>
                    <PowerUpButton />    
                </View>
                
                <Button style={Styles.startGamePContainer}
                    title="End game"
                    buttonStyle={Styles.backButton}
                    titleStyle={{ color: 'white', marginHorizontal: 30 }}
                    onPress={() => {
                        setIsPlaying(false);
                        navigation.navigate('PartyModeResults', { players });
                    }}
                />
            </View>
            </SafeAreaView>
        );

    } else if (message === "welcome") {
        // welcome screen before the first question
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
        // if answer button is pressed, show player stats
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
                                <Text style={Styles.flatlistPlayerNames}>{item.name} – </Text>
                                <Text style={Styles.flatlistPlayerNames}> Points: {item.points} – </Text>
                                <Text style={Styles.flatlistPlayerNames}> Streak: {item.streak} </Text>
                            </View>
                        }
                    />
                </View>
                <Text style={Styles.normalText}>Next player: {players[(players.findIndex(p => p.id === chosenPlayer.id) + 1) % players.length].name}</Text>
                <Button title="Next question" onPress={() => getQuestion()} />
            </View>
        )
    }
}
