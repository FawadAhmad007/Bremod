import React, { useRef, useEffect } from "react";
import { Animated, Text, View, StyleSheet, Dimensions } from "react-native";
import { style } from "./styles";
const { width: DEVICE_WIDTH } = Dimensions.get("window");
import { useTheme } from "@react-navigation/native";

const ScrollingText = ({ message }) => {
  const myTheme = useTheme();
  const myStyle = style(myTheme);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const baseDurationPerCharacter = 300; // base duration per character in milliseconds
    const totalDuration = message.length * baseDurationPerCharacter;

    const startAnimation = () => {
      animatedValue.setValue(0);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: totalDuration,
        useNativeDriver: true,
      }).start(() => startAnimation());
    };

    startAnimation();
  }, [animatedValue, message.length]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [DEVICE_WIDTH, -(message.length * 8)], // Adjust for horizontal centering
  });

  return (
    <View style={myStyle.scrollContainer}>
      <Animated.Text style={{ transform: [{ translateX }] }}>
        <Text style={myStyle.text}>{message}</Text>
      </Animated.Text>
    </View>
  );
};

export default ScrollingText;
