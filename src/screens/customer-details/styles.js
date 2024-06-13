import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { FONTS_STYLE } from "../../shared/themes/style/common";

export const style = (myTheme) =>
  StyleSheet.create({
    // container: {
    //   flex: 1,
    //   backgroundColor: myTheme.colors.background,
    //   padding: 15, // Added padding around the screen
    // },

    inputFieldContainer: {
      marginBottom: moderateScale(5), // Gap between fields
    },

    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      margin: moderateScale(0),
      paddingVertical: moderateScale(15),
      backgroundColor: myTheme.colors.card,
      borderBottomColor: myTheme.colors.border,
    },
    touchableContainerStyle: {
      padding: moderateScale(15),
    },
    leftIcon: {
      width: moderateScale(20),
      height: moderateScale(20),
    },
    headingTextStyle: [
      FONTS_STYLE.TEXT_HEADING,
      {
        width: "70%",
        alignSelf: "center",
        color: myTheme?.colors?.black,
        marginVertical: verticalScale(20),
        textAlign: "center",
        includeFontPadding: false,
      },
    ],
    contentContainer: {
      flexGrow: 1,
      paddingHorizontal: moderateScale(20),
    },

    errorText: {
      color: "red", // Color for error message
      marginTop: 5,
      marginLeft: 5, // Adding some margin to the left for better alignment
    },

    footer: {
      padding: 15,
      backgroundColor: myTheme.colors.card,
      marginTop: moderateScale(10),
    },
    checkoutButton: {
      backgroundColor: myTheme.colors.secondary,
      paddingVertical: 15,
      borderRadius: 30,
      alignItems: "center",
    },
    disablecheckoutButton: {
      backgroundColor: myTheme.colors.secondary,
      paddingVertical: 15,
      borderRadius: 30,
      alignItems: "center",
      pointerEvents: "none",
      opacity: 0.5,
    },

    checkoutButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
    },

    noteText: {
      color: "red",
      fontSize: moderateScale(12),
      marginBottom: verticalScale(10),
      textAlign: "center",
    },

    loaderContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
    },
    container: {
      flex: 1,
      // justifyContent: "center",
      // alignItems: "center",
    },
    title: {
      fontSize: 20,
      marginBottom: 20,
    },
    dropdownButton: {
      width: "80%",
      height: 50,
      backgroundColor: "#FFF",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#444",
    },
    dropdownButtonText: {
      color: "#444",
      textAlign: "left",
    },
    label: {
      fontSize: 14,
      marginBottom: 5,
      textAlign: "left",
      color: "black",
    },
    dropdownButtonStyle: {
      borderWidth: 1,
      borderColor: "#6a6a6a", // Adjust border color to match other fields
      width: "100%",
      borderRadius: 5,
      padding: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    dropdownButtonTxtStyle: {
      fontSize: 14,
      color: myTheme?.colors?.black,
    },
    dropdownButtonArrowStyle: {
      fontSize: 20,
      marginLeft: 10,
    },
    dropdownItemStyle: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      color: "#6a6a6a", // Adjust border color to match other fields
    },
    dropdownItemTxtStyle: {
      fontSize: 16,
      color: "#6a6a6a", // Adjust border color to match other fields
    },
    dropdownMenuStyle: {
      marginTop: 5,
      borderWidth: 1,
      borderColor: "#333", // Adjust border color to match other fields
      borderRadius: 5,
      height: 200, // Adjust the height as needed
    },
  });
