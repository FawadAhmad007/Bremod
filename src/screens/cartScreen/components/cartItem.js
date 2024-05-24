import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { style } from "../styles";
import { PLACEHOLDER_IMAGE } from "../../../assets";
const CartItem = ({ item }) => {
  console.log("item", item);
  console.log("item image", item.image);
  const myTheme = useTheme();
  const myStyle = style(myTheme);
  const [count, setCount] = useState(0);

  // const incrementCount = () => setCount(count + 1);
  // const decrementCount = () => setCount(count > 0 ? count - 1 : 0);

  return (
    <View style={myStyle.cartItem}>
      <Image
        source={item.image ? { uri: item.image[0] } : PLACEHOLDER_IMAGE}
        style={myStyle.productImage}
      />
      <View style={myStyle.productDetails}>
        <Text style={myStyle.productName}>{item.name}</Text>
        <Text style={myStyle.productColor}>
          <Text style={myStyle.productColorSpan}>Color : </Text>
          {"red"}
        </Text>
        <View style={myStyle.counterRow}>
          {/* <TouchableOpacity
            onPress={decrementCount}
            style={myStyle.counterButton}
          >
            <Text style={myStyle.counterButtonText}>-</Text>
          </TouchableOpacity> */}
          <Text style={myStyle.counterText}>
            <Text style={myStyle.productColorSpan}>Quantity : </Text> {count}
          </Text>
          {/* <TouchableOpacity
            onPress={incrementCount}
            style={myStyle.counterButton}
          >
            <Text style={myStyle.counterButtonText}>+</Text>
          </TouchableOpacity> */}
        </View>
      </View>
      <View style={myStyle.productDescriptionDetails}>
        <Text style={myStyle.productPrice}>${item.price}</Text>
      </View>
    </View>
  );
};

export default CartItem;
