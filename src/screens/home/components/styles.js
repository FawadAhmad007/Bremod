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
  });
