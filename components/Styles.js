import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#020d23',
        alignItems: 'center',
        marginTop: 0,
        paddingTop: 0,
    },
    header: {
        fontSize: 70,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
        color: '#fff',
    },
    headerRules: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
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
        color: '#fff'
    },
    question: {
        fontSize: 15,
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        margin: 20,
        color: '#fff',
    },
    picker: {
        fontSize: 18,
        color: '#000000',
        backgroundColor: '#fff',
        width: 360,
        height: 50,
    },
    pointsText: {
        color: '#fff'
    },
    normalText: {
        fontSize: 18,
        color: '#fff',
    },
    picker: {
        fontSize: 18,
        color: '#fff',
        width: 330,
        height: 80,
        marginBottom: 20,
    },
    aboutContainer: {
        flex: 1,
        backgroundColor: '#020d23',
        marginTop: 0,
    },

    timer: {
        marginTop: 50,
    },
    
    //PartyModeOptions StyleSheet
    partyOptionsContainer: {
        flex: 1,
        backgroundColor: '#020d23',
    },
    playerContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    otherOptionsContainer: {
        flex: 5,
    },
    playerNames: {
        marginTop: 10,
        width: 100,
        color: '#fff',
        marginBottom: 20,
    },
    flatlistPlayerNames: {
        color: "#fff",
    },
    addPlayers: {
        fontSize: 18,
        width: 360,
        borderBottomWidth: 1.0,
        borderColor: "#fff",
        marginBottom: 5,
        color: '#fff',
    },
    playerContainer: {
        marginTop: 10,
        justifyContent: 'center',
        marginBottom: 10,
      },
    pickerPartyMode: {
        fontSize: 18,
        color: '#fff',
        width: 330,
        height: 50,
        marginBottom: 10,
    },
    addNumber: {
        fontSize: 18,
        height: 35,
        borderColor: '#fff',
        borderWidth: 0.5,
        alignItems: 'center',
        borderColor: "#fff",
        marginBottom: 5,
        color: '#fff',
        textAlign: 'center'
    },
    scrollView: {
        backgroundColor: '#020d23',
        marginHorizontal: 10,
    },

    //Category container Partymode
    categoryContainer: {
        marginBottom: 15,
    },

    //Difficulty container Partymode
    difficultyContainer: {
        marginBottom: 15,
    },

    //Drinks container Partymode
    drinkContainer: {
        marginBottom: 15,
    },

    //Questions container Partymode
    questionContainer: {
        marginBottom: 15,
    },

    //Start Game button Partymode
    startGamePContainer: {
        marginBottom: 20,
    },

    //MultiSelect Dropdown Styles
    dropdown: {
      height: 50,
      backgroundColor: 'transparent',
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
    },
    placeholderStyleDropdown: {
      fontSize: 16,
      color: "white",
    },
    selectedTextStyleDropdown: {
      fontSize: 14,
      color: "white",
    },
    iconStyleDropdown: {
      width: 20,
      height: 20,
    },
    inputSearchStyleDropdown: {
      height: 40,
      fontSize: 16,
    },
    iconDropdown: {
      marginRight: 5,
    },
    selectedStyleDropdown: {
      borderRadius: 12,
    },
});