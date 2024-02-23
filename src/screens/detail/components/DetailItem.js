import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { style } from "../styles";
const DetailItem = (props) => {
  const myTheme = useTheme();
  const myStyle = style(myTheme);
  return (
    <View style={myStyle.itemStyle}>
      <Text numberOfLines={1} style={myStyle?.itemHeadingStyle}>
        {props.heading} :
      </Text>
      <Text style={myStyle?.itemTextStyle}>{props.text}</Text>
    </View>
  );
};

export default DetailItem;
