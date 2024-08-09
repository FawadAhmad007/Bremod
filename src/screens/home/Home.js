/** @format */

import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  BackHandler,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { FONTS_STYLE, MyView } from "../../shared/themes/style/common";
import { useTheme, useIsFocused } from "@react-navigation/native";
import { style } from "./styles";
import {
  SEARCH,
  CATEGORY,
  OUR_PRODUCTS,
  CATEGORY_ENUM,
  DETAIL_ENUM,
  CART_ENUM,
} from "../../shared/constants";
import {
  SEARCH_ICON,
  PLACEHOLDER_IMAGE,
  CATEGORY_ICON,
  CROSS_ICON,
  BREMOD_ICON,
  GROCERY_CART_ICON,
} from "../../assets";
import { navigate, getCurrentRoute, goBack } from "../../shared/services";
import Items from "./components/Items";
import Carousel from "./components/slider";
import DiscountBar from "./components/discountBar";
import {
  getProductList,
  getListForCategoryAndCover,
  getListForDiscount,
} from "../../shared/services/FetchIntercepter/request";
import { useSelector, useDispatch } from "react-redux";
import { bremodSilce } from "../../shared/redux/reducers/index";
import { IS_IOS } from "../../shared/themes/deviceInfo/index";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { isDiscountValid } from "../../shared/utils/index"; // Import the utility function

export default function Home() {
  const myTheme = useTheme();
  const myStyle = style(myTheme);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const productData = useSelector((state) => state?.root?.bremod?.product);
  const coverData = useSelector((state) => state?.root?.bremod?.cover);
  const cart = useSelector((state) => state?.root?.bremod?.card);
  const [searchText, setSearchText] = useState(null);
  const [showCross, setShowCross] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [pagination, setPagination] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backPressCount, setBackPressCount] = useState(0);
  const [discountDetails, setDiscountDetails] = useState({
    message: "",
    date: "",
    value: null,
  });
  const [category, setCategory] = useState(null);
  const [loader, setLoader] = useState(false);
  const [showBar, setShowBar] = useState(false);

  let page = useRef(1);

  const navigateHandler = () => {
    navigate(CATEGORY_ENUM, {
      onGoBack: (data) => {
        setSearchText(data?.name);
        setCategory(data?.name);
      },
    });
  };

  function processProducts(products) {
    return products.map((product) => {
      return {
        ...product,
        product_categories: product.product_categories
          ? product.product_categories.split(",")
          : [],
        product_image_urls: product.product_image_urls
          ? product.product_image_urls.split(",")
          : [],
        product_colors: product.product_colors
          ? product.product_colors.split(",")
          : [],
      };
    });
  }

  const manageProduct = (processedProducts) => {
    let featuredProducts = processedProducts.filter(
      (product) => product.is_featured === "featured"
    );
    let regularProducts = processedProducts.filter(
      (product) => product.is_featured !== "featured"
    );
    let sortedProducts = [...featuredProducts, ...regularProducts];

    return sortedProducts;
  };

  const getProducts = async () => {
    try {
      const res = await getProductList(
        "products/listing",
        page.current,
        10,
        searchText
      );
      const [categoriesRes, coverRes, discountRes] = await Promise.all([
        getListForCategoryAndCover("_category"),
        getListForCategoryAndCover("_cover"),
      ]);
      if (res?.status === 200) {
        setLoader(false);
        setLoading(false);
        const processedProducts = processProducts(res?.data);
        const sortedProducts = manageProduct(processedProducts);
        dispatch(bremodSilce?.actions?.ADD_COVER(coverRes?.data?.data));
        setRefreshing(false);
        dispatch(bremodSilce?.actions?.ADD_CATEGORY(categoriesRes?.data?.data));
        const data = { data: sortedProducts, page: page.current };
        dispatch(bremodSilce?.actions?.ADD_PRODUCTS(data));
        data?.data?.length == 10
          ? (page.current = page.current + 1)
          : setPagination(true);
      } else if (res?.message == "Network Error") {
        setLoader(false);
        setLoading(false);
        ToastAndroid.show("Network Error", ToastAndroid.SHORT);
      } else {
        setLoader(false);
        setLoading(false);
        ToastAndroid.show(res?.error, ToastAndroid.SHORT);
        
      }
    } catch (error) {
      setLoader(false);
      setLoading(false);
      ToastAndroid.show(error, ToastAndroid.SHORT);
   
    } finally {
      setLoader(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getProducts();
  }, []);
  useEffect(() => {
    getDiscount();
  }, [isFocused]);
  useEffect(() => {
    const backAction = () => {
      if (getCurrentRoute() != "Home") {
        goBack();
        return true;
      }

      if (backPressCount === 0) {
        setBackPressCount(1);
        ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);
        setTimeout(() => setBackPressCount(0), 2000);
        return true;
      } else {
        BackHandler.exitApp();
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [backPressCount]);
  const getDiscount = async () => {
    const [discountRes] = await Promise.all([getListForDiscount()]);
    const discount = discountRes?.data[0]?.end_at;
    const showDiscountBar = isDiscountValid(discount);
    setShowBar(showDiscountBar);
    setDiscountDetails({
      message: discountRes?.data[0]?.message,
      date: discountRes?.data[0]?.end_at,
      value: discountRes?.data[0]?.discount_percentage || 0,
    });
  };
  const searchHandler = () => {
 
     
        fetchSearchedProducts();
        setShowCross(false);
        setSearchText(null);
        setCategory(null);
    setShowCross(true);
     

  };
  const fetchSearchedProducts = async () => {
    page.current = 1;
    setPagination(false);
    setReachedEnd(false);
    await getProducts();
  };

  useEffect(() => {
    if (category !== null) {
      setShowCross(true);
    }
    fetchSearchedProducts();
  }, [category, searchText]);

  const handleRefresh = () => {
    page.current = 1;
    setPagination(false);
    setReachedEnd(false);
    setLoader(false);
    getDiscount();
    getProducts();
  };

  const handelPagination = () => {
    setLoader(true);
    getProducts();
  };

  const renderItem = ({ item }) => {
    return (
      <Items
        data={item}
        onPress={() => navigate(DETAIL_ENUM, { data: item })}
      />
    );
  };

  const HeaderComponent = () => (
    <View>
      {(!searchText || searchText === "") && coverData?.length > 0 && (
        <Carousel
          images={coverData?.length > 0 ? coverData : [PLACEHOLDER_IMAGE]}
        />
      )}
      {productData?.length != 0 && (
        <Text numberOfLines={1} style={myStyle?.headingTextStyle}>
          {OUR_PRODUCTS}
        </Text>
      )}
    </View>
  );

  const handleEmptyCart = () => {

    ToastAndroid.show("Your Cart is empty.", ToastAndroid.SHORT);

    return "";
  };

  return (
    <MyView>
      {showBar && <DiscountBar message={discountDetails?.message} />}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: moderateScale(10),
        }}
      >
        <Image
          style={myStyle?.logoStyle}
          source={BREMOD_ICON}
          resizeMode="contain"
          alt="Bremod"
          
        />
        <TouchableOpacity
          onPress={() => {
            cart?.length && cart?.length > 0
              ? navigate(CART_ENUM)
              : handleEmptyCart();
              
          }}
          style={myStyle?.cartContainer}
        >
          <Image
            style={myStyle?.cartStyle}
            source={GROCERY_CART_ICON}
            resizeMode="contain"
            alt="Grocery cart icon"
          />
          <View style={myStyle.badge}>
            <Text style={myStyle?.cartTextStyle}>{cart?.length}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={myStyle?.headerStyle}>
        <View style={myStyle?.headerInnerStyle}>
          <View style={myStyle?.inputViewStyle}>
            <TextInput
              selectionColor={myTheme?.colors?.secondary}
              placeholder={SEARCH}
              value={searchText}
              keyboardType="default"
              onChangeText={(e) => {
                setCategory(null);
                setSearchText(e);
              }}
              style={myStyle?.inputStyle}
            />

          { searchText&&  <TouchableOpacity
              style={myStyle?.searchIconViewStyle}
              hitSlop={10}
              onPress={searchHandler}
            >
              <Image
                style={{
                  width:moderateScale(20),
                  height: moderateScale(20),
                  tintColor: myTheme?.colors?.black
                }}
                source={CROSS_ICON}
                resizeMode="contain"
                alt="Category icon"
              />
            </TouchableOpacity>}
          </View>
        </View>
      </View>
      <FlatList
        columnWrapperStyle={myStyle?.flatListStyle}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        data={productData}
        contentContainerStyle={[
          productData?.length == 0 && {
            flexGrow: 1,
          },
          { paddingBottom: moderateScale(80) },
        ]}
        ListHeaderComponent={HeaderComponent}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <Text
            style={[
              {
                justifyContent: "center",
                alignSelf: "center",
                flex: 1,
                textAlignVertical: "center",
                color: myTheme?.colors?.black,
              },
            ]}
          >
            No Product Found
          </Text>
        )}
        onEndReached={() => {
          if (!reachedEnd) {
            productData?.length > 0 &&
              page.current > 0 &&
              !pagination &&
              handelPagination();
          }
        }}
        onEndReachedThreshold={0.3}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              handleRefresh();
            }}
          />
        }
        ListFooterComponent={() =>
          loader ? (
            <ActivityIndicator
              style={[
                myStyle?.ListFooterComponentLoader,
                {
                  paddingVertical: IS_IOS
                    ? verticalScale(15)
                    : verticalScale(10),
                },
              ]}
              size="small"
              color={myTheme?.colors?.secondary}
            />
          ) : (
            productData?.length > 0 &&
            pagination &&
            page.current > 0 && (
              <View
                style={[
                  myStyle?.ListFooterComponent,
                  {
                    paddingVertical: IS_IOS
                      ? verticalScale(25)
                      : verticalScale(15),
                  },
                ]}
              />
            )
          )
        }
      />
      <TouchableOpacity style={myStyle?.buttonContainer} onPress={navigateHandler}>
        <View style={myStyle?.buttonStyle}>

        <Image
          style={myStyle?.categoryIconStyle}
          source={CATEGORY_ICON}
          resizeMode="contain"
          alt="Category icon"
        />
        <Text numberOfLines={1} style={myStyle?.buttonTextStyle}>
          {CATEGORY}
        </Text>
       </View>
      </TouchableOpacity>
      {loading && (
        <View style={myStyle.loaderContainer}>
          <ActivityIndicator size="large" color="#19B95C" />
        </View>
      )}
    </MyView>
  );
}
