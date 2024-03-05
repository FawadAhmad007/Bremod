/** @format */

import { TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { style } from '../styles';
const CategoryList = ({ text, onPress }) => {
	const myTheme = useTheme();
	const myStyle = style(myTheme);

	return (
		<TouchableOpacity
			onPress={onPress}
			style={myStyle?.list}>
			<Text
				numberOfLines={1}
				style={myStyle?.listText}>
				{text}
			</Text>
		</TouchableOpacity>
	);
};
export default CategoryList;
