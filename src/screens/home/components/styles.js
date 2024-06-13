/** @format */

import { StyleSheet } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import { DEVICE_WIDTH } from "../../../shared/themes/deviceInfo/index";

export const style = (myTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      width: DEVICE_WIDTH,
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: "90%",
      marginVertical: scale(10),
      alignSelf: "center",
      tintColor: myTheme?.color?.gray,
      height: moderateScale(220),
      borderRadius: moderateScale(12),
      objectFit: "contain",
    },
    discountBarContainer: {
      backgroundColor: myTheme?.color?.secondary,
      alignItems: "center", // Center items vertically
      justifyContent: "center", // Center items horizontally
      height: moderateScale(30),
      paddingTop: moderateScale(10),
    },
    message: {
      color: myTheme?.colors?.black,
      fontWeight: "bold",
    },

    scrollViewContent: {
      flexGrow: 1,
    },

    scrollContainer: {
      // overflow: "hidden"
    },
    text: {
      fontSize: 16, // whiteSpace: "nowrap",
      color: myTheme?.colors?.black,
    },
  });
