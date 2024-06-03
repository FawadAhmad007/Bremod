import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { FONTS_STYLE } from "../../shared/themes/style/common";

export const style = (myTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: myTheme.colors.background,
      padding: 15, // Added padding around the screen
    },

    inputFieldContainer: {
      marginBottom: 15, // Gap between fields
    },

    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 15,
      backgroundColor: myTheme.colors.card,
      //   borderBottomWidth: 1,
      borderBottomColor: myTheme.colors.border,
    },
    touchableContainerStyle: {
      padding: 10,
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
      padding: moderateScale(20),
    },

    errorText: {
      color: "red", // Color for error message
      marginTop: 5,
      marginLeft: 5, // Adding some margin to the left for better alignment
    },

    footer: {
      padding: 15,
      backgroundColor: myTheme.colors.card,
      marginTop: moderateScale(20),
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

    loaderContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
    },
  });
