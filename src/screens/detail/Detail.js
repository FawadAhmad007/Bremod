/** @format */

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
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
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_CARD,
  UPDATE_CARD_QUANTITY,
} from "../../shared/redux/reducers/index";
import { FONTS_STYLE } from "../../shared/themes/style/common";
import { navigate } from "../../shared/services";
import { getListForDiscount } from "../../shared/services/FetchIntercepter/request";
import Toast from "react-native-toast-message";

import DiscountBar from "../home/components/discountBar";
import { isDiscountValid } from "../../shared/utils/index"; // Import the utility function

export default function Detail({ route, navigation }) {
  let data = route?.params?.data;
  const myTheme = useTheme();
  const myStyle = style(myTheme);
  const [selectedId, setSelectedId] = useState(data?.product_colors[0]);
  const [count, setCount] = useState(1);
  const [numColumns, setNumColumns] = useState(calculateColumns());
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.root.bremod.card);
  const [discountDetails, setDiscountDetails] = useState({
    message: "",
    date: "",
    value: null,
  });
  const [showBar, setShowBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const isValidPrice = typeof data?.price === "number" && data.price >= 0;

  useEffect(() => {
    getDiscount();
  }, []);

  const getDiscount = async () => {
    try {
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
        Toast.show({
          type: "error",
          text1: "Network Error",
          visibilityTime: 2000,
        });
      } else {
        // Toast.show({
        // 	type: 'error',
        // 	text1: res?.error,
        // 	visibilityTime: 2000,
        // });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error,
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

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
    };
    const existingProductIndex = cart.findIndex(
      (item) =>
        item.id === responseData.id &&
        item.selectedColor === responseData.selectedColor
    );

    if (existingProductIndex >= 0) {
      const updatedProduct = {
        ...cart[existingProductIndex],
        quantity: cart[existingProductIndex].quantity + responseData.quantity,
      };
      dispatch(
        UPDATE_CARD_QUANTITY({
          index: existingProductIndex,
          product: updatedProduct,
        })
      );
      Toast.show({
        type: "success",
        text1: "Product updated successfully",
        visibilityTime: 2000,
      });
    } else {
      const objShallowCopy = { ...responseData };
      dispatch(ADD_CARD(objShallowCopy));
      Toast.show({
        type: "success",
        text1: "Product Added Successfully",
        visibilityTime: 2000,
      });
    }
    navigate(HOME_ENUM);
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
      activeOpacity={0.7}
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

  if (loading) {
    return (
      <View style={myStyle.loaderContainer}>
        <ActivityIndicator size="large" color="#19B95C" />
      </View>
    );
  }

  return (
    <MyView style={{ flex: 1 }}>
      {showBar && <DiscountBar message={discountDetails?.message} />}
      <View
        style={[
          myStyle?.container,
          {
            marginTop: !showBar ? moderateScale(10) : moderateScale(2),
          },
        ]}
      >
        <TouchableOpacity
          style={myStyle?.touchableContainerStyle}
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
          {data?.name && <DetailItem heading={NAME} text={data?.name} />}
          {data?.product_categories && (
            <DetailItem
              heading={CATEGORY}
              text={data?.product_categories.join(", ")}
            />
          )}
          {isValidPrice && <DetailItem heading={PRICE} text={data?.price} />}
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
      <TouchableOpacity onPress={handleAddToCart} style={myStyle?.buttonStyle}>
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
