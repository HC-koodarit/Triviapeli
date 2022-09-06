import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {

fetch('https://opentdb.com/api.php?amount=1&difficulty=medium&type=multiple')
.then((response) => response.json())
.then((json) => {
console.log(json);
})
.catch((error) => {
console.error(error);
});

  return (
    <View style={styles.container}>
      <Text>Triviapeli</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
