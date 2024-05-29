/** @format */

import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";
import { MyView } from "../../shared/themes/style/common";
import { useTheme } from "@react-navigation/native";
import { style } from "./styles";
import { CART } from "../../shared/constants";
import { goBack } from "../../shared/services";
import CartItem from "./components/cartItem";
import { BACK_ICON } from "../../assets";
import { CommonModal } from "../../shared/components/index";
import { REMOVE_ITEM_FROM_CART } from "../../shared/redux/reducers/index";
import { useSelector, useDispatch } from "react-redux";

export default function Cart() {
  const myTheme = useTheme();
  const myStyle = style(myTheme);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const cart = useSelector((state) => state?.root?.bremod?.card);
  const userData = useSelector((state) => state?.root?.bremod?.userData);

  const renderItem = ({ item }) => {
    return <CartItem item={item} removeItem={handleRemoveItem} />;
  };

  const handleRemoveItem = (item) => {
    dispatch(REMOVE_ITEM_FROM_CART(item?.id));
  };

  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <MyView>
      <CommonModal
        isVisible={modal}
        heading={"Customer Detail"}
        handleClose={() => {
          handleModal();
        }}
      />
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
        />
      </View>
      <View style={myStyle.footer}>
        {/* <Text style={myStyle.totalPriceLabel}>Total Price: ${245}</Text> */}
        <TouchableOpacity
          style={myStyle.checkoutButton}
          onPress={() => {
            // !userData || Object.keys(userData).length === 0
            handleModal();
            // : openWhatsApp();
          }}
        >
          <Text style={myStyle.checkoutButtonText}>CHECKOUT</Text>
        </TouchableOpacity>
      </View>
    </MyView>
  );
}
