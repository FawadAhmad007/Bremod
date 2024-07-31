/** @format */

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
      marginBottom: moderateScale(5)},
    header: [
      {
        marginBottom: moderateScale(6),
        color: myTheme?.colors?.black,
        textAlign: "left",
      },
      FONTS_STYLE?.TEXT_SMALL,
    ],
    headerContainer: {
      alignSelf: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      width: "90%",
      backgroundColor: myTheme.colors.card,
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
        marginBottom: verticalScale(30),
        textAlign: "center",
        includeFontPadding: false,
      },
    ],
    contentContainer: {
      flexGrow: 1,
      paddingHorizontal: moderateScale(20),
    },

    errorText: {
      color: myTheme?.colors?.red, // Color for error message
      marginTop: 5,
      marginLeft: 5, // Adding some margin to the left for better alignment
    },

    footer: {
      padding: 15,
      backgroundColor: myTheme.colors.primary,
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
      color: myTheme.colors.textColor,
      fontWeight: "bold",
    },

    noteText: {
      color: myTheme?.colors?.red,
      fontSize: moderateScale(12),
      marginBottom: verticalScale(10),
      textAlign: "center",
    },

    loaderContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: myTheme?.colors?.primary, // Semi-transparent black background
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
      height: moderateScale(48),
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
      height: moderateScale(48),
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      color: "black", // Adjust border color to match other fields
    },
    dropdownItemTxtStyle: {
      fontSize: 16,
      color: "black", // Adjust border color to match other fields
    },
    dropdownMenuStyle: {
      marginTop: 5,
      borderWidth: 1,
      borderColor: "black", // Adjust border color to match other fields
      borderRadius: 5,
      maxHeight: verticalScale(150),
    },


    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 50,
      borderColor: myTheme?.colors?.gray,
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 8,
      
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
      color: myTheme?.colors?.black,

    },
    selectedTextStyle: {
      fontSize: 16,
      color: myTheme?.colors?.black,

    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      color: myTheme?.colors?.black,
    },
    touchableContainerStyle: {
      marginTop: moderateScale(5),
      height: moderateScale(24),
      width: moderateScale(48),
    },
    backButtonText: [
      FONTS_STYLE.HEADING_MEDIUM,
      {
        marginStart: moderateScale(7),
        color: myTheme?.colors?.black,
      },
    ]
  });
