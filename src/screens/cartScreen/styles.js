/** @format */

import { StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { FONTS_STYLE } from "../../shared/themes/style/common";
export const style = (myTheme) =>
  StyleSheet.create({
    headingTextStyle: [
      FONTS_STYLE.TEXT_HEADING,
      {
        width: "70%",
        alignSelf: "center",
        color: myTheme?.colors?.black,
        marginVertical: verticalScale(30),
        textAlign: "center",
        includeFontPadding: false,
      },
    ],
    container: {
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      position: "relative",
      width: "90%",
    },
    subContainer: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    },
    cartItem: {
      flexDirection: "row",
      padding: 10,
      marginBottom: 10,
      backgroundColor: myTheme?.colors?.lightGray,
      borderRadius: 20,
      elevation: 2,
    },
    productImage: {
      width: 80,
      height: 80,
      marginRight: 10,
    },
    productDetails: {
      flex: 1,
      justifyContent: "center",
    },
    productName: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 10,
    },
    counterRow: {
      marginBottom: 5,
    },
    counterButton: {
      paddingLeft: moderateScale(10),
	  paddingRight: moderateScale(10),
      backgroundColor: "#ddd",
      borderRadius: 4,
    },
    counterButtonText: {
      fontSize: 18,
      fontWeight: "bold",
    },
    counterText: {
      // marginHorizontal: 10,
      fontSize: 16,
    },

    productDescriptionDetails: {
      flexDirection: "column",
      paddingRight: moderateScale(20),
    },
    productColor: {
      fontSize: 16,
      color: "#666",
      marginBottom: 10,
    },

    productColorSpan: {
      fontWeight: "bold",
    },
    productPrice: {
      fontSize: 16,
      fontWeight: "bold",
    },
    footer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "#fff",
      padding: 20,
    },
    totalPriceLabel: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
    },
    checkoutButton: {
      backgroundColor: myTheme.colors.secondary,
      paddingVertical: 15,
      borderRadius: 30,
      alignItems: "center",
    },
    disablecheckoutButton : {
      backgroundColor: myTheme.colors.secondary,
      paddingVertical: 15,
      borderRadius: 30,
      alignItems: "center",
      pointerEvents: 'none',
      opacity: 0.5,
    },
    
    checkoutButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
    },

    touchableContainerStyle: {
      width: moderateScale(24),
      height: moderateScale(24),
    },
    leftIcon: {
      width: moderateScale(20),
      height: moderateScale(20),
    },
    rightIcon: {
      width: moderateScale(20),
      height: moderateScale(20),
    },
    buttonStyle: {
      backgroundColor: myTheme?.colors?.secondary,
      borderRadius: moderateScale(8),
      alignItems: "center",
      justifyContent: "center",
      includeFontPadding: false,
      position: "absolute",
      bottom: verticalScale(30),
      right: scale(30),
      flexDirection: "row",
      padding: moderateScale(12),
    },
    buttonTextStyle: [
      FONTS_STYLE?.TEXT_BOLD_SMALL,
      { color: myTheme?.colors?.primary },
    ],
    categoryIconStyle: {
      width: moderateScale(15),
      height: moderateScale(15),
      marginRight: moderateScale(5),
      tintColor: myTheme?.colors?.primary,
    },

    itemHeadingStyle: [
      FONTS_STYLE.HEADING_BOLD_MEDIUM,
      {
        width: "30%",
        color: myTheme?.colors?.black,
        includeFontPadding: false,
      },
    ],
    itemTextStyle: [
      FONTS_STYLE.TEXT_MEDIUM,
      {
        width: "70%",
        color: myTheme?.colors?.gray,
        includeFontPadding: false,
        marginLeft: moderateScale(10),
      },
    ],
    itemStyle: {
      marginVertical: verticalScale(2),
      flexDirection: "row",
      alignSelf: "center",
      width: "80%",
    },
    detailViewStyle: {
      marginVertical: verticalScale(5),
    },
    detailHeadingStyle: [
      FONTS_STYLE.HEADING_BOLD_MEDIUM,
      {
        color: myTheme?.colors?.black,
        includeFontPadding: false,
      },
    ],
    detailView: {
      width: "80%",
      alignSelf: "center",
      marginTop: verticalScale(10),
    },
    moreTextStyle: [
      FONTS_STYLE.TEXT_MEDIUM,
      {
        color: myTheme?.colors?.skyBlue,
        includeFontPadding: false,
      },
    ],

    listContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      padding: verticalScale(10),
      marginHorizontal: scale(19),
    },
    circle: {
      width: moderateScale(40),
      height: moderateScale(40),
      borderRadius: scale(25),
      margin: scale(4),
      justifyContent: "center",
      alignItems: "center",
    },
    selectedCircle: {
      borderWidth: scale(3),
      borderColor: myTheme?.colors?.secondary,
    },
    count: [
      {
        color: myTheme?.colors?.primary,
      },
      FONTS_STYLE.TEXT_MEDIUM,
    ],
  });
