import React from "react";
import { View, Text } from "react-native";
import { style } from "./styles";
import { useTheme } from "@react-navigation/native";
import ScrollingText from "./scrollingText"; // Import the ScrollingText component

const DiscountBar = ({ message }) => {
  const myTheme = useTheme();
  const myStyle = style(myTheme);

  return (
    <View style={myStyle.discountBarContainer}>
      <Text >
        <ScrollingText style={myStyle?.message} message={message} />{" "}
      </Text>
    </View>
  );
};

export default DiscountBar;
