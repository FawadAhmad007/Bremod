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
import { moderateScale, scale } from "react-native-size-matters";
import { useSelector, useDispatch } from "react-redux";
import { ADD_CARD } from "../../shared/redux/reducers/index";
import { FONTS_STYLE } from "../../shared/themes/style/common";

export default function Detail({ route, navigation }) {
  let data = route?.params?.data;
  const myTheme = useTheme();
  const myStyle = style(myTheme);
  const [selectedId, setSelectedId] = useState(null);
  const colorsData = useSelector((state) => state?.root?.bremod?.color);
  const [count, setCount] = useState(1);
  const [numColumns, setNumColumns] = useState(calculateColumns());
  const dispatch = useDispatch();

  function calculateColumns() {
    const minCircleWidth = moderateScale(60);
    return Math.floor((DEVICE_WIDTH - scale(32)) / minCircleWidth);
  }

  useEffect(() => {
    setNumColumns(calculateColumns());
  }, []);

  const handleAddToCart = () => {
    let responseData = {
      id: data?.product_id,
      name: data?.name,
      image: data?.product_image_urls[0],
      price: data?.price,
      selectedColor: selectedId,
      quantity: count,
      // Other product details
    };
    const objShallowCopy = { ...responseData };
    dispatch(ADD_CARD(objShallowCopy));
  };

  const toggleSelectColor = (item) => {
    setSelectedId(item === selectedId ? null : item);
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

  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => setCount(count > 0 ? count - 1 : 0);

  const ColorCircle = ({ data, onPress, selected }) => (
    <TouchableOpacity
      style={[
        myStyle.circle,
        {
          backgroundColor: selected
            ? myTheme?.colors?.secondary
            : myTheme?.colors?.gray10,
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          {
            color: selected ? "white" : "black",
          },
          FONTS_STYLE?.TEXT_MEDIUM,
        ]}
      >
        {data}
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
        <Carousel
          images={data?.product_image_urls ? data?.product_image_urls : []}
        />

        <FlatList
          data={data?.product_colors}
          renderItem={({ item }) => (
            <ColorCircle
              data={item}
              onPress={() => toggleSelectColor(item)}
              selected={item === selectedId}
            />
          )}
          keyExtractor={(item) => item}
          horizontal={false}
          numColumns={numColumns}
          contentContainerStyle={myStyle.listContainer}
        />

        <View style={myStyle.detailViewStyle}>
          <DetailItem heading={NAME} text={data?.name} />
          <DetailItem
            heading={CATEGORY}
            text={data?.product_categories.join(", ")}
          />
          <DetailItem heading={PRICE} text={data?.price} />
          <View style={myStyle.itemStyle}>
            <Text numberOfLines={1} style={myStyle?.itemHeadingStyle}>
              Quantity :
            </Text>
            <View style={myStyle.counterRow}>
              <TouchableOpacity
                onPress={decrementCount}
                style={[
                  myStyle.counterButton,
                  count === 1 && myStyle.counterButtonTextDisabled,
                ]}
              >
                <Text
                  style={[
                    myStyle.counterButtonText,
                    count === 1 && myStyle.counterButtonTextDisabled,
                  ]}
                >
                  -
                </Text>
              </TouchableOpacity>
              <Text style={myStyle.counterText}>{count}</Text>
              <TouchableOpacity
                onPress={incrementCount}
                style={myStyle.counterButton}
              >
                <Text style={myStyle.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

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
