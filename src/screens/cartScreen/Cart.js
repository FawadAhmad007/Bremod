/** @format */

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  ToastAndroid,
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
import { isDiscountValid } from "../../shared/utils/index"; // Import the utility function
import { getListForDiscount } from "../../shared/services/FetchIntercepter/request";
import DiscountBar from "../home/components/discountBar";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { IS_IOS } from "../../shared/themes/deviceInfo/index";
import { WHATSAPP_ICON } from "../../assets/icons/index";
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
    return (
      <>
        <CartItem item={item} index={index} removeItem={handleRemoveItem} />
        <View
          style={{
            backgroundColor: "gray",
            width: "100%",
            height: 1,
          }}
        />
      </>
    );
  };

  useEffect(() => {
    getDiscount();
  }, []);

  const getDiscount = async () => {
    try {
      const res = await getListForDiscount();
      if (res?.status === 200) {
        const discount = res?.data[0]?.end_at;
        const showDiscountBar = isDiscountValid(discount);
        setDiscountDetails({
          message: res?.data[0]?.message,
          date: res?.data[0]?.end_at,
          value: res?.data[0]?.discount_percentage || 0,
        });
        setLoading(false);
        setShowBar(showDiscountBar);
      } else if (res?.message == "Network Error") {
        setLoading(false);
        ToastAndroid.show("Network Error", ToastAndroid.SHORT);

      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      ToastAndroid.show(error, ToastAndroid.SHORT);

      

    }
  };

  const handleRemoveItem = (item, index) => {
    dispatch(REMOVE_ITEM_FROM_CART(index));
  };

  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);
  const handleModal = () => {
    navigate(CUSTOMER_ENUM, {
      totalPrice: totalPrice,
      discountedPrice: discountedPrice.toFixed(0),
    });
  };
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
    <MyView>
      {showBar && <DiscountBar message={discountDetails?.message} />}
      <View
        style={[
          myStyle?.container,
          {
            marginTop: !showBar ? moderateScale(10) : moderateScale(2),
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
    
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={cart}
          renderItem={renderItem}
          contentContainerStyle={
            cart?.length == 0 && {
              paddingBottom: IS_IOS ? verticalScale(85) : verticalScale(130),
            }
          }
          
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text
              style={{
                justifyContent: "center",
                alignSelf: "center",
                textAlignVertical: "bottom",
                height: "100%",
                color: myTheme?.colors?.black,
              }}
            >
              No Products Available
            </Text>
          )}
        />


      <View style={myStyle.footer}>
        {cart?.length != 0 && (
          <Text style={myStyle.totalPriceLabel}>
            {`Total Price: ${totalPrice.toFixed(0)}`}
          </Text>
        )}
        {cart?.length != 0 && discountDetails?.value != null && (
          <Text style={myStyle.totalPriceLabel}>
            {`Discount Applied: ${discountDetails?.value}%`}
          </Text>
        )}
        {cart?.length != 0 && discountDetails?.value != null && (
          <Text style={myStyle.totalPriceLabel}>
            {`Discounted Price: ${discountedPrice.toFixed(0)}`}
          </Text>
        )}
        {cart?.length != 0 && (
          <TouchableOpacity
            style={myStyle.checkoutButton}
            onPress={() => {
              handleModal();
            }}
          >
            <Text style={myStyle.checkoutButtonText}>CHECKOUT</Text>
          </TouchableOpacity>
        )}
      </View>
    </MyView>
  );
}
