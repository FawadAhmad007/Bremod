/** @format */

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MyView } from "../../shared/themes/style/common";
import { useTheme } from "@react-navigation/native";
import { style } from "./styles";
import {
  CATEGORY,
  DESCRIPTION,
  NAME,
  OUR_PRODUCTS,
  PRICE,
  ADD_CART,
} from "../../shared/constants";
import { BACK_ICON, CART_ICON } from "../../assets";
import DetailItem from "./components/DetailItem";
import Carousel from "./components/slider";
import ReadMore from "react-native-read-more-text";
import { goBack } from "../../shared/services";
import { DEVICE_WIDTH } from "../../shared/themes/deviceInfo/index";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useSelector, useDispatch } from "react-redux";
import { ADD_CARD } from "../../shared/redux/reducers/index";

export default function Detail({ route, navigation }) {
  const myTheme = useTheme();
  const myStyle = style(myTheme);
  const [selectedColors, setSelectedColors] = useState([]);
  const colorsData = useSelector((state) => state?.root?.bremod?.color);
  const dispatch = useDispatch();

  const [numColumns, setNumColumns] = useState(calculateColumns());
  let data = route.params.data;
  function calculateColumns() {
    const minCircleWidth = moderateScale(30);
    return Math.floor((DEVICE_WIDTH - scale(62)) / minCircleWidth);
  }

  useEffect(() => {
    setNumColumns(calculateColumns());
  }, []);

  const handleAddToCart = () => {
    console.log("data in details", data);
    let responseData = {
      id: data?.id,
      name: data?.name,
      image: data?.image,
      price: data?.price,
      // Other product details
    };
    // console.log("responseData", responseData);
	const objShallowCopy = {...responseData};
    dispatch(ADD_CARD(objShallowCopy));
  };

  const toggleSelectColor = (color) => {
    const index = selectedColors.indexOf(color);
    if (index !== -1) {
      selectedColors.splice(index, 1); // Deselect color
    } else {
      selectedColors.push(color); // Select color
    }
    setSelectedColors([...selectedColors]); // Trigger re-render
  };

  const renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={myStyle?.moreTextStyle} onPress={handlePress}>
        Read more
      </Text>
    );
  };

  const renderRevealedFooter = (handlePress) => {
    return (
      <Text style={myStyle?.moreTextStyle} onPress={handlePress}>
        Show less
      </Text>
    );
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

  const ColorCircle = ({ data, onPress, isSelected }) => (
    <TouchableOpacity
      style={{
        paddingHorizontal: moderateScale(16),
        paddingVertical: verticalScale(8),
        marginVertical: moderateScale(3),
        marginHorizontal: moderateScale(2),
        borderRadius: moderateScale(25),
        backgroundColor: myTheme?.colors?.gray10,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: "black",
        }}
      >
        {data?.name}
      </Text>
    </TouchableOpacity>
  );
  return (
    <MyView>
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
          {OUR_PRODUCTS}
        </Text>
        <View style={myStyle?.rightIcon} />
      </View>
      <ScrollView>
        <Carousel images={data?.image ? data?.image : []} />

        <FlatList
          data={colorsData}
          renderItem={({ item }) => (
            <ColorCircle data={item} onPress={() => toggleSelectColor(item)} />
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal={false}
          numColumns={4}
          contentContainerStyle={myStyle.listContainer}
        />
        <View style={myStyle.detailViewStyle}>
          <DetailItem heading={NAME} text={data?.name} />
          <DetailItem heading={CATEGORY} text={data?.categories[0]?.name} />
          <DetailItem heading={PRICE} text={data?.price} />
          <View style={myStyle?.detailView}>
            <Text style={myStyle?.detailHeadingStyle}>{DESCRIPTION}:</Text>
            <ReadMore
              numberOfLines={8}
              renderTruncatedFooter={renderTruncatedFooter}
              renderRevealedFooter={renderRevealedFooter}
            >
              <Text style={myStyle?.itemTextStyle}>{data?.description}</Text>
            </ReadMore>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        // onPress={openWhatsApp}
        onPress={handleAddToCart}
        style={myStyle?.buttonStyle}
      >
        <Image
          style={myStyle?.categoryIconStyle}
          source={CART_ICON}
          resizeMode="contain"
        />
        <Text numberOfLines={1} style={myStyle?.buttonTextStyle}>
          {ADD_CART}
        </Text>
      </TouchableOpacity>
    </MyView>
  );
}
