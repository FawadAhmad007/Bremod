import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import TextInput from "react-native-text-input-interactive";
import style from "./styles";
import { DEVICE_WIDTH } from "../../themes/deviceInfo/index";

const InputField = ({
  onInputPress,
  pressable,
  headerText,
  secureTextEntry,
  onChangeText,
  onBlur,
  value,
  onFocus,
  placeholder,
  width,
  height,
  vertical,
  keyboardType,
}) => {
  const myTheme = useTheme();
  const myStyle = style(myTheme);

  return (
    <View
      style={[myStyle?.container, { width: width || DEVICE_WIDTH - scale(32) }]}
    >
      <Text style={myStyle?.header}>{headerText}</Text>

      <TouchableOpacity
        activeOpacity={1}
        style={{ height: moderateScale(48) }}
        onPress={onInputPress}
      >
        <TextInput
          pointerEvents={pressable && "none"}
          originalColor={myTheme?.colors?.gray}
          mainColor={myTheme?.colors?.black}
          placeholder={placeholder || headerText}
          value={value}
          style={{ height: moderateScale(48) }}
          secureTextEntry={secureTextEntry}
          onFocus={onFocus}
          onBlur={onBlur}
          keyboardType={keyboardType}
          selectionColor={myTheme?.colors?.skyBlue}
          textInputStyle={[
            myStyle?.textInputStyle,
            {
              textAlignVertical: vertical || "center",
              height: height || verticalScale(40),
              width: width || DEVICE_WIDTH - scale(32),
            },
          ]}
          onChangeText={onChangeText}
        />
      </TouchableOpacity>
    </View>
  );
};

export default InputField;
