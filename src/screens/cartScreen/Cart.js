/** @format */

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
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
import { verticalScale } from "react-native-size-matters";
import { isDiscountValid } from "../../shared/utils/index"; // Import the utility function
import { getListForDiscount } from "../../shared/services/FetchIntercepter/request";
import DiscountBar from "../home/components/discountBar";
import Toast from "react-native-toast-message";

export default function Cart() {
  const myTheme = useTheme();
  const myStyle = style(myTheme);
  const dispatch = useDispatch();
  const [showBar, setShowBar] = useState(false);
  const [discountDetails, setDiscountDetails] = useState({
    message: "",
    date: "",
    value: null,
  });
  const [loading, setLoading] = useState(true); // Loading state
  const cart = useSelector((state) => state?.root?.bremod?.card);

  const renderItem = ({ item, index }) => {
    return <CartItem item={item} index={index} removeItem={handleRemoveItem} />;
  };

  useEffect(() => {
    getDiscount();
  }, []);

  const getDiscount = async () => {
    try {
      const res = await getListForDiscount();
      if (res?.status === 200) {
        console.log("dis res", res);
        const discount = res?.data[0]?.end_at;
        const showDiscountBar = isDiscountValid(discount);
        setDiscountDetails({
          message: res?.data[0]?.message,
          date: res?.data[0]?.end_at,
          value: res?.data[0]?.discount_percentage || 0,
        });
        setShowBar(showDiscountBar);
      } else if (res?.message == "Network Error") {
        Toast.show({
          type: "error",
          text1: "Network Error",
          visibilityTime: 2000,
        });
      } else {
        Toast.show({
          type: "error",
          text1: res?.error,
          visibilityTime: 2000,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error,
        text2: error.message,
      });
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const handleRemoveItem = (item, index) => {
    dispatch(REMOVE_ITEM_FROM_CART(index));
  };

  const handleModal = () => {
    navigate(CUSTOMER_ENUM, { totalPrice: totalPrice });
  };

  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const calculateDiscountedPrice = (totalPrice, discount) => {
    return totalPrice - (totalPrice * discount) / 100;
  };

  const discountedPrice = useMemo(() => {
    return calculateDiscountedPrice(totalPrice, discountDetails?.value);
  }, [totalPrice, discountDetails]);

  if (loading) {
    return (
      <View style={myStyle.loaderContainer}>
        <ActivityIndicator size="large" color="#19B95C" />
      </View>
    );
  }

  return (
    <MyView style={{ flex: 1 }}>
      {showBar && <DiscountBar message={discountDetails?.message} />}

      <View
        style={[
          myStyle?.container,
          {
            backgroundColor: myTheme?.colors?.primary,
          },
        ]}
      >
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
      <View
        style={[
          myStyle?.container,
          {
            marginBottom: verticalScale(250),
          },
        ]}
      >
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
        <Text style={myStyle.totalPriceLabel}>
          Total Price: {totalPrice.toFixed(2)}
        </Text>
        <Text style={myStyle.totalPriceLabel}>
          Discount Applied: {discountDetails?.value}%
        </Text>
        <Text style={myStyle.totalPriceLabel}>
          Discounted Price: {discountedPrice.toFixed(2)}
        </Text>
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
