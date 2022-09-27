import React from 'react';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Alert } from 'react-native';
import CountDown from 'react-native-countdown-component';
import Styles from './Styles';

export default function GameScreen() {

    // set data to state
    const [data, setData] = useState([]);
    const [question, setQuestion] = useState('');
    const [category, setCategory] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);
    const [allAnswers, setAllAnswers] = useState([]);
    const [points, setPoints] = useState(0);


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
                    console.log(decodeURIComponent(data.results[0].correct_answer));
                    //console.log(incorrectAnswers);
                    //console.log(allAnswers);
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
            buttons.push(<Button title={allAnswers[i]} onPress={() => checkAnswer(allAnswers[i])} key={i}/>);
        }
        return buttons;
    }

    // check if answer is correct
    const checkAnswer = (answer) => {
        if (answer === correctAnswer) {
            alert("Correct!");
            {getQuestion()};
            setPoints(setPoints => setPoints + 1);
        } else {
            alert("Wrong! The correct answer is " + correctAnswer);
            {getQuestion()};
        }
    }

    const timerAlert = () =>
        Alert.alert(
            "Alert Title",
            "My Alert Msg",
            [
                {
                text: "Ok",
                //onPress: (useEffect()),
                },
            ]
    );

    return (
        <View style={Styles.container}>
            <Button
                style={styles.buttons}
                title="Home"
                onPress={() => navigation.navigate('Home')}
            />

            <Text style={Styles.title}>Trivia</Text>
            <Text style={Styles.category}>{category}</Text>
            <Text style={Styles.question}>{question}</Text>
            <View style={Styles.buttons}>
                {answerButtons()}
            </View>
            <Text>Pointcount: {points}</Text>
            <StatusBar style="auto" />
            <CountDown
                until={15}
                onFinish={() => alert('finished')}
                timeToShow={['S']}
                size={20}
                digitTxtStyle={{color: 'black'}}
                timeLabelStyle={{color: 'black', fontWeight: 'bold'}}
                digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625'}}
            />
        </View>
    );
};