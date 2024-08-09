
/** @format */

import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  ScrollView,
  ToastAndroid,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MyView } from "../../shared/themes/style/common";
import { StackActions, useTheme } from "@react-navigation/native";
import { style } from "./styles";
import { InputField } from "../../shared/components/index";
import { goBack } from "../../shared/services";
import { BACK_ICON } from "../../assets";
import { CUSTOMER_DETAIL } from "../../shared/constants";
import {
  ADD_USERDATA,
  ADD_PDFID,
  REMOVE_CARD,
} from "../../shared/redux/reducers/index";
import {
  submitUserData,
  generatePdfFile,
  getListForCities,
} from "../../shared/services/FetchIntercepter/request";
import { Dropdown } from 'react-native-element-dropdown';
import { getListForDiscount } from "../../shared/services/FetchIntercepter/request";
import { isDiscountValid } from "../../shared/utils/index";
import { useSelector, useDispatch } from "react-redux";
import DiscountBar from "../home/components/discountBar";
import { DOWN_ICON, WHATSAPP_ICON } from "../../assets/icons/index";
import { moderateScale } from "react-native-size-matters";

export default function CustomerDetails({ navigation, route }) {
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
  const [loading, setLoading] = useState(false);
  const [allowGeneratePdf, setAllowGeneratePdf] = useState(false);
  const [selectedCity, setSelectedCity] = useState([]);
  const [discountDetails, setDiscountDetails] = useState({
    message: "",
    date: "",
    value: null,
  });

  
  const [citiesOfPakistan, setCitiesOfPakistan] = useState([]);
  const [showBar, setShowBar] = useState(false);
  const [errors, setErrors] = useState({});
  const { totalPrice, discountedPrice } = route.params;
  useEffect(() => {
    getDiscount();
  }, []);

  useEffect(() => {
    if (userData) {
      setName(userData?.customer_name);
      setEmail(userData?.customer_email);
      setAddress(userData?.customer_address);
      setPhone(userData?.customer_number);
      setSelectedCity(userData?.city_name);
      setValue(userData?.city_value)
    }
  }, [userData]);

  useEffect(() => {
    if (pdfId && allowGeneratePdf) {
      generatePdf();
    }
  }, [pdfId, allowGeneratePdf]);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const res = await getListForCities();
      if (res?.status === 200) {
        setCitiesOfPakistan(res?.data?.data.map(city => ({
          label: city?.name,
          value: city?.id
        })));
      } else if (res?.message == "Network Error") {
        setLoading(false);
        ToastAndroid.show("Network Error", ToastAndroid.SHORT);

      } else {
        ToastAndroid.show(res?.error, ToastAndroid.SHORT);

      }
    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);

    } finally {
      setLoading(false);
    }
  };

  const getDiscount = async () => {
    try {
      setLoading(true);
      const res = await getListForDiscount();
      if (res?.status === 200) {
        const discount = res?.data[0]?.end_at;
        const showDiscountBar = isDiscountValid(discount);
        setDiscountDetails({
          message: res?.data[0]?.message,
          date: res?.data[0]?.end_at,
          value: res?.data[0]?.discount_percentage || 0,
        });
        setShowBar(showDiscountBar);
      } else if (res?.message == "Network Error") {
        ToastAndroid.show("Network Error", ToastAndroid.SHORT);

      } else {
        // Toast.show({
        //  type: 'error',
        //  text1: res?.error,
        //  visibilityTime: 2000,
        // });
      }

    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);

    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const validateForm = ({ name, email, address, phone }) => {
    const errors = {};
    if (!name) {
      errors.name = "Name is required.";
    }
    if (!phone) {
      errors.phone = "Phone number is required.";
    } else if (!validatePhone(phone)) {
      errors.phone = "Invalid phone number.";
    }
    if (!address) {
      errors.address = "Address is required.";
    }
    if (!validateEmail(email)) {
      errors.email = "Invalid email address. Please enter a valid email.";
    }
    if (!selectedCity) {
      errors.city = "City is required.";
    }

    return errors;
  };

  const handleAddToForm = () => {
    const validationErrors = validateForm({ name, email, address, phone });
    
    if (Object.keys(validationErrors)?.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    const transformedProduct = cart.map((product) => ({
      product_id: product?.id,
      product_quantitiy: product?.quantity,
      product_name: product?.name,
      product_price: parseInt(product?.price),
      product_color: product?.selectedColor
        ? product?.selectedColor
        : "No color",
    }));
    let responseData = {
      customer_name: name,
      customer_number: phone,
      customer_address: address,
      order_price: totalPrice ? totalPrice : 0,
      discount_price: discountedPrice ? discountedPrice : 0,
      status: "Completed",
      products: transformedProduct,
      city_name: selectedCity,
    };

    // Conditionally add customer_email if email is not empty
    if (email) {
      responseData.customer_email = email;
    }
    submitUser(responseData);
    dispatch(ADD_USERDATA({...responseData,  city_value:value}));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email ? emailRegex.test(email) : true;
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^03[0-9]{9}$/;
    return phoneRegex.test(phone);
  };

  const submitUser = async (responseData) => {    
    try {
      const res = await submitUserData(responseData);
      console.log('error',JSON.stringify(res, null,4));
      
      if (res?.status === 200) {
        dispatch(ADD_PDFID(res?.data?.order_id));
        setAllowGeneratePdf(true);
        generatePdf();
      } else if (res?.message == "Network Error") {
        setLoading(false);
        ToastAndroid.show("Network Error", ToastAndroid.SHORT);

      } else {
        setLoading(false);
        ToastAndroid.show("Failed to insert order products", ToastAndroid.SHORT);

      }
    } catch (error) {
      setLoading(false);
      ToastAndroid.show("Error Fetching Data:", ToastAndroid.SHORT);
    }
  };

  const generatePdf = async () => {
    setAllowGeneratePdf(false);
    let payload = {
      id: pdfId,
      customer_name: name.trim(),
      customer_number: phone,
      customer_email: email.trim(),
      customer_address: address.trim(),
      city_name: selectedCity,
      order_price: totalPrice ? totalPrice : 0,
      discount_price: discountedPrice ? discountedPrice : 0,
    };
    try {
      const res = pdfId ? await generatePdfFile(payload) : "";
      if (res?.status === 200) {
        setLoading(false);

        // dispatch(REMOVE_CARD());
        console.log('generatePdfFile', JSON.stringify(res?.data,null,4))
        // navigation.dispatch(StackActions.popToTop());
        // openWhatsApp(res?.data);
      } else if (res?.message == "Network Error") {
        setLoading(false);
        ToastAndroid.show("Network Error", ToastAndroid.SHORT);
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false); // Stop loading
    }
  };


  const [value, setValue] = useState(userData?.city_value??null);
  const [isFocus, setIsFocus] = useState(false);
  const openWhatsApp = (orderData) => {
    const { order, products } = orderData;

    // Constructing the message
    let message = `Hi, I am ${order.customer_name}. My order details are:\n\n`;
    message += `Customer Order Id: ${pdfId}\n`;
    message += `Customer Name: ${order.customer_name}\n`;
    message += order.customer_email
      ? `Customer Email: ${order.customer_email}\n`
      : "";
    message += `Customer Phone Number: ${order.customer_number}\n`;
    message += `Customer Address: ${order.customer_address}\n`;
    message += `City: ${order.city_name}\n\n`;

    // Append each product's details
    products.forEach((product, index) => {
      message += `${index + 1}. ${product.name}\n`;
      message +=
        product.product_color != "No color"
          ? `   Color: ${product.product_color}\n`
          : "";
      message += `   Quantity: ${product.product_quantitiy}\n`;
      message += `   Price: ${product.price * product.product_quantitiy}\n\n`; // Note: Corrected to product_quantity
    });

    message += `Bill: ${order.order_price}\n`;
    message += `Delivery Charges: 200 \n`;
    message += `Discount Price: ${order.order_price - order.discount_price}\n`;
    message += `Total Bill: ${order.discount_price + 200}\n\n`;

    message += `Thank you!`;
    dispatch(ADD_PDFID(""));
    const phoneNumber = "923000777736";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

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
    <KeyboardAvoidingView keyboardShouldPersistTaps="handled">
      {showBar && <DiscountBar message={discountDetails?.message} />}
      <ScrollView keyboardShouldPersistTaps="handled">
        <View>
          <View
            style={[
              myStyle?.headerContainer,

              {
                marginTop: !showBar ? moderateScale(10) : moderateScale(2),
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              style={myStyle?.touchableContainerStyle}
              onPress={() => goBack()}
            >
              <Image
                style={myStyle.leftIcon}
                source={BACK_ICON}
                resizeMode="contain"
                alt="Back icon"
              />
            </TouchableOpacity>
            <Text numberOfLines={1} style={myStyle?.headingTextStyle}>
              {CUSTOMER_DETAIL}
            </Text>
            <View style={{ width: 48, height: 48 }} />
          </View>
          <View style={myStyle.contentContainer}>
            <View style={myStyle.inputFieldContainer}>
              <InputField
                headerText={"Name*"}
                value={name}
                placeholder={"Enter Name"}
                height={moderateScale(48)}
                width={"100%"}
                keyboardType="default"
                onChangeText={(e) => {
                  setName(e);
                }}
              />
              {errors.name && (
                <Text style={myStyle.errorText}>{errors.name}</Text>
              )}
            </View>

            <View style={myStyle.inputFieldContainer}>
              <InputField
                headerText={"Phone Number*"}
                value={phone}
                placeholder={"Enter Phone Number"}
                keyboardType="phone-pad"
                height={moderateScale(48)}
                width={"100%"}
                onChangeText={(e) => {
                  setPhone(e);
                }}
              />
              {errors.phone && (
                <Text style={myStyle.errorText}>{errors.phone}</Text>
              )}
            </View>

            <View style={myStyle.inputFieldContainer}>
              <InputField
                headerText={"Email"}
                value={email}
                placeholder={"Enter Email"}

                keyboardType="email-address"
                width={"100%"}
                height={moderateScale(48)}
                onChangeText={(e) => {
                  setEmail(e);
                  setIsEmailValid(validateEmail(e));
                }}
              />

              {errors.email && (
                <Text style={myStyle.errorText}>{errors.email}</Text>
              )}
            </View>

            <View style={myStyle.inputFieldContainer}>

              <Text style={myStyle.header}>Select city*</Text>
              <Dropdown
                style={[myStyle.dropdown, isFocus && { borderColor: 'black' }]}
                placeholderStyle={myStyle.placeholderStyle}
                selectedTextStyle={myStyle.selectedTextStyle}
                inputSearchStyle={myStyle.inputSearchStyle}
                itemTextStyle={myStyle.dropdownItemTxtStyle}
                iconStyle={myStyle.iconStyle}
                data={citiesOfPakistan}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={'Select city'}
                searchPlaceholder="Search..."
                value={ value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);                  
                  setSelectedCity(item?.label);
                  setIsFocus(false);
                }} />
              {errors.city && (
                <Text style={myStyle.errorText}>{errors.city}</Text>
              )}
            </View>

            <View style={myStyle.inputFieldContainer}>
              <InputField
                headerText={"Address*"}
                value={address}
                placeholder={"Enter Address"}
                width={"100%"}
                keyboardType="default"
                height={moderateScale(48)}
                onChangeText={(e) => {
                  setAddress(e);
                }}
              />
              {errors.address && (
                <Text style={myStyle.errorText}>{errors.address}</Text>
              )}
            </View>

            <View style={myStyle.footer}>
              <Text style={myStyle.noteText}>
                Note: Delivery charges will apply to your order. The standard
                delivery charge is 200, but it may vary depending on your
                location.
              </Text>

              <TouchableOpacity
                style={[
                  myStyle.checkoutButton,
                  (!name || !phone || !address || !selectedCity || loading) &&
                  myStyle.disablecheckoutButton,
                ]}
                disabled={
                  !name || !phone || !address || !selectedCity || loading
                }
                onPress={handleAddToForm}
              >
                {loading ? (
                  <ActivityIndicator
                    size="small"
                    color={myTheme?.colors?.textColor}
                  />
                ) : (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      style={[
                        myStyle.leftIcon,

                        {
                          marginTop: moderateScale(2),
                          tintColor: myTheme.colors.textColor,
                          marginRight: moderateScale(7),
                        },
                      ]}
                      source={WHATSAPP_ICON}
                      resizeMode="contain"
                      alt="Whatsapp icon"
                    />
                    <Text style={myStyle.checkoutButtonText}>Place Order</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
