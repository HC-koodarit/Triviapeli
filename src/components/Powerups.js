import PartyModeGame from './components/PartyModeGame';

// when player answers a question correctly five times, the player gets a powerup
// the player has one powerup at a time
// if player doesn't use the powerup, the player will get a better powerup after 10 correct answers
// if player doesn't use the powerup, the player will get a better powerup after 15 correct answers
// if player doesn't use the powerup, the player will get a better powerup after 20 correct answers
// when player uses a powerup, the powerup will be removed from the player's powerup list and the counter will be reset
const [powerups, setPowerups] = useState([]);

// help powerup lvl 1: remove one wrong answer from the list
// help powerup lvl 2: remove two wrong answers from the list
// help powerup lvl 3: skip the question
// help powerup lvl 4: skip the question and make everyone else drink
const [helpPowerup, setHelpPowerup] = useState('');

// drink powerup lvl 1: make someone else drink when the player answers a question incorrectly
// drink powerup lvl 2: make everyone else drink when the player answers a question incorrectly
// drink powerup lvl 3: make someone else finish their drink when the player answers a question incorrectly
// drink powerup lvl 4: make everyone else finish their drink when the player answers a question incorrectly
const [drinkPowerup, setDrinkPowerup] = useState('');

// random powerup lvl 1: have another player answer a question for you and they drink if they get it wrong
// random powerup lvl 2: make another player do squats while they answer their question
// random powerup lvl 3: Another player must call someone and say "I love you" and hang up. If they don't, they finish their drink
// random powerup lvl 4: Kiss of death: another player must give someone a kiss on the cheek and the person they kissed must finish their drink
const [randomPowerup, setRandomPowerup] = useState('');

// sabotage powerup lvl 1: another player will have 5 seconds less to answer the question
// sabotage powerup lvl 2: another player will have the text backwards
// sabotage powerup lvl 3: another player will have the text blurred
// sabotage powerup lvl 4: another player will have the text in a different language
const [sabotagePowerup, setSabotagePowerup] = useState('');

const [message, setMessage] = useState('');