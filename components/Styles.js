import { StyleSheet } from "react-native";

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#020d23',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
    },
    buttons: {
        flexDirection: 'column',
        color: '#fff',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
    },
    category: {
        fontSize: 14,
        marginBottom: 10,
    },
    question: {
        fontSize: 15,
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        margin: 20,
        color: '#fff',
    },
    addPlayers: {
        fontSize: 18,
        width: 120,
        borderBottomWidth: 1.0,
        marginBottom: 5,
        color: '#fff',
    },
    picker: {
        fontSize: 18,
        color: '#fff',
        width: 330,
        height: 100,
    }
});