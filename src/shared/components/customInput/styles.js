import { StyleSheet } from "react-native";
import { scale, moderateScale } from "react-native-size-matters";
import { FONTS_STYLE } from "../../themes/style/common/fonts/index";

const style = (myTheme) =>
  StyleSheet.create({
    container: {
      alignSelf: "center",
      marginBottom: moderateScale(5),
    },
    header: [
      {
        marginBottom: moderateScale(6),
        color: myTheme?.colors?.black,
        textAlign: "left",
      },
      FONTS_STYLE?.TEXT_SMALL,
    ],
    iconContainerStyle: {
      height: "100%",
      marginEnd: -moderateScale(10),
      width: scale(40),
      alignItems: "center",
      justifyContent: "center",
    },
    iconTouch: {
      position: "absolute",
      top: 0,
      bottom: 0,
      width: scale(50),
      alignItems: "center",
      justifyContent: "center",
    },
    iconTouchStyle: { height: 20, width: 20 },
    textInputStyle: [
      {
        textAlign: "left",
        borderRadius: moderateScale(4),
        backgroundColor: "white",
        color: myTheme?.colors?.black,
      },
      FONTS_STYLE?.TEXT_XSMALL,
    ],
  });

export default style;
