import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { useTheme } from "@react-navigation/native";
import { InputField } from "../index";
import Modal from "react-native-modal";
import { CROSS_ICON } from "../../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { ADD_USERDATA, ADD_PDFID } from "../../../shared/redux/reducers/index";
import {
  submitUserData,
  generatePdfFile,
} from "../../../shared/services/FetchIntercepter/request";
import style from "./styles";

const CommonModal = ({ isVisible, heading, handleClose }) => {
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

  useEffect(() => {
    if (userData) {
      setName(userData?.customer_name);
      setEmail(userData?.customer_email);
      setAddress(userData?.customer_address);
      setPhone(userData?.customer_number);
    }
  }, [userData]);

  const handleAddToForm = () => {
    const transformedProduct = cart.map((product) => ({
      product_id: product.id,
      product_quantitiy: product.quantity,
      product_color: product.selectedColor,
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
    handleClose();
  };

  const submitUser = async (responseData) => {
    try {
      const res = await submitUserData(responseData);
      dispatch(ADD_PDFID(res?.data?.order_id));
      generatePdf();
    } catch (error) {
      console.error("Error fetching data:", error);
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
      const res = await generatePdfFile(payload);
       openWhatsApp(res?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openWhatsApp = (data) => {
    const phoneNumber = "923044957426";
    // const message = "Hello%20World";
    const pdf = data;
    const url = `whatsapp://send?phone=${phoneNumber}&text=${pdf}`;
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
    <Modal isVisible={isVisible} onBackdropPress={handleClose}>
      <View style={myStyle?.container}>
        <TouchableOpacity hitSlop={15} onPress={handleClose}>
          <Image source={CROSS_ICON} style={myStyle.crossImage} />
        </TouchableOpacity>
        <Text style={myStyle?.heading}>{heading}</Text>
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

        <InputField
          headerText={"Email*"}
          value={email}
          placeholder={"Email"}
          keyboardType="email-address"
          width={"100%"}
          onChangeText={(e) => {
            setEmail(e);
          }}
        />

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
        <View style={myStyle.footer}>
          <TouchableOpacity
            style={myStyle.checkoutButton}
            disabled={!email || !name || !phone || !address}
            onPress={() => handleAddToForm()}
          >
            <Text style={myStyle.checkoutButtonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CommonModal;
