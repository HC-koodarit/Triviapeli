import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Alert, Platform, Image, FlatList, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from './Styles.js';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

export default function GameScreen({ navigation, route }) {
    const { playerDetails, selectedDifficulty, selectedCategories } = route.params;

    // Powerups
    const [powerUpList, setPowerUpList] = ["Do a backflip", "Sprint around the house", "message someone"];
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

    // variables for drinking rules

    const [lowAlcohol, setLowAlcohol] = useState(0);
    const [lowAlcFinished, setLowAlcFinished] = useState(0);
    const [mediumAlcohol, setMediumAlcohol] = useState(0);
    const [mediumAlcFinished, setMediumAlcFinished] = useState(0);
    const [highAlcohol, setHighAlcohol] = useState(0);
    const [drinkMessage, setDrinkMessage] = useState('');
    const [powerUpMessage, setPowerUpMessage] = useState('');
    
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
                setDrinkMessage('');
                setPowerUpMessage('');
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
            setMessage("Your answer was: " + correctAnswer + "\nCorrect! Good job! :)");

            if (streakCounter === 3 || streakCounter === 4 ) {
                setPowerUpMessage('You got a level 1 powerup!')
            } else if (streakCounter >= 5) {
                setPowerUpMessage('You got a level 2 powerup!')
            };

        } else if (answer !== correctAnswer) {
            let streakCounter = chosenPlayer.streak = 0;
            let wrongAnswerCounter = chosenPlayer.wrongAnswer + 1;

            const newState = players.map(obj => {
                if (obj.id === chosenPlayer.id) {
                    return { ...obj, streak: streakCounter, wrongAnswer: wrongAnswerCounter };
                } else {
                    return obj;
                }
            });

            setPlayers(newState);
            setKey(prevKey => prevKey + 1);
            setIsPlaying(false);
            setCorrectAnswers(0);
            let answerText = answer.toString()
            setMessage("Your answer was: " + answerText + "\nWrong! The correct answer was " + correctAnswer);

            // drinking logic
            if (chosenPlayer.drink === 'Mild' && chosenPlayer.wrongAnswer < 10) {
                setDrinkMessage('Take a sip!');
            }
            if (chosenPlayer.drink === 'Mild' && chosenPlayer.wrongAnswer === 9) {
                setDrinkMessage('Finish your drink!');

                //Resets wronganswer counter of active player
                const wrongAnswerReset = players.map(obj => {
                    if (obj.id === chosenPlayer.id) {
                        console.log("obj:")
                        console.log(obj);
                        return { ...obj, wrongAnswer: 0 };
                    } else {
                        return obj;
                    }
                });
                setPlayers(wrongAnswerReset);
            }
            if (chosenPlayer.drink === 'Medium' && chosenPlayer.wrongAnswer === 2 ||
                chosenPlayer.drink === 'Medium' && chosenPlayer.wrongAnswer === 4 ||
                chosenPlayer.drink === 'Medium' && chosenPlayer.wrongAnswer === 7) {
                setDrinkMessage('Take a sip!');
            }
            if (chosenPlayer.drink === 'Medium' && chosenPlayer.wrongAnswer === 9) {
                setDrinkMessage('Finish your drink!');

                //Resets wronganswer counter of active player
                const wrongAnswerReset = players.map(obj => {
                    if (obj.id === chosenPlayer.id) {
                        console.log("obj:")
                        console.log(obj);
                        return { ...obj, wrongAnswer: 0 };
                    } else {
                        return obj;
                    }
                });
                setPlayers(wrongAnswerReset);
            }
            if (chosenPlayer.drink === 'Strong' && chosenPlayer.wrongAnswer === 9) {
                setDrinkMessage('Take a shot!');

                //Resets wronganswer counter of active player
                const wrongAnswerReset = players.map(obj => {
                    if (obj.id === chosenPlayer.id) {
                        console.log("obj:")
                        console.log(obj);
                        return { ...obj, wrongAnswer: 0 };
                    } else {
                        return obj;
                    }
                });
                setPlayers(wrongAnswerReset);
            }
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

    // Randomizing powerups
    function Rand(){
        let i = powerUpList.length - 1;
        const j = Math.floor(Math.random() * i);
        powerUpListString = JSON.stringify(powerUpList);
        return powerUpListString[j];
    }

    
    // Powerup appears if streak is long enough
    const PowerUpButton = () => {
        let powerUpCounter = chosenPlayer.streak;
        if (powerUpCounter === 1 || powerUpCounter === 4) {
            return (
                <Button 
                    title="Use your stage 1 powerup"
                    buttonStyle={Styles.powerUpButton}
                    titleStyle={{ color: 'white', marginHorizontal: 0 }}
                    onPress={() => {
                        alert({Rand})
                    }}
                />
            );
        } else if (powerUpCounter === 5 || powerUpCounter > 5) {
            return (
                <Button 
                    title="Use your stage 2 powerup"
                    buttonStyle={Styles.powerUpButton}
                    titleStyle={{ color: 'white', marginHorizontal: 0 }}
                    onPress={() => {
                        alert({Rand})
                }}
            />
            );
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
            <View style={Styles.WelcomeContainer}>
                <Text style={Styles.welcomeTitle}>Welcome!</Text>
                <Text style={Styles.infoText}>The first player is:</Text>
                <Text style={Styles.infoText}>{players[(players.findIndex(p => p.id === chosenPlayer.id) + 1) % players.length].name}</Text>
                <Button
                    style={Styles.startButton}
                    title="Start game"
                    type=""
                    titleStyle={{ color: 'white', marginHorizontal: 25 }}
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
            <SafeAreaView style={Styles.PartyModeGameContainer}>
                <Text style={Styles.normalText}>{question}</Text>
                <Text style={Styles.normalText}>{message}</Text>
                <Text style={Styles.playersTitle}>Current scores</Text>
                <Text style={Styles.question}>{drinkMessage}</Text>
                <Text style={Styles.question}>{powerUpMessage}</Text>
                <View style={Styles.currentScoreList}>
                    <FlatList
                        style={Styles.playerFlatlist}
                        data={players}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <View style={Styles.playerContainer}>
                                <Text style={Styles.statsList}>{item.name} </Text>
                                <Text style={Styles.statsList}> Points: {item.points} </Text>
                                <Text style={Styles.statsList}> Streak: {item.streak} </Text>
                                <Text style={Styles.flatlistPlayerNames}> Wrong answers: {item.wrongAnswer} </Text>
                            </View>
                        }
                    />
                </View>
                <Text style={Styles.infoText}>Next player: {players[(players.findIndex(p => p.id === chosenPlayer.id) + 1) % players.length].name}</Text>
                <Button 
                    style={Styles.continueButton}
                    type=""
                    title="Next question" 
                    titleStyle={{ color: 'white', marginHorizontal: 25, fontWeight: 'bold' }}
                    onPress={() => getQuestion()} 
                />
            </SafeAreaView>
        )
    }
}