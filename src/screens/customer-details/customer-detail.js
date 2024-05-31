/** @format */

import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import React, { useState, useEffect } from "react";
import { MyView } from "../../shared/themes/style/common";
import { useTheme } from "@react-navigation/native";
import { style } from "./styles";
import { InputField } from "../../shared/components/index";
import { goBack } from "../../shared/services";
import { BACK_ICON } from "../../assets";
import { CUSTOMER_DETAIL } from "../../shared/constants";
import { ADD_USERDATA, ADD_PDFID } from "../../shared/redux/reducers/index";
import Toast from "react-native-toast-message";
import {
  submitUserData,
  generatePdfFile,
} from "../../shared/services/FetchIntercepter/request";

import { useSelector, useDispatch } from "react-redux";

export default function CustomerDetails() {
  const myTheme = useTheme();
  const myStyle = style(myTheme);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.root?.bremod?.userData);
  const pdfId = useSelector((state) => state?.root?.bremod?.pdfId);
  const [name, setName] = useState(userData?.customer_name || "");
  const [email, setEmail] = useState(userData?.customer_email || "");
  const cart = useSelector((state) => state?.root?.bremod?.card);
  const [address, setAddress] = useState(userData?.customer_address || "");
  const [phone, setPhone] = useState(userData?.customer_number || "");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showEmailError, setShowEmailError] = useState(false); // New state for showing email error

  useEffect(() => {
    if (userData) {
      setName(userData?.customer_name);
      setEmail(userData?.customer_email);
      setAddress(userData?.customer_address);
      setPhone(userData?.customer_number);
    }
  }, [userData]);

  useEffect(() => {
    if (pdfId) {
      generatePdf();
    }
  }, [pdfId]);

  const handleAddToForm = () => {
    if (!validateEmail(email)) {
      setIsEmailValid(false);
      setShowEmailError(true); // Show error message when email is invalid
      return;
    }

    setShowEmailError(false); // Hide error message if email is valid

    const transformedProduct = cart.map((product) => ({
      product_id: product.id,
      product_quantitiy: product.quantity,
      product_color: product.selectedColor ? product.selectedColor : "No color",
    }));

    let responseData = {
      customer_name: name,
      customer_number: phone,
      customer_email: email,
      customer_address: address,
      order_price: 0,
      status: "Pending",
      products: transformedProduct,
    };
    submitUser(responseData);
    dispatch(ADD_USERDATA(responseData));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitUser = async (responseData) => {
    try {
      const res = await submitUserData(responseData);
      if (res?.status === 200) {
        dispatch(ADD_PDFID(res?.data?.order_id));
        generatePdf();
      } else {
        Toast.show({
          type: "error",
          text1: res?.message,
          visibilityTime: 2000,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error Fetching Data:",
        text2: error,
        visibilityTime: 2000,
      });
    }
  };

  const generatePdf = async () => {
    let payload = {
      id: pdfId,
      customer_name: name,
      customer_number: phone,
      customer_email: email,
      customer_address: address,
    };
    try {
      console.log("payload in pdf", payload);
      const res = await generatePdfFile(payload);
      console.log("responsesss in thr pdf req", res);

      // Convert the binary data to base64
      if (res?.status === 200) {
        console.log("responsesss", res?.data?.fileUrl);

        openWhatsApp(res?.data?.fileUrl);
      } else {
        Toast.show({
          type: "error",
          text1: res?.message,
          visibilityTime: 2000,
        });
      }
    } catch (error) {
      console.log("error", JSON.stringify(error));
      Toast.show({
        type: "error",
        text1: "Error Fetching Data:",
        text2: error,
        visibilityTime: 2000,
      });
    }
  };

  const openWhatsApp = (data) => {
    const phoneNumber = "923044957426";
    const url = `whatsapp://send?phone=${phoneNumber}&text=${data}`;
    Linking.canOpenURL(url)
      .then((canOpen) => {
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
      <View style={myStyle?.headerContainer}>
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
          {CUSTOMER_DETAIL}
        </Text>
      </View>
      <View style={myStyle.contentContainer}>
        <View style={myStyle.inputFieldContainer}>
          <InputField
            headerText={"Name*"}
            value={name}
            placeholder={"Name"}
            width={"100%"}
            keyboardType="default"
            onChangeText={(e) => {
              setName(e);
            }}
          />
        </View>

        <View style={myStyle.inputFieldContainer}>
          <InputField
            headerText={"Phone Number*"}
            value={phone}
            placeholder={"Phone Number"}
            keyboardType="phone-pad"
            width={"100%"}
            onChangeText={(e) => {
              setPhone(e);
            }}
          />
        </View>

        <View style={myStyle.inputFieldContainer}>
          <InputField
            headerText={"Email*"}
            value={email}
            placeholder={"Email"}
            keyboardType="email-address"
            width={"100%"}
            onChangeText={(e) => {
              setEmail(e);
              setIsEmailValid(validateEmail(e));
            }}
          />

          {showEmailError && (
            <Text style={myStyle.errorText}>
              Invalid email address. Please enter a valid email.
            </Text>
          )}
        </View>

        <View style={myStyle.inputFieldContainer}>
          <InputField
            headerText={"Address*"}
            value={address}
            placeholder={"Address"}
            width={"100%"}
            keyboardType="default"
            onChangeText={(e) => {
              setAddress(e);
            }}
          />
        </View>
        <View style={myStyle.footer}>
          <TouchableOpacity
            style={[
              myStyle.checkoutButton,
              (!name || !phone || !address || !isEmailValid) &&
                myStyle.disabledButton,
            ]}
            disabled={!name || !phone || !address}
            onPress={handleAddToForm}
          >
            <Text style={myStyle.checkoutButtonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </MyView>
  );
}
