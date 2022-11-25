<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

# Triviapeli

A trivia drinking game app to play alone or with friends!

<!-- TABLE OF CONTENTS -->
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li><a href="#tools-and-libraries">Tools and Libraries</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#how-to-play">How to Play</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#team-members">Team Members</a></li>
    <li><a href="#license">License</a></li>
  </ol>



<!-- ABOUT THE PROJECT -->
## About The Project

Triviapeli was created during the Software Project II (Ohjelmistoprojekti II) course at Haaga-Helia University of Applied Sciences in the autumn of 2022. The project was created by a team of six students specialising in software development.

Triviapeli is a React Native mobile app where players answer trivia questions from different categories, with a time limit on each question. The questions are fetched from [The Open Trivia Database API](https://opentdb.com/api_config.php).

The game can be played in either single-player or multiplayer mode. The multiplayer mode also functions as a drinking game. Players can choose what kind of drink they have, and answering questions incorrectly will eventually make the game prompt players to drink. Meanwhile, answering questions correctly will award players with power-ups that can be used to give other players tasks or get hints about the correct answer.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- TOOLS AND LIBRARIES -->
## Tools and Libraries

This project was built with the following tools and libraries:

* [React Native](https://reactnative.dev/)
* [Expo](https://expo.dev/)
* [Open Trivia Database API](https://opentdb.com/api_config.php)
* [React Native Elements](https://reactnativeelements.com/)
* [React Native Countdown Circle Timer](https://www.npmjs.com/package/react-native-countdown-circle-timer)
* [React Native Element Dropdown](https://www.npmjs.com/package/react-native-element-dropdown)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

You can run the application locally by following these steps!

### Prerequisites

In order to run the app locally, you need the following:
* [Node.js](https://nodejs.org/en/)
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* [Git](https://www.git-scm.com/)
* [Expo Cli](https://docs.expo.dev/get-started/installation/#1-expo-cli)
* [Expo Go](https://docs.expo.dev/get-started/installation/#2-expo-go-app-for-android-and) app on your phone (available on iOS and Android)

### Installation

1. Clone this repository
   ```sh
   git clone https://github.com/HC-koodarit/Triviapeli.git
   ```
   For more information about cloning repositories or troubleshooting, see [GitHub Docs](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
2. Install NPM packages at \Triviapeli
   ```sh
   npm install
   ```
3. Start the app
   ```sh
   npm start
   ```
   or
      ```sh
   npx expo start
   ```
4. Read the QR code on your phone's camera (iOS) or the Expo Go app (Android)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- HOW TO PLAY -->
## How to Play

When you open the app, you first see the home screen. Here you can choose which game mode you would like to play, Quickplay or Partymode. Quickplay is the single-player version that takes you straight to the game without any additional setup, while Partymode is the drinking game multiplayer mode for at least two players.

![HomeScreen](https://github.com/HC-koodarit/Triviapeli/blob/main/readme-images/homescreen.jpg)

### Quickplay

The game begins immediately when you press the Quickplay button! Read the question and press on the right answer within 15 seconds. After you choose an answer (or the timer runs out) the results screen is shown, where you can see if the answer was correct, and your current points. End the game at any time by pressing the "End game" button.

![Quickplay](https://github.com/HC-koodarit/Triviapeli/blob/main/readme-images/quickplay.jpg) ![Correct](https://github.com/HC-koodarit/Triviapeli/blob/main/readme-images/correct.jpg)

### Partymode

#### Setup and Adding Players

Before the game starts, you are taken to the options screen. You can add players to the game by pressing the "Add player" button. Every player must choose a name and what type of drink they're using (the game can, of course, be played with non-alcoholic drinks as well). At least two players are needed to start the game, but there's no limits otherwise. You can also choose which categories you want the questions to be from, and what difficulty you want to use. At least one category must be selected to start the game. If you don't choose a difficulty, the game will use questions from all three difficulties.

![Options](https://github.com/HC-koodarit/Triviapeli/blob/main/readme-images/options.jpg) ![AddPlayer](https://github.com/HC-koodarit/Triviapeli/blob/main/readme-images/addplayer.jpg)

#### Gameplay

When you start the game, the game will tell you which player goes first.

![Welcome](https://github.com/HC-koodarit/Triviapeli/blob/main/readme-images/welcome.jpg)

That player takes the phone, reads the question, and presses on the right answer within 15 seconds. After the player chooses an answer (or the timer runs out) the results screen is shown, where players can see if the answer was correct, and everyone's current scores. If a player answers enough questions incorrectly, the game will prompt them to take a sip or finish their drink. The results screen also shows which player is up next.

The game can be ended at any time by pressing the "End game" button. Players will then see the final results!

![Results](https://github.com/HC-koodarit/Triviapeli/blob/main/readme-images/results.jpg)

#### Power-ups

If a player answers questions correctly, they start building a streak. Once a player gets a streak of three correct answers, they earn a level 1 power-up. This power-up can be used on their next turn to assign a task for another player. If a player gets a streak of five correct answers, their power-up upgrades to level 2, which can be used to get a hint.

![Partymode](https://github.com/HC-koodarit/Triviapeli/blob/main/readme-images/partymode.jpg) ![Powerup](https://github.com/HC-koodarit/Triviapeli/blob/main/readme-images/powerup.jpg)

Using a power-up resets the streak, so the player can only have one power-up at a time. Answering a question incorrectly also resets the streak and removes the power-up! The player can determine when they want to use their powerup, or if they want to take the risk of losing it...

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/HC-koodarit/Triviapeli/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- TEAM MEMBERS -->
## Team Members

The team members in alphabetical order are:

* Sebastian Bergman
* Henni Haavistola
* Sofia Lumme
* Mari Paltiala
* Kristian Riihelä
* Daniel Ristikari

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


