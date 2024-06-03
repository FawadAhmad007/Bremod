/** @format */

import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { MyView } from "../../shared/themes/style/common";
import { useTheme } from "@react-navigation/native";
import { style } from "./styles";
import { CART } from "../../shared/constants";
import { goBack, navigate } from "../../shared/services";
import CartItem from "./components/cartItem";
import { BACK_ICON } from "../../assets";
import { CUSTOMER_ENUM } from "../../shared/constants";
import { REMOVE_ITEM_FROM_CART } from "../../shared/redux/reducers/index";
import { useSelector, useDispatch } from "react-redux";

export default function Cart() {
  const myTheme = useTheme();
  const myStyle = style(myTheme);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state?.root?.bremod?.card);

  const renderItem = ({ item, index }) => {
    return <CartItem item={item} index={index} removeItem={handleRemoveItem} />;
  };

  const handleRemoveItem = (item, index) => {
    dispatch(REMOVE_ITEM_FROM_CART(index));
  };

  const handleModal = () => {
    navigate(CUSTOMER_ENUM);
  };

  return (
    <MyView>
      <View style={myStyle?.container}>
        <TouchableOpacity
          style={myStyle?.touchableContainerStyle}
          hitSlop={20}
          activeOpacity={0.6}
          onPress={() => goBack()}
        >
          <Image
            style={myStyle.leftIcon}
            source={BACK_ICON}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text numberOfLines={1} style={myStyle?.headingTextStyle}>
          {CART}
        </Text>
        <View style={myStyle?.rightIcon} />
      </View>
      <View style={myStyle?.container}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={cart}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={{ justifyContent: "center", alignSelf: "center" }}>
              No Products Available
            </Text>
          )}
        />
      </View>
      <View style={myStyle.footer}>
        {/* <Text style={myStyle.totalPriceLabel}>Total Price: ${245}</Text> */}
        <TouchableOpacity
          style={myStyle.checkoutButton}
          onPress={() => {
            handleModal();
          }}
        >
          <Text style={myStyle.checkoutButtonText}>CHECKOUT</Text>
        </TouchableOpacity>
      </View>
    </MyView>
  );
}
