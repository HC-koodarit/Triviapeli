import React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Alert, Platform, FlatList, Image  } from 'react-native';
import { Input, Button, ListItem, Icon } from 'react-native-elements';
import Styles from './Styles.js';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

export default function GameScreen({ navigation, route }) {
    const { players, selectedDifficulty, selectedCategories } = route.params;
    const [chosenPlayer, setChosenPlayer] = useState("");

    // TEST DATA
    //
    //
    // add 2 players to test the game screen (remove later)
    /*const [players, setPlayers] = useState([
        {
            name: 'Player 1',
            points: 0,
            powerups: [],
            drink: 0,
            drinkPowerup: 0,
            helpPowerup: 0,
            randomPowerup: 0,
            sabotagePowerup: 0,
        },
        {
            name: 'Player 2',
            points: 0,
            powerups: [],
            drink: 0,
            drinkPowerup: 0,
            helpPowerup: 0,
            randomPowerup: 0,
            sabotagePowerup: 0,
        },
    ]);*/

    // use 3 categories for testing (remove later)
    const [categories, setCategories] = useState([
        {
            id: 9,
            name: 'General Knowledge',
        },
        {
            id: 10,
            name: 'Entertainment: Books',
        },
        {
            id: 11,
            name: 'Entertainment: Film',
        },
    ]);

    // for fetching the questions
    const [categoryForQuestion, setCategoryForQuestion] = useState(0);

    // randomize the categoryForQuestion from the categories array (remove later)
    const randomCategory = () => {
        const random = Math.floor(Math.random() * selectedCategories.length);
        setCategoryForQuestion(selectedCategories[random]);
    }

    // use easy difficulty for testing (remove later)
    const [difficulty, setDifficulty] = useState('easy');

    // use 10 questions for testing (remove later)
    const [amount, setAmount] = useState(10);
    //
    //
    // END OF TEST DATA


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
    const [isPlaying, setIsPlaying] = useState(true);
    const [key, setKey] = useState(0);

    // fetch question data from api and set to variables
    const getQuestion = () => {
        fetch(`https://opentdb.com/api.php?amount=${amount}&category=${categoryForQuestion}&difficulty=${difficulty}&encode=url3986`)
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
        randomCategory();
        getQuestion();
        //console.log(players);
        console.log(selectedCategories);
        //console.log(selectedDifficulty);
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
            setCorrectAnswers(correctAnswers + 1);
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

    const randomplayer = () => {
        const random = Math.floor(Math.random() * players.name.length);
        //setChosenPlayer(random);
        console.log(random);
    }

    // 15 sec countdown timer
    const TimerForQuestions = () => (
        <View style={Styles.timer}>
        <CountdownCircleTimer
            key={key}
            isPlaying={isPlaying}
            duration={15}
            colors={'#004777'}
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
                    width: 200,
                    height: 200,
                    marginBottom: 0,
                }
            } />

            <Text
                style={Styles.pointsText}
                >Pointcount: {points}</Text>
            <Text
                style={Styles.pointsText}
                >Streak: {correctAnswers}</Text>
            <Button
                title="USE YOUR POWER UP"
                type="outline"
                onPress={() => {
                    setIsPlaying(false);
                    navigation.navigate('Pointscreen', {points: points});
                }}
            />
        </SafeAreaView>
    );
};