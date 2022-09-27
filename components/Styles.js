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
    },
    buttons: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold'
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
});