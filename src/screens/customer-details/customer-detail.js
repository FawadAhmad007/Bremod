/** @format */

import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MyView } from "../../shared/themes/style/common";
import { useTheme } from "@react-navigation/native";
import { style } from "./styles";
import { InputField } from "../../shared/components/index";
import { goBack } from "../../shared/services";
import { BACK_ICON } from "../../assets";
import { CUSTOMER_DETAIL } from "../../shared/constants";
import {
  ADD_USERDATA,
  ADD_PDFID,
  ADD_CARD,
} from "../../shared/redux/reducers/index";
import Toast from "react-native-toast-message";
import {
	ADD_USERDATA,
	ADD_PDFID,
	ADD_CARD,
} from '../../shared/redux/reducers/index';
import Toast from 'react-native-toast-message';
import {
	submitUserData,
	generatePdfFile,
} from '../../shared/services/FetchIntercepter/request';

import { useSelector, useDispatch } from 'react-redux';

export default function CustomerDetails() {
	const myTheme = useTheme();
	const myStyle = style(myTheme);
	const dispatch = useDispatch();
	const userData = useSelector((state) => state?.root?.bremod?.userData);
	const pdfId = useSelector((state) => state?.root?.bremod?.pdfId);
	const [name, setName] = useState(userData?.customer_name || '');
	const [email, setEmail] = useState(userData?.customer_email || '');
	const cart = useSelector((state) => state?.root?.bremod?.card);
	const [address, setAddress] = useState(userData?.customer_address || '');
	const [phone, setPhone] = useState(userData?.customer_number || '');
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [loading, setLoading] = useState(false);
	const [allowGeneratePdf, setAllowGeneratePdf] = useState(false);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (userData) {
			setName(userData?.customer_name);
			setEmail(userData?.customer_email);
			setAddress(userData?.customer_address);
			setPhone(userData?.customer_number);
		}
	}, [userData]);

	useEffect(() => {
		console.log('here in the effect of the pfd block', pdfId);
		if (pdfId && allowGeneratePdf) {
			generatePdf();
		}
	}, [pdfId, allowGeneratePdf]);

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

		return errors;
	};

  const handleAddToForm = () => {
    const validationErrors = validateForm({ name, email, address, phone });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);

		const transformedProduct = cart.map((product) => ({
			product_id: product.id,
			product_quantitiy: product.quantity,
			product_color: product.selectedColor ? product.selectedColor : 'No color',
		}));

		let responseData = {
			customer_name: name,
			customer_number: phone,
			customer_email: email,
			customer_address: address,
			order_price: 0,
			status: 'Pending',
			products: transformedProduct,
		};
		submitUser(responseData);
		dispatch(ADD_USERDATA(responseData));
	};

	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const validatePhone = (phone) => {
		const phoneRegex = /^03[0-9]{9}$/;
		return phoneRegex.test(phone);
	};

	const submitUser = async (responseData) => {
		try {
			const res = await submitUserData(responseData);
			if (res?.status === 200) {
				dispatch(ADD_PDFID(res?.data?.order_id));
				setAllowGeneratePdf(true);
				generatePdf();
			} else {
				Toast.show({
					type: 'error',
					text1: res?.message,
					visibilityTime: 2000,
				});
			}
		} catch (error) {
			Toast.show({
				type: 'error',
				text1: 'Error Fetching Data:',
				text2: error,
				visibilityTime: 2000,
			});
		}
	};

  const generatePdf = async () => {
    console.log("in the pdf generation func");
    setAllowGeneratePdf(false);
    let payload = {
      id: pdfId,
      customer_name: name,
      customer_number: phone,
      customer_email: email,
      customer_address: address,
    };
    try {
      console.log("payload in pdf", payload);
      const res = pdfId ? await generatePdfFile(payload) : "";
      console.log("responsesss in thr pdf req", res);
      if (res?.status === 200) {
        console.log("responsesss", res?.data?.fileUrl);
        dispatch(ADD_CARD([]));
        openWhatsApp(res?.data?.fileUrl);
      }
    } catch (error) {
      console.log("error in the pdf request", JSON.stringify(error));
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const openWhatsApp = (data) => {
    const phoneNumber = "923114291712";
    const url = `https://wa.me/${phoneNumber}?text=${data}`;
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
			<ScrollView>
				<View>
					<View style={myStyle?.headerContainer}>
						<TouchableOpacity
							style={myStyle?.touchableContainerStyle}
							hitSlop={20}
							activeOpacity={0.6}
							onPress={() => goBack()}>
							<Image
								style={myStyle.leftIcon}
								source={BACK_ICON}
								resizeMode='contain'
							/>
						</TouchableOpacity>
						<Text
							numberOfLines={1}
							style={myStyle?.headingTextStyle}>
							{CUSTOMER_DETAIL}
						</Text>
					</View>
					<View style={myStyle.contentContainer}>
						<View style={myStyle.inputFieldContainer}>
							<InputField
								headerText={'Name*'}
								value={name}
								placeholder={'Name'}
								width={'100%'}
								keyboardType='default'
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
								headerText={'Phone Number*'}
								value={phone}
								placeholder={'Phone Number'}
								keyboardType='phone-pad'
								width={'100%'}
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
								headerText={'Email'}
								value={email}
								placeholder={'Email'}
								keyboardType='email-address'
								width={'100%'}
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
							<InputField
								headerText={'Address*'}
								value={address}
								placeholder={'Address'}
								width={'100%'}
								keyboardType='default'
								onChangeText={(e) => {
									setAddress(e);
								}}
							/>
							{errors.address && (
								<Text style={myStyle.errorText}>{errors.address}</Text>
							)}
						</View>
						<View style={myStyle.footer}>
							<TouchableOpacity
								style={[
									myStyle.checkoutButton,
									(!name || !phone || !address) &&
										myStyle.disablecheckoutButton,
								]}
								disabled={!name || !phone || !address}
								onPress={handleAddToForm}>
								<Text style={myStyle.checkoutButtonText}>Place Order</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ScrollView>

			{loading && (
				<View style={myStyle.loaderContainer}>
					<ActivityIndicator
						size='large'
						color='#19B95C'
					/>
				</View>
			)}
		</MyView>
	);
}
