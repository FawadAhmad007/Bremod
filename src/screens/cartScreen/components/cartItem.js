/** @format */

import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { style } from '../styles';
import { PLACEHOLDER_IMAGE } from '../../../assets';
import { CROSS_ICON } from '../../../assets/icons';

const CartItem = ({ item, removeItem, index }) => {
	const myTheme = useTheme();
	const myStyle = style(myTheme);

	return (
		<View style={myStyle.cartItem}>
			<View style={myStyle.imageContainer}>
				<View style={myStyle?.imageSubContainer}>
					<Image
						source={item?.image ? { uri: item?.image } : PLACEHOLDER_IMAGE}
						style={myStyle.productImage}
					/>
					<View style={myStyle.productDetails}>
						<Text style={myStyle.productName}>{item?.name}</Text>
						<Text style={myStyle.productColor}>
							<Text style={myStyle.productColorSpan}>Color: </Text>
							{item?.selectedColor ? item?.selectedColor : ' '}
						</Text>
					</View>
				</View>
				<TouchableOpacity
					hitSlop={10}
					onPress={() => removeItem(item, index)}>
					<Image
						source={CROSS_ICON}
						style={myStyle.crossImage}
					/>
				</TouchableOpacity>
			</View>

			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginTop: 10,
				}}>
				<View style={myStyle.counterRow}>
					<Text style={myStyle.counterText}>
						<Text style={myStyle.productColorSpan}>Quantity: </Text>{' '}
						{item?.quantity}
					</Text>
				</View>
				<Text style={myStyle.productPrice}>
					{item?.price ? (
						<>
							{item?.price * item?.quantity}
							<Text style={myStyle?.itemTextStyle}>.00 Rs</Text>
						</>
					) : (
						''
					)}
				</Text>
			</View>
		</View>
	);
};

export default CartItem;
