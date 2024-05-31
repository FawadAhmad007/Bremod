/** @format */

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
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
  HOME_ENUM,
} from "../../shared/constants";
import { BACK_ICON, CART_ICON } from "../../assets";
import DetailItem from "./components/DetailItem";
import Carousel from "./components/slider";
import ReadMore from "react-native-read-more-text";
import { goBack } from "../../shared/services";
import { DEVICE_WIDTH } from "../../shared/themes/deviceInfo/index";
import { moderateScale, scale } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import { ADD_CARD } from "../../shared/redux/reducers/index";
import { FONTS_STYLE } from "../../shared/themes/style/common";
import { navigate } from "../../shared/services";
import Toast from "react-native-toast-message";

export default function Detail({ route, navigation }) {
  let data = route?.params?.data;
  const myTheme = useTheme();
  const myStyle = style(myTheme);
  const [selectedId, setSelectedId] = useState(data?.product_colors[0]);
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
    Toast.show({
      type: "success",
      text1: "Product Added Successfully",
      visibilityTime: 2000,
    });
    navigate(HOME_ENUM);
  };

  const handleByDefaultColor = () => {
    if (data?.product_colors?.length > 0) {
      Toast.show({
        type: "info",
        text1: "First Colour of the product is selected",
        visibilityTime: 2000,
      });
      return data?.product_colors[0];
    } else {
      return "";
    }
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
