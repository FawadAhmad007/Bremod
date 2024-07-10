/** @format */

import { Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { style } from '../styles';
import { useTheme } from '@react-navigation/native';
import { PLACEHOLDER_IMAGE } from '../../../assets';

const Items = ({ data, onPress }) => {
	const myTheme = useTheme();
	const myStyle = style(myTheme);
	return (
		<TouchableOpacity
			style={myStyle?.itemStyle}
			onPress={onPress}>
			<Image
				style={myStyle?.itemImageStyle}
				source={
					data?.product_image_urls?.length > 0
						? { uri: data?.product_image_urls[0] }
						: PLACEHOLDER_IMAGE
				}
				resizeMode='cover'
			/>
			<Text
				numberOfLines={2}
				style={myStyle?.itemHeadingStyle}>
				{data?.name}
			</Text>
			{data?.product_categories &&
				data.product_categories.map((category, index) => (
					<Text
						key={index}
						numberOfLines={3}
						style={myStyle?.itemTextStyle}>
						{category}
					</Text>
				))}
		</TouchableOpacity>
	);
};

export default Items;
