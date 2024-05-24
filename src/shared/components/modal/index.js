import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import { InputField } from "../index";
import Modal from "react-native-modal";
import { CROSS_ICON } from "../../../assets/icons";
import { useDispatch } from "react-redux";
import { ADD_USERDATA } from "../../../shared/redux/reducers/index";
import style from "./styles";

const CommonModal = ({ isVisible, heading, handleClose }) => {
  const myTheme = useTheme();
  const myStyle = style(myTheme);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();

  const handleAddToForm = () => {
    let responseData = {
      name: name,
      phoneNumber: phone,
      email: email,
      address: address,
      // Other product details
    };
    console.log("responseData", responseData);
    dispatch(ADD_USERDATA(responseData));
    handleClose();
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
            onPress={handleAddToForm}
          >
            <Text style={myStyle.checkoutButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CommonModal;
