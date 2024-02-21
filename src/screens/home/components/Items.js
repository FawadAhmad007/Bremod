import { Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { style } from "../styles";
import { useTheme } from "@react-navigation/native";
import { PLACEHOLDER_IMAGE } from "../../../assets";

const Items = (props) => {
  const myTheme = useTheme();
  const myStyle = style(myTheme);
  return (
    <TouchableOpacity style={myStyle?.itemStyle} onPress={props.onPress}>
      <Image
        style={myStyle?.itemImageStyle}
        source={PLACEHOLDER_IMAGE}
        resizeMode="cover"
      />
      <Text numberOfLines={1} style={myStyle?.itemHeadingStyle}>
        {props.name}
      </Text>
      <Text numberOfLines={3} style={myStyle?.itemTextStyle}>
        {props.category}
      </Text>
    </TouchableOpacity>
  );
};

export default Items;
