/** @format */

import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { style } from "../styles";
import { PLACEHOLDER_IMAGE } from "../../../assets";
import {
  CROSS_ICON,
  MINUS_ICON,
  PLUS_ICON,
} from "../../../assets/icons";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_CARD } from "../../../shared/redux/reducers/index";
const CartItem = ({ item, removeItem, index }) => {
  const myTheme = useTheme();
  const myStyle = style(myTheme);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state?.root?.bremod?.card);

  const incrementCount = () => {
    const updatedData = cart.map((cartItem) => {
      if (cartItem.id === item?.id) {
        return {
          ...cartItem,
          quantity: cartItem?.quantity + 1,
        };
      }
      return cartItem;
    });

    dispatch(UPDATE_CARD(updatedData));
  };
  const decrementCount = () => {
    const updatedData = cart.map((cartItem) => {
      if (cartItem.id === item?.id) {
        return {
          ...cartItem,
          quantity: cartItem?.quantity - 1,
        };
      }
      return cartItem;
    });

    dispatch(UPDATE_CARD(updatedData));
  };
  return (
    <View style={myStyle.cartItem}>
      <View style={myStyle.imageContainer}>
        <View style={myStyle?.imageSubContainer}>
          <Image
            source={item?.image ? { uri: item?.image } : PLACEHOLDER_IMAGE}
            style={myStyle.productImage}
            alt={item?.name}
          />
          <View style={myStyle.productDetails}>
            <Text style={myStyle.productName}>{item?.name}</Text>
            {item?.selectedColor && (
              <Text style={myStyle.productColor}>
                <Text style={myStyle.productColorSpan}>Color: </Text>
                {item?.selectedColor ? item?.selectedColor : " "}
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          hitSlop={10}
          style={{
            width: 48,
            height: 48,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => removeItem(item, index)}
        >
          <Image source={CROSS_ICON} style={myStyle.crossImage} alt="Cancel icon"/>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <View style={myStyle.counterRow}>
          <Text style={myStyle.counterText}>
            <Text style={myStyle.productColorSpan}>Quantity: </Text>
          </Text>
          <View style={myStyle.counterRow}>
            <TouchableOpacity
              onPress={decrementCount}
              disabled={ item?.quantity === 1}
              style={[
                myStyle.counterButton,

              ]}
            >
              <View style={myStyle?.counterButtonText}>
              <Image
                source={MINUS_ICON}
                alt={item?.name + 'decrement'}
                  style={myStyle?.counterButtonImage}
                  resizeMode='contain' 
                  />
              </View>
            </TouchableOpacity>
            <Text style={myStyle.counterText}>{item?.quantity}</Text>
            <TouchableOpacity
              onPress={incrementCount}
              style={myStyle.counterButton}
            >
              <View style={myStyle?.counterButtonText}>
                <Image
                  source={PLUS_ICON}
                  alt={item?.name + 'increment'}
                  style={myStyle?.counterButtonImage}
                  resizeMode='contain'/>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={myStyle.productPrice}>
          {item?.price != null ? (
            <>
              {item?.price * item?.quantity +'.00 Rs'}
            </>
          ) : (
            ""
          )}
        </Text>
      </View>
    </View>
  );
};

export default CartItem;
