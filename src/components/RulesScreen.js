import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from './Styles';

export default function RulesScreen({ navigation }) {

    return (
        <View style={Styles.container}>
            <Text style={Styles.headerRules}>How to play single player mode</Text>
            <Text style={Styles.normalText}>1. Start the game</Text>
            <Text style={Styles.normalText}>2. Answer the questions</Text>
            <Text style={Styles.normalText}>3. Get the highest score</Text>
            <Text style={Styles.normalText}>4. Brag about it</Text>
            <Text> </Text>
            <Text style={Styles.headerRules}>How to play party mode</Text>

            <Text style={Styles.normalText}>1. Add players</Text>
            <Text style={Styles.normalText}>2. Choose your poison</Text>
            <Text style={Styles.normalText}>3. Select categories</Text>
            <Text style={Styles.normalText}>4. Start the game</Text>
            <Text style={Styles.normalText}>5. Answer the questions</Text>
            <Text style={Styles.normalText}>6. Fail and get wasted</Text>
            <Text> </Text>
            <Text style={Styles.headerRules}>Powerups</Text>
            <Text style={Styles.normalText}>Powerups are included in Partymode</Text>
            <Text style={Styles.normalText}>They are random and give player an advantage</Text>
            <Text style={Styles.normalText}>A streak of 3: Level 1 powerup</Text>
            <Text style={Styles.normalText}>A streak of 5: Level 2 powerup</Text>
            <Text style={Styles.normalText}>After using the powerup, streak goes back to 0</Text>
            <Button
                title='Back'
                titleStyle={{ fontWeight: '700' }}
                buttonStyle={Styles.backButton}
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}