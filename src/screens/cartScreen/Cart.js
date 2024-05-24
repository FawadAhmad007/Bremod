/** @format */

import { View, Text, Image, TouchableOpacity, FlatList,Linking } from "react-native";
import React, { useState } from "react";
import { MyView } from "../../shared/themes/style/common";
import { useTheme } from "@react-navigation/native";
import { style } from "./styles";
import { CART } from "../../shared/constants";
import { goBack } from "../../shared/services";
import CartItem from "./components/cartItem";
import { BACK_ICON } from "../../assets";
import { CommonModal } from "../../shared/components/index";
import { useSelector } from "react-redux";

export default function Cart() {
  const myTheme = useTheme();
  const myStyle = style(myTheme);
  const [modal, setModal] = useState(false);
  const cart = useSelector((state) => state?.root?.bremod?.card);
  const userData = useSelector((state) => state?.root?.bremod?.userData);

  const renderItem = ({ item }) => {
    return <CartItem item={item} />;
  };

  const handleModal = () => {
    setModal(!modal);
  };

  const openWhatsApp = () => {
    const phoneNumber = "1234567890";
    const message = "Hello%20World";
    const url = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
    console.log("here");
    Linking.canOpenURL(url)
      .then((canOpen) => {
        console.log(canOpen);
        if (canOpen) {
          return Linking.openURL(url);
        } else {
          // WhatsApp is not installed, redirect to the app store
          const storeUrl = Platform.select({
            ios: "https://apps.apple.com/app/whatsapp/id310633997",
            android:
              "https://play.google.com/store/apps/details?id=com.whatsapp",
          });

          return Linking.openURL(storeUrl);
        }
      })
      .catch((e) => {
        console.log("Error opening WhatsApp", e);
      });
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
        <Text style={myStyle.totalPriceLabel}>Total Price: ${245}</Text>
        <TouchableOpacity
          style={myStyle.checkoutButton}
          onPress={() => {
            !userData || Object.keys(userData).length === 0
              ? handleModal()
              : openWhatsApp();
          }}
        >
          <Text style={myStyle.checkoutButtonText}>CHECKOUT</Text>
        </TouchableOpacity>
      </View>
    </MyView>
  );
}
