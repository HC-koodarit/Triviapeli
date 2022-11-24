import React, { useCallback, useState } from 'react';
import { SafeAreaView, Text, View, Image, FlatList, ActivityIndicator, Modal } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from './Styles.js';
import { PowerUps } from './PowerUps.js';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

export default function PartyModeGame({ navigation, route }) {
    const { playerDetails, selectedDifficulty, selectedCategories } = route.params;

    // modal for powerups
    const [modalText, setModalText] = useState('');
    const [item, setItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const showModal = () => {
        setItem(item);
        setModalVisible(true);
    };

    // Powerups
    const [powerUpMessage, setPowerUpMessage] = useState('');
    const [powerUpList, setPowerUpList] = useState(PowerUps);
    
    // Use first player from route params as the initial value
    const [players, setPlayers] = useState(playerDetails);
    const [chosenPlayer, setChosenPlayer] = useState(players[0]);

    // variables for questions and answers
    const [question, setQuestion] = useState('');
    const [category, setCategory] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);
    const [allAnswers, setAllAnswers] = useState([]);
    const [message, setMessage] = useState('welcome');
    const [answerMessage, setAnswerMessage] = useState('');

    // variables for the countdown timer
    const [isPlaying, setIsPlaying] = useState(false);
    const [key, setKey] = useState(0);

    // variable for drinking rules
    const [drinkMessage, setDrinkMessage] = useState('');

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
                const currentPlayerIndex = players.findIndex(p => p.id === chosenPlayer.id);
                // Set new index for player, and fallback to 0 if next index larger than player count
                const nextIndex = (currentPlayerIndex + 1) % players.length;
                setChosenPlayer(players[nextIndex]);

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
                setDrinkMessage('');
                setPowerUpMessage('');
            })
            .catch(err => console.error(err));

    }, [selectedCategories, chosenPlayer])

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
        let wrongAnswerCounter = chosenPlayer.wrongAnswer + 1;
        const newState = players.map(obj => {
            if (obj.id === chosenPlayer.id) {
                return { ...obj, streak: streakCounter, wrongAnswer: wrongAnswerCounter };
            } else {
                return obj;
            }
        });
        setPlayers(newState);
        setAnswerMessage("Time is up!");
        setMessage("The correct answer was " + correctAnswer);
        getDrinks();
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
            setAnswerMessage("Correct!");
            setMessage("Your answer was: " + correctAnswer);

            // if player gets a powerup, message shows in the point screen
            if (streakCounter === 3) {
                setPowerUpMessage(chosenPlayer.name + ': You got a level 1 power-up!')
            } else if (streakCounter === 5) {
                setPowerUpMessage(chosenPlayer.name + ': You got a level 2 power-up!')
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
            let answerText = answer.toString()
            setAnswerMessage("Wrong!");
            setMessage("You answered: " + answerText + "\n The correct answer was: " + correctAnswer);
            getDrinks();
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

    // Level 1 powerup: give a randomized task for another player
    const GetLevel1PowerUp = () => {
        let i = powerUpList.length;
        const j = Math.floor(Math.random() * i);
        setModalText("Choose another player to " + powerUpList[j] + " or finish their drink");
    }

    // Level 2 powerup: get a hint
    const GetLevel2PowerUp = () => {
        let i = Math.floor(Math.random() * 2);
        let j = Math.floor(Math.random() * (incorrectAnswers.length));
        if (i === 0) {
            setModalText("The correct answer is probably " + correctAnswer + "! Or it might be " + incorrectAnswers[j] + "...");
        } else {
            setModalText("The correct answer is probably " + incorrectAnswers[j] + "! Or it might be " + correctAnswer + "...");
        }
    }

    // Powerup appears if streak is long enough
    const PowerUpButton = () => {
        let powerUpCounter = chosenPlayer.streak;
        if (powerUpCounter >= 3 && powerUpCounter <= 4) {
            return (
                <Button
                    title="Use your level 1 power-up"
                    buttonStyle={Styles.powerUpButton}
                    titleStyle={{ color: 'white', marginHorizontal: 0 }}
                    onPress={() => {
                        GetLevel1PowerUp();
                        showModal(item);
                        setIsPlaying(false);
                    }}
                />
            );
        } else if (powerUpCounter >= 5) {
            return (
                <Button
                    title="Use your level 2 power-up"
                    buttonStyle={Styles.powerUpButton}
                    titleStyle={{ color: 'white', marginHorizontal: 0 }}
                    onPress={() => {
                        GetLevel2PowerUp();
                        showModal(item)
                        setIsPlaying(false);
                    }}
                />
            );
        } else {
            return (
                <Button
                    title="No power-up yet"
                    buttonStyle={Styles.notYetPowerUpButton}
                    titleStyle={{ color: 'white', marginHorizontal: 0 }}
                />
            );
        }
    }

    // drinking logic
    const getDrinks = () => {
        if (chosenPlayer.drink === 'Mild' && chosenPlayer.wrongAnswer > 0 && chosenPlayer.wrongAnswer < 10) {
            setDrinkMessage(`${chosenPlayer.name}: Take a sip!`);
        }
        if (chosenPlayer.drink === 'Mild' && chosenPlayer.wrongAnswer === 9) {
            setDrinkMessage(`${chosenPlayer.name}: Finish your drink!`);

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
            setDrinkMessage(`${chosenPlayer.name}: Take a sip!`);
        }
        if (chosenPlayer.drink === 'Medium' && chosenPlayer.wrongAnswer === 9) {
            setDrinkMessage(`${chosenPlayer.name}: Finish your drink!`);

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
            setDrinkMessage(`${chosenPlayer.name}: Take a shot!`);

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

    // Loading screen, when question fetching is not done.  
    if (isLoading) {
        return (
            <View style={[Styles.PartyModeGameContainer, Styles.loading]}>
                <ActivityIndicator size="large" color="#03bafc" />
            </View>
        );
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
                <View style={{ flexDirection: "row" }}>
                    <Button style={Styles.startGamePContainer}
                        title="End game"
                        buttonStyle={Styles.backButton}
                        titleStyle={{ color: 'white', marginHorizontal: 30 }}
                        onPress={() => {
                            setIsPlaying(false);
                            navigation.navigate('PartyModeResults', { players });
                        }}
                    />
                    <View>
                        <PowerUpButton />
                    </View>
                </View>
                <Modal
                    style={Styles.modalPowerup}
                    animationType="slide"
                    visible={modalVisible}
                    transparent={true}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={Styles.modalPowerup}>
                        <Text style={Styles.modalText}>{modalText}</Text>
                        <Button
                            buttonStyle={{ backgroundColor: 'black', borderColor: 'white', borderWidth: 1, borderRadius: 10 }}
                            title="Close"
                            onPress={() => {
                                const newState = players.map(obj => {
                                    let streakCounter = chosenPlayer.streak = 0;
                                    if (obj.id === chosenPlayer.id) {
                                        return { ...obj, streak: streakCounter };
                                    } else {
                                        return obj;
                                    }
                                });
                                setPlayers(newState);
                                setIsPlaying(true);
                                setModalText('');
                                setModalVisible(!modalVisible)
                            }}
                        />
                    </View>
                </Modal>

            </SafeAreaView>
        );

    } else if (message === "welcome") {
        // welcome screen before the first question
        return (
            <View style={Styles.WelcomeContainer}>
                <Text style={Styles.welcomeTitle}>Welcome!</Text>
                <Text style={Styles.infoText}>The first player is:</Text>
                <Text style={Styles.infoText}>{players[(players.findIndex(p => p.id === chosenPlayer.id) + 1) % players.length].name}</Text>
                <View style={{ flexDirection: "row" }}>
                <Button
                    title='Back home'
                    titleStyle={{ color: 'white', marginHorizontal: 25 }}
                    buttonStyle={Styles.backButton}
                    onPress={() => navigation.navigate('Home')}
                />
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
            </View>
        )

    } else {
        // if answer button is pressed, show player stats
        return (
            <SafeAreaView style={Styles.PartyModeGameContainer}>
                <Text style={Styles.answerMessageText(answerMessage)}>{answerMessage}</Text>
                <View style={Styles.box}>
                    <Text style={Styles.questionText}>{question}</Text>
                    <Text style={Styles.normalTextCentered}>{message}</Text>
                </View>
                
                <Text style={Styles.drinkInfo}>{drinkMessage}</Text>
                <Text style={Styles.question}>{powerUpMessage}</Text>
                <View style={Styles.currentScoreList}>
                <Text style={Styles.scoresHeader}>Current scores:</Text>
                    <FlatList
                        style={Styles.playerFlatlist}
                        data={players}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <View style={Styles.statListContainer}>
                                <Text style={Styles.statsList}>{item.name}</Text>
                                <View style={Styles.playerContainer}>
                                    <Text style={Styles.statsList}>Points: {item.points} Streak: {item.streak}</Text>
                                </View>
                            </View>
                        }
                    />
                </View>
                <Text style={Styles.infoText}>Next player: {players[(players.findIndex(p => p.id === chosenPlayer.id) + 1) % players.length].name}</Text>
                <View style={{ flexDirection: "row" }}>
                <Button style={Styles.startGamePContainer}
                    title="End game"
                    buttonStyle={Styles.backButton}
                    titleStyle={{ color: 'white', marginHorizontal: 30 }}
                    onPress={() => {
                        setIsPlaying(false);
                        navigation.navigate('PartyModeResults', { players });
                    }}
                /> 
                <Button
                    style={Styles.continueButton}
                    type=""
                    title="Next question"
                    titleStyle={{ color: 'white', marginHorizontal: 25, fontWeight: 'bold' }}
                    onPress={() => getQuestion()}
                />
                </View>              
            </SafeAreaView>
        )
    }
}