import React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, Button, Text, View, } from 'react-native';
import Styles from './Styles';
import {Picker} from '@react-native-picker/picker';

export default function PartymodeOptions() {

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');

    return(
        <View style={Styles.container}>
            <Text>Pick category:</Text>
            <Text>Pick difficulty:</Text>
            
            <Button
                title='Start game'
                onPress={() => navigation.navigate('Partymode')}
            />
        </View>
    );
}