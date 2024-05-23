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
					data?.image?.length > 0 ? { uri: data?.image[0] } : PLACEHOLDER_IMAGE
				}
				resizeMode='cover'
			/>
			<Text
				numberOfLines={2}
				style={myStyle?.itemHeadingStyle}>
				{data?.name}
			</Text>
			{data?.categories && (
				<Text
					numberOfLines={3}
					style={myStyle?.itemTextStyle}>
					{data?.categories[0]?.name}
				</Text>
			)}
		</TouchableOpacity>
	);
};

export default Items;
