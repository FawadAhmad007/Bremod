import { RFValue as RF } from "react-native-responsive-fontsize";
import { IS_IOS } from "../../../deviceInfo";

export const FONTS_STYLE = {
  TEXT_XXSMALL: {
    fontFamily: "Poppins-Light",
    fontSize: RF(10),
    fontWeight: IS_IOS ? "400" : "500",
    includeFontPadding: false,
  },
  TEXT_XSMALL: {
    fontFamily: "Poppins-Regular",
    fontSize: RF(11),
    fontWeight: IS_IOS ? "400" : "500",
    includeFontPadding: false,
  },
  TEXT_BOLD_SMALL: {
    fontFamily: "Poppins-SemiBold",
    fontSize: RF(11),
    fontWeight: IS_IOS ? "400" : "500",
    includeFontPadding: false,
  },
  HEADING_BOLD_MEDIUM: {
    fontFamily: "Poppins-SemiBold",
    fontSize: RF(14),
    fontWeight: IS_IOS ? "400" : "500",
    includeFontPadding: false,
  },
  TEXT_MEDIUM: {
    fontFamily: "Poppins-Regular",
    fontSize: RF(13),
    fontWeight: IS_IOS ? "400" : "500",
    includeFontPadding: false,
  },
  HEADING_MEDIUM: {
    fontFamily: "Poppins-Regular",
    fontSize: RF(14),
    fontWeight: IS_IOS ? "400" : "500",
    includeFontPadding: false,
  },
  TEXT_HEADING: {
    fontFamily: "Karma-Bold",
    fontSize: RF(20),
    fontWeight: IS_IOS ? "400" : "500",
    includeFontPadding: false,
  },
};
