import React from 'react';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
    return (
        <View style = { styles.container } >
            <Text> Moi!! Tänne sääntöjä </Text>
            <StatusBar style = "auto" />
        </View>
    );
};