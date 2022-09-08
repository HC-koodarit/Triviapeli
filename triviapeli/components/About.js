export default function About() {

    return (
        <View style={styles.container}>
            <Text style={styles.header}>About</Text>
            <Text>All data provided by the API is available under the Creative Commons Attribution-ShareAlike 4.0 International License.</Text>
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
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});