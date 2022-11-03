import { StyleSheet } from "react-native";

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#020d23',
        alignItems: 'center',
    },
    header: {
        fontSize: 70,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 50,
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
        alignItems: 'center',
    },
    
    optionsSubTitle: {
      fontSize: 25,
      alignSelf: 'center',
      fontWeight: 'bold',
      color: '#fff',
      paddingTop: 10,
    },
    playerContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    otherOptionsContainer: {
        flex: 5,
    },

    //Players tyylit
      playersTitle: {
        fontSize: 25,
        alignSelf: 'center',
        fontWeight: 'bold',
        color: '#fff',
        paddingTop: 40,
      },
      //Flatlist playerNames
      playerNames: {
        //paddingTop: 20,
        width: 500,
        height: 100,
        color: '#fff',
        marginTop: 20,
        marginBottom: 20
      },
      playerFlatlist: {
        flex: 1,
      },
      flatlistPlayerNames: {
        color: "#fff",
      },

      //Add players text input styles
      addPlayers: {
          fontSize: 18,
          width: 250,
          borderBottomWidth: 1.0,
          borderColor: "#0055b3",
          marginBottom: 5,
          color: 'black',
      },
      playerContainer: {
          marginTop: 1,
          marginBottom: 1,
          justifyContent: 'center',
          flexDirection: 'row',
      },
      

      //PartyMode Options Addplayers Popup
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40,
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      buttonpopup: {
        borderRadius: 20,
        padding: 15,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
        marginBottom: 20
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 200,
        alignContent: 'center',
        alignSelf: 'center',
      },

      //Pickers and add number
      pickerPartyMode: {
          fontSize: 18,
          color: '#fff',
          width: 330,
          height: 50,
          marginBottom: 10,
      },

      //Category container Partymode
      categoryContainer: {
          marginBottom: 1,
      },

    //Difficulty container Partymode
    difficultyContainer: {
        marginBottom: 1,
        marginTop: 3
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
        marginBottom: 100,
    },

    //Dropdown Styles for drink choice
    dropdownDrinks: {
      height: 50,
      width: 250,
      backgroundColor: 'transparent',
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
      marginBottom: 10,
    },
    placeholderStyleDropdownDrinks: {
      fontSize: 16,
      color: "black",
    },
    selectedTextStyleDropdownDrinks: {
      fontSize: 14,
      color: "black",
    },
    iconStyleDropdownDrinks: {
      width: 20,
      height: 20,
    },

    //Dropdown Styles for category & difficulty
    dropdown: {
        height: 50,
        width: 250,
        backgroundColor: 'transparent',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginBottom: 20,
        alignSelf: 'center',
      },
      placeholderStyleDropdown: {
        fontSize: 16,
        color: "white",
        alignItems: 'center'
      },
      selectedTextStyleDropdown: {
        fontSize: 12,
        color: "white",
      },
      iconStyleDropdown: {
        width: 20,
        height: 20,
      },
      iconDropdown: {
        marginRight: 5,
      },
      selectedStyleDropdown: {
        borderRadius: 12,
      },
});