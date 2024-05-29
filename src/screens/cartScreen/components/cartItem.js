import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { style } from "../styles";
import { PLACEHOLDER_IMAGE } from "../../../assets";
import { CROSS_ICON } from "../../../assets/icons";

const CartItem = ({ item, removeItem }) => {
  const myTheme = useTheme();
  const myStyle = style(myTheme);

  return (
    <View style={myStyle.cartItem}>
      <Image
        source={item?.image ? { uri: item?.image } : PLACEHOLDER_IMAGE}
        style={myStyle.productImage}
      />
      <View style={myStyle.productDetails}>
        <Text style={myStyle.productName}>{item.name}</Text>
        <Text style={myStyle.productColor}>
          <Text style={myStyle.productColorSpan}>Color : </Text>
          {item?.selectedColor ? item?.selectedColor : " "}
        </Text>
        <View style={myStyle.counterRow}>
          <Text style={myStyle.counterText}>
            <Text style={myStyle.productColorSpan}>Quantity : </Text>{" "}
            {item?.quantity}
          </Text>
        </View>
      </View>
      <View style={myStyle.productDescriptionDetails}>
        <TouchableOpacity hitSlop={15} onPress={() => removeItem(item)}>
          <Image source={CROSS_ICON} style={myStyle.crossImage} />
        </TouchableOpacity>
        <Text style={myStyle.productPrice}>
          {item.price} <Text style={myStyle?.itemTextStyle}>per item</Text>
        </Text>
      </View>
    </View>
  );
};

export default CartItem;
