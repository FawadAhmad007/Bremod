import React, { useState } from "react";

// import all the components we are going to use

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Linking,
  Share,
} from "react-native";

// import DocumentPicker to select PDF file

// import DocumentPicker from "react-native-document-picker";

const Test = () => {
  const [mobileNumber, setMobileNumber] = useState("");

  const [whatsAppMsg, setWhatsAppMsg] = useState(
    "Please follow https://aboutreact.com"
  );

  const [pdfFile, setPdfFile] = useState(null);

  const initiateWhatsApp = async () => {
    // Check for perfect 10 digit length



    // Using 91 for India

    // You can change 91 with your country code

    const countryCode = "91";

    const fullMobileNumber = `${countryCode}${mobileNumber}`;

    if (pdfFile) {
      try {
        const result = await Share.share({
          url: pdfFile.uri,

          message: whatsAppMsg,

          title: "Share PDF via WhatsApp",
        });

        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            console.log("Shared with activity type:", result.activityType);
          } else {
            console.log("Shared successfully");
          }
        } else if (result.action === Share.dismissedAction) {
          console.log("Share dismissed");
        }
      } catch (error) {
        console.error("Error sharing file:", error);
      }
    } else {
      alert("Please select a PDF file to share.");
    }
  };

  const selectPdfFile = async () => {
    try {
      const res = "Document"

      setPdfFile(res[0]);
    } catch (err) {
    
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Example to Send WhatsApp Message with PDF from React Native App
        </Text>

        <Text style={styles.titleTextsmall}>Enter WhatsApp Number</Text>

        <TextInput
          value={mobileNumber}
          onChangeText={(mobileNumber) => setMobileNumber(mobileNumber)}
          placeholder={"Enter WhatsApp Number"}
          keyboardType="numeric"
          style={styles.textInput}
        />

        <Text style={styles.titleTextsmall}>WhatsApp Message</Text>

        <TextInput
          value={whatsAppMsg}
          onChangeText={(whatsAppMsg) => setWhatsAppMsg(whatsAppMsg)}
          placeholder={"WhatsApp Message"}
          style={styles.textInput}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={selectPdfFile}
        >
          <Text style={styles.buttonTextStyle}>Select PDF File</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={initiateWhatsApp}
        >
          <Text style={styles.buttonTextStyle}>
            Send WhatsApp Message with PDF
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",

    padding: 10,
  },

  titleText: {
    fontSize: 22,

    textAlign: "center",

    fontWeight: "bold",
  },

  titleTextsmall: {
    marginVertical: 8,

    fontSize: 16,
  },

  buttonStyle: {
    justifyContent: "center",

    marginTop: 15,

    padding: 10,

    backgroundColor: "#8ad24e",
  },

  buttonTextStyle: {
    color: "#fff",

    textAlign: "center",
  },

  textInput: {
    height: 40,

    borderColor: "gray",

    borderWidth: 1,

    width: "100%",

    paddingHorizontal: 10,
  },
});
