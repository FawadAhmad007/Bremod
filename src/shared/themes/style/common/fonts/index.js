import { RFValue as RF } from "react-native-responsive-fontsize";
import { IS_IOS } from "../../../deviceInfo";

export const FONTS_STYLE = {
  TEXT_XXSMALL: {
    fontFamily: "Lato-Light",
    fontSize: IS_IOS ? RF(8) : RF(10),
    fontWeight: IS_IOS ? "400" : "500",
    includeFontPadding: false,
  },
  TEXT_XSMALL: {
    fontFamily: "Lato-Regular",
    fontSize: IS_IOS ? RF(10) : RF(11),
    fontWeight: IS_IOS ? "400" : "500",
    includeFontPadding: false,
  },
  TEXT_BOLD_SMALL: {
    fontFamily: "Lato-Bold",
    fontSize: IS_IOS ? RF(10) : RF(11),
    fontWeight: IS_IOS ? "400" : "500",
    includeFontPadding: false,
  },
  HEADING_BOLD_MEDIUM: {
    fontFamily: "Montserrat-ExtraBold",
    fontSize: IS_IOS ? RF(12) : RF(14),
    fontWeight: IS_IOS ? "400" : "500",
    includeFontPadding: false,
  },
  TEXT_MEDIUM: {
    fontFamily: "Lato-Regular",
    fontSize: IS_IOS ? RF(11) : RF(13),
    fontWeight: IS_IOS ? "400" : "500",
    includeFontPadding: false,
  },
  HEADING_MEDIUM: {
    fontFamily: "Lato-Regular",
    fontSize: RF(14),
    fontWeight: IS_IOS ? "400" : "500",
    includeFontPadding: false,
  },
  TEXT_HEADING: {
    fontFamily: "Montserrat-ExtraBold",
    fontSize: RF(20),
    fontWeight: IS_IOS ? "400" : "500",
    includeFontPadding: false,
  },
};
