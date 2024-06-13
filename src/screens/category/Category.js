/** @format */

import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MyView } from "../../shared/themes/style/common";
import { useTheme } from "@react-navigation/native";
import { style } from "./styles";
import { CATEGORY } from "../../shared/constants";
import { BACK_ICON } from "../../assets";
import { goBack } from "../../shared/services";
import CategoryList from "./component/index";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { getListForDiscount } from "../../shared/services/FetchIntercepter/request";
import DiscountBar from "../home/components/discountBar";
import { isDiscountValid } from "../../shared/utils/index"; // Import the utility function

export default function Category({ route }) {
  const myTheme = useTheme();
  const myStyle = style(myTheme);
  const categoryData = useSelector((state) => state?.root?.bremod?.category);
  const [showBar, setShowBar] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [discountDetails, setDiscountDetails] = useState({
    message: "",
    date: "",
    value: null,
  });


  useEffect(() => {
    getDiscount();
  }, []);

  const getDiscount = async () => {
    try {
      const res = await getListForDiscount();
      if (res?.status === 200) {
        console.log("dis res", res);
        const discount = res?.data[0]?.end_at; // Adjust as per your data structure
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
        Toast.show({
          type: "error",
          text1: res?.error,
          visibilityTime: 2000,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error,
        text2: error.message,
      });
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const renderItem = ({ item }) => {
    return (
      <CategoryList text={item?.name} onPress={() => handleGoBack(item)} />
    );
  };

  const handleGoBack = (data) => {
    route.params.onGoBack(data);
    goBack();
  };

  if (loading) {
    return (
      <View style={myStyle.loaderContainer}>
        <ActivityIndicator size="large" color="#19B95C" />
      </View>
    );
  }

  return (
    <MyView>
      {showBar && <DiscountBar message={discountDetails?.message} />}

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
          {CATEGORY}
        </Text>
        <View style={myStyle?.rightIcon} />
      </View>
      <FlatList
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
        data={categoryData}
        renderItem={renderItem}
        ItemSeparatorComponent={<View style={myStyle?.lineStyle} />}
      />
    </MyView>
  );
}
