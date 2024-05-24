import { StyleSheet } from "react-native";
import { FONTS_STYLE } from "../../themes/style/common/fonts/index";
import { moderateScale } from "react-native-size-matters";

const style = (myTheme) =>
  StyleSheet.create({
    container: {
      padding: moderateScale(20),
      backgroundColor: myTheme?.colors?.primary,
      width: '95%',
      borderRadius: moderateScale(5),
      display: 'flex',
      gap: moderateScale(10),
      alignSelf: 'center',
      position: 'relative',
    },
    heading: [
      {
        color: myTheme?.colors?.black,
        marginBottom: 10,
        textAlign: "center",
      },
      FONTS_STYLE?.TEXT_HEADING,
    ],
    description: [
      {
        color: myTheme?.colors?.lightGray,
        marginBottom: 10,
        textAlign: "center",
      },
      FONTS_STYLE?.TEXT_BOLD_SMALL,
    ],

    buttonContainer: {
      alignSelf: "center",
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-around",
      marginTop: 10,
    },
    checkoutButton: {
      backgroundColor: myTheme.colors.secondary,
      paddingVertical: 15,
      borderRadius: 30,
      alignItems: "center",
    },
    checkoutButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
    },
    crossImage: {
      position: 'absolute',
      marginBottom: moderateScale(15),
      right: 0,
      width: 20,
      height: 20,
      tintColor: myTheme.colors.black
    },
    footer: {
      // position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "#fff",
      padding: 20,
    },
  });

export default style;
