import useState from 'react';
import PartyModeGame from './PartyModeGame';

export default function Drinks() {
    const [lowAlcohol, setLowAlcohol] = useState(0);
    const [lowAlcFinished, setLowAlcFinished] = useState(0);
    const [mediumAlcohol, setMediumAlcohol] = useState(0);
    const [mediumAlcFinished, setMediumAlcFinished] = useState(0);
    const [highAlcohol, setHighAlcohol] = useState(0);
    const [message, setMessage] = useState('');

    // Count wrong answers and add drinks

    //TODO pelaajien profiilien linkittäminen, eli jotenkin tyyliin
    // if (PartyModeGame.correctAnswer === false && PartyModeGame.playerNumber === 1) {

    if (PartyModeGame.correctAnswer === false) {
        setLowAlcohol(lowAlcohol + 1);
        setLowAlcFinished(lowAlcFinished + 1);
    }
    if (PartyModeGame.correctAnswer === false) {
        setMediumAlcohol(mediumAlcohol + 1);
        setMediumAlcFinished(mediumAlcFinished + 1);
    }
    if (PartyModeGame.correctAnswer === false) {
        setHighAlcohol(highAlcohol + 1);
    }
// Drinking rules

    if (lowAlcohol === 1) {
        //alert("Take one sip!");
        setMessage("Take one sip!");
        setLowAlcohol(0);
    }
    if (lowAlcFinished === 10) {
        //alert("Finish your drink!");
        setMessage("Finish your drink!");
        setLowAlcFinished(0);
    }
    if (mediumAlcohol === 3) {
        //alert("Take one sip!");
        setMessage("Take one sip!");
        setMediumAlcohol(0);
    }
    if (mediumAlcFinished === 10) {
        //alert("Finish your drink!");
        setMessage("Finish your drink!");
        setMediumAlcFinished(0);
    }
    if (highAlcohol === 10) {
        //alert("Take a shot!");
        setMessage("Take a shot!");
        setHighAlcohol(0);
    }

}