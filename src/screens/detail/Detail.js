import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { MyView } from "../../shared/themes/style/common";
import { useTheme } from "@react-navigation/native";
import { style } from "./styles";
import {
  CATEGORY,
  DESCRIPTION,
  NAME,
  OUR_PRODUCTS,
  PRICE,
} from "../../shared/constants";
import { PLACEHOLDER_IMAGE } from "../../assets";
import DetailItem from "./components/DetailItem";
import ReadMore from "react-native-read-more-text";

export default function Detail() {
  const myTheme = useTheme();
  const myStyle = style(myTheme);

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

  return (
    <MyView>
      <ScrollView>
        <Text numberOfLines={1} style={myStyle?.headingTextStyle}>
          {OUR_PRODUCTS}
        </Text>
        <Image
          style={myStyle?.coverImageStyle}
          source={PLACEHOLDER_IMAGE}
          resizeMode="cover"
        />
        <View style={myStyle.detailViewStyle}>
          <DetailItem heading={NAME} text={"Product"} />
          <DetailItem
            heading={CATEGORY}
            text={"Category1, Category2, Category3"}
          />
          <DetailItem heading={PRICE} text={"00.00"} />
          <View style={myStyle?.detailView}>
            <Text style={myStyle?.detailHeadingStyle}>{DESCRIPTION}:</Text>
            <ReadMore
              numberOfLines={8}
              renderTruncatedFooter={renderTruncatedFooter}
              renderRevealedFooter={renderRevealedFooter}
            >
              <Text style={myStyle?.itemTextStyle}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Text>
            </ReadMore>
          </View>
        </View>
      </ScrollView>
    </MyView>
  );
}
