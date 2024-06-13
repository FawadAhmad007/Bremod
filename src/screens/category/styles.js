/** @format */

import { StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { FONTS_STYLE, DEVICE_WIDTH } from "../../shared/themes/style/common";
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
      width: "90%",
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
    listText: [
      FONTS_STYLE.TEXT_MEDIUM,
      {
        alignSelf: "left",
        color: myTheme?.colors?.gray,
        textAlign: "left",
        includeFontPadding: false,
      },
    ],

    list: {
      width: "90%",
      alignSelf: "center",
      paddingVertical: moderateScale(15),
    },
    loaderContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
    },
    lineStyle: {
      marginHorizontal: scale(16),
      borderTopWidth: moderateScale(0.5),
      borderTopColor: myTheme?.colors?.gray,
    },
  });
