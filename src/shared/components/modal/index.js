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
import Toast from "react-native-toast-message";
import RNFS from "react-native-fs";
import { Buffer } from "buffer";
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
  const [isEmailValid, setIsEmailValid] = useState(true);


  useEffect(() => {
    if (userData) {
      setName(userData?.customer_name);
      setEmail(userData?.customer_email);
      setAddress(userData?.customer_address);
      setPhone(userData?.customer_number);
    }
  }, [userData]);

  const handleAddToForm = () => {
    if (!validateEmail(email)) {
      setIsEmailValid(false);
      Toast.show({
        type: "error",
        text1: "Invalid Email Address",
        visibilityTime: 2000,
      });
      return;
    }

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
      console.log("response of the order submission", res);
      console.log("response of the order data", res?.data);
      console.log("response of the order", res?.status);
      if (res?.status === 200) {
        // Toast.show({
        //   type: "success",
        //   text1: "Order Created Successfully",
        //   visibilityTime: 2000,
        // });
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
    console.log("pdf id", pdfId);
    let payload = {
      id: pdfId,
      customer_name: name,
      customer_number: phone,
      customer_email: email,
      customer_address: address,
    };
    try {
      const res = await generatePdfFile(payload);
      console.log("payload  generated", payload);
      console.log("pdf generated", res?.data);
      console.log("pdf resssssss", res?.status);
      // Convert the binary data to base64
      if (res?.status === 200) {
        // Toast.show({
        //   type: "success",
        //   text1: "Pdf Generated Successfully",
        //   visibilityTime: 2000,
        // });
        handleClose();
      } else {
        Toast.show({
          type: "error",
          text1: res?.message,
          visibilityTime: 2000,
        });
      }

      // console.log("Type of res.data:", typeof res.data);
      // const base64Data = arrayBufferToBase64(res?.data);
      // const base64Data = Buffer.from(res?.data).toString('base64');
      // const path = await savePDFToLocal(base64Data, "sample.pdf");
      // console.log("PDF saved to:", path);
      // openWhatsApp(path);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error Fetching Data:",
        text2: error,
        visibilityTime: 2000,
      });
    }
  };

  // Function to convert array buffer to base64
  const arrayBufferToBase64 = (buffer) => {
    console.log("buffer", buffer);
    let binary = "";
    const bytes = new Uint8Array(buffer);
    console.log("bytes", bytes);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    console.log("binary in pdf", binary);
    return Buffer.from(binary, "binary").toString("base64");
  };

  const savePDFToLocal = async (base64Data, fileName) => {
    const path = `${RNFS.DownloadDirectoryPath}/${fileName}`;
    try {
      await RNFS.writeFile(path, base64Data, "base64");
      return path;
    } catch (error) {
      console.error("Error saving PDF:", error);
      throw error;
    }
  };

  const openWhatsApp = (data) => {
    console.log("dataatatatata in pdfffffffff", data);
    const phoneNumber = "923044957426";
    const message =
      "https://learninginhand.com/blog/google-document-url-tricks";
    const pdf = data;
    console.log("messasge in the open whatsapp", pdf);
    const url = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
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
            setIsEmailValid(validateEmail(e));
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
            disabled={!email || !name || !phone || !address || !isEmailValid}
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
