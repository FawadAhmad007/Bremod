/** @format */

import { StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { FONTS_STYLE } from "../../shared/themes/style/common";
import { IS_IOS } from "../../shared/themes/deviceInfo";
export const style = (myTheme) =>
  StyleSheet.create({
    headerStyle: {
      width: "100%",
      marginBottom: verticalScale(20),
    },
    headerInnerStyle: {
      width: "90%",
      alignSelf: "center",
      flexDirection: "row",
      height: moderateScale(40),
      alignItems: "center",
      justifyContent: "space-between",
    },
    inputViewStyle: [
      {
        width: "100%",
        backgroundColor: myTheme?.colors?.lightGray,
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: moderateScale(8),
      },
      IS_IOS && { padding: moderateScale(10) },
    ],
    inputStyle: [
      FONTS_STYLE?.TEXT_XSMALL,
      {
        color: myTheme?.colors?.black,
        width: "85%",
        marginHorizontal: scale(5),
      },
    ],

    searchIconViewStyle: {
      width: "12%",
      height: moderateScale(20),
    },
    searchIconStyle: {
      width: "100%",
      height: moderateScale(20),
      alignSelf: "center",
      tintColor: myTheme?.colors?.secondary,
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
    coverImageStyle: {
      width: "90%",
      marginVertical: scale(10),
      alignSelf: "center",
      tintColor: myTheme?.color?.gray,
      height: moderateScale(180),
      borderRadius: moderateScale(12),
    },
    logoStyle: {
      width: moderateScale(120),
      height: moderateScale(40),
      marginVertical: scale(10),
      marginStart: moderateScale(130),
    },
    cartContainer: {
      marginVertical: scale(15),
      marginEnd: moderateScale(10),
    },
    cartStyle: {
      width: moderateScale(30),
      height: moderateScale(30),
    },
    badge: {
      backgroundColor: myTheme?.colors?.secondary,
      height: moderateScale(15),
      width: moderateScale(15),
      alignSelf: "flex-end",
      position: "absolute",
      alignContent: "center",
      alignItems: "center",
      borderRadius: moderateScale(15),
      // borderColor: myTheme?.colors?.gray,
      // borderWidth: moderateScale(1),
    },
    cartTextStyle: [
      FONTS_STYLE.TEXT_XSMALL,
      {
        color: myTheme?.colors?.primary,
        textAlign: "center",
        includeFontPadding: false,
      },
    ],
    headingTextStyle: [
      FONTS_STYLE.TEXT_HEADING,
      {
        width: "90%",
        alignSelf: "center",
        color: myTheme?.colors?.black,
        marginVertical: verticalScale(10),
        textAlign: "center",
        includeFontPadding: false,
      },
    ],

    itemStyle: {
      width: "33.33%",
      paddingHorizontal: "3%",
      marginVertical: verticalScale(8),
    },

    itemImageStyle: {
      width: "100%",
      alignSelf: "center",
      tintColor: myTheme?.color?.gray,
      height: moderateScale(100),
      borderRadius: moderateScale(8),
    },

    itemHeadingStyle: [
      FONTS_STYLE.TEXT_BOLD_SMALL,
      {
        color: myTheme?.colors?.black,
        includeFontPadding: false,
        marginTop: verticalScale(8),
      },
    ],

    itemTextStyle: [
      FONTS_STYLE.TEXT_XXSMALL,
      {
        color: myTheme?.colors?.gray,
        includeFontPadding: false,
      },
    ],
    flatListStyle: {
      justifyContent: "flex-start",
      width: "100%",
      paddingHorizontal: "2%",
      flex: 1,
    },

    categoryIconStyle: {
      width: moderateScale(15),
      height: moderateScale(15),
      marginRight: moderateScale(5),
      tintColor: myTheme?.colors?.primary,
    },
    loaderContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
    },
  });
