import { SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

export function MyView(props) {
  const myTheme = useTheme();
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: myTheme?.colors?.primary }}
    >
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={myTheme?.colors?.primary}
      />
      {props.children}
    </SafeAreaView>
  );
}
