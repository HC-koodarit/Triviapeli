import { StyleSheet } from "react-native";

export default StyleSheet.create({
  //Basic container style
  container: {
    flex: 1,
    backgroundColor: '#020d23',
    alignItems: 'center',
  },
  //Header style used in multiple js files
  header: {
    fontSize: 70,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
    color: '#fff',
  },

  //Rules.js style
  headerRules: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    color: '#fff',
  },
  
  //GameScreen .js styles
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  //Category also used in PartyModeGame
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
    color: '#fff'
  },
  buttons: {
    flexDirection: 'column',
    color: '#fff',
  },

  //Text styles used in alot of js files
  pointsText: {
    color: '#fff'
  },
  normalText: {
    fontSize: 18,
    color: '#fff'
  },

  //About.js styles
  aboutContainer: {
    flex: 1,
    backgroundColor: '#020d23',
    alignItems: 'center'
  },

  //Party mode timer styles
  timer: {
    marginTop: 50,
  },

  //Players tyylit - PartyModeOptions
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
    //View Tyyli
    playersTitle: {
      fontSize: 25,
      alignSelf: 'center',
      fontWeight: 'bold',
      color: '#fff',
      paddingTop: 40,
    },
    //Flatlist playerNames (PartyModeOptions)
    playerNames: {
      //paddingTop: 20,
      width: 500,
      height: 160,
      color: '#fff',
      marginTop: 20,
      marginBottom: 20
    },
    playerFlatlist: {
      flex: 1,
    },

    //Rendered players list (PartyModeOptions)
    playerContainer: {
      marginTop: 1,
      marginBottom: 1,
      justifyContent: 'center',
      flexDirection: 'row',
    },
    AddPlayerButtonContainer: {
      alignItems: 'center',
      marginTop: 5,
    },
    flatlistPlayerNames: {
      color: "#fff",
    },
    playerDrinkImage: {
      width: 25,
      height: 25,
      marginBottom: 0,
    },

    //PartyMode Options Addplayers Popup (PartyModeOptions)
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 40,
    },

    addPlayers: {
      fontSize: 18,
      borderBottomWidth: 1.0,
      borderColor: "#0055b3",
      marginBottom: 5,
      color: 'black',
    },

    modalView: {
      alignItems: "center",
      justifyContent: "center",
    },
    modal: {
      height: 200,
      margin: 50,
      padding: 0,
      backgroundColor: "white",
      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      textAlign: "centered",
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      borderRadius: 10
    },
    /* The content of the modal takes all the vertical space not used by the header. */
    modalContent: {
      flex: 1,
      borderWidth: 1,
      borderColor: "black",
      padding: 15,
    },
    modalHeader: {
      flexDirection: "row",
      borderWidth: 1,
      borderColor: "black"
    },
    /* The header takes up all the vertical space not used by the close button. */
    modalHeaderContent: {
      flexGrow: 1,
      marginLeft: 5,
    },
    modalHeaderCloseText: {
      textAlign: "center",
      paddingLeft: 5,
      paddingRight: 5
    },
    outsideModal: {
      backgroundColor: "rgba(1, 1, 1, 0.2)",
      flex: 1,
    },

    //Dropdown Styles for drink choice (PartyModeOptions)
    dropdownDrinks: {
      height: 50,
      backgroundColor: 'transparent',
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
      marginBottom: 10,
    },
    selectedTextStyleDropdownDrinks: {
      fontSize: 16,
      color: "black",
    },
    iconStyleDropdownDrinks: {
      width: 20,
      height: 20,
    },

    //Button Styles (addplayer & Save Player), (PartyModeOptions)
    buttonpopup: {
      borderRadius: 20,
      padding: 12,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#2196F3",
      borderColor: 'transparent',
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },

    //Text Style for save player text (PartyModeOptions)
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },

    //Pickers and add number (PartyModeOptions)
    pickerPartyMode: {
      fontSize: 18,
      color: '#fff',
      width: 330,
      height: 50,
      marginBottom: 10,
    },

    //Category container (PartyModeOptions)
    categoryContainer: {
      marginBottom: 1,
    },
    //Categories View Style (PartyModeOptions)
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 200,
      alignContent: 'center',
      alignSelf: 'center',
    },

    //Difficulty settings styles
    //Difficulty container PartymodeOptions
    difficultyContainer: {
      marginBottom: 1,
      marginTop: 3
    },

    //Dropdown Styles for category & difficulty (PartyModeOptions)
    dropdown: {
      width: 250,
      backgroundColor: 'transparent',
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
      marginBottom: 10,
      alignSelf: 'center',
    },
    dropdownDifficulty: {
      width: 250,
      backgroundColor: 'transparent',
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
      marginBottom: 10,
      alignSelf: 'center',
    },
    placeholderStyleDropdown: {
      fontSize: 15,
      color: "white",
      alignItems: 'center',
    },
    selectedTextStyleDropdown: {
      fontSize: 12,
      color: "white",
    },
    selectedTextDropdownDifficulty: {
      fontSize: 15,
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

    // Back button (Multiple js files)
    backButton: {
      backgroundColor: '#ff3333',
      borderColor: 'transparent',
      borderWidth: 0,
      borderRadius: 30,
      width: 140,
      marginHorizontal: 25,
      marginTop: 20,
    },

    //Start game button styles (PartyModeOptions)
    startButton: {
      backgroundColor: '#ff6303',
      borderColor: 'transparent',
      borderWidth: 0,
      borderRadius: 30,
      width: 140,
      marginHorizontal: 25,
      marginTop: 20,
    },

    //Button for powerup
    powerUpButton: {
      backgroundColor: '#ff6303',
      borderColor: 'transparent',
      borderWidth: 0,
      borderRadius: 30,
      width: 140,
      marginHorizontal: 25,
      marginTop: 20,
    },

    //Button if you don't have powerup yet
    notYetPowerUpButton: {
      backgroundColor: '#f5975d',
      borderColor: 'transparent',
      borderWidth: 0,
      borderRadius: 30,
      width: 140,
      marginHorizontal: 25,
      marginTop: 20,
    },

    //Start Game button Partymode
    startGamePContainer: {
      marginBottom: 20,
      flexDirection: 'row',
    },

  //Party Mode Container styles
  PartyModeGameContainer: {
    flex: 1,
    backgroundColor: '#020d23',
    alignItems: 'center',
    paddingTop: 40,
  },
  PartyModeResultsContainer: {
    flex: 1,
    backgroundColor: '#020d23',
    alignItems: 'center',
    paddingTop: 40,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    padding: 10
  },
});