/** @format */

import React, { useRef, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { style } from "./styles";
import { DEVICE_WIDTH } from "../../../shared/themes/deviceInfo/index";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { PLACEHOLDER_IMAGE } from "../../../assets/images";
const Carousel = ({ images }) => {
  const myTheme = useTheme();
  const myStyle = style(myTheme);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef();
  const dotScaleAnim = useRef(images.map(() => new Animated.Value(1))).current;
  const dotOpacityAnim = useRef(
    images.map(() => new Animated.Value(0.5))
  ).current;

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / DEVICE_WIDTH);
    setCurrentIndex(index);
  };

  const scrollToIndex = (index) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        animated: true,
        x: DEVICE_WIDTH * index,
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (currentIndex + 1) % images.length;
      scrollToIndex(newIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    dotScaleAnim.forEach((anim, index) => {
      Animated.spring(anim, {
        toValue: index === currentIndex ? 1.5 : 1,
        useNativeDriver: true,
      }).start();
    });

    dotOpacityAnim.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: index === currentIndex ? 1 : 0.5,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  }, [currentIndex]);
  return (
    <View style={myStyle.container}>
      <ScrollView
        ref={carouselRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onSnapToItem={setCurrentIndex}
      >
        {images.map((imageSource, index) => (
          <View key={index} style={myStyle.item}>
            <Image
              style={myStyle.image}
              source={
                images[0].image === null || images[0].image === undefined
                  ? PLACEHOLDER_IMAGE
                  : { uri: imageSource?.image }
              }
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Carousel;
