/** @format */

import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { MyView } from '../../shared/themes/style/common';
import { useTheme } from '@react-navigation/native';
import { style } from './styles';
import { CATEGORY } from '../../shared/constants';
import { BACK_ICON } from '../../assets';
import { goBack } from '../../shared/services';
import CategoryList from './component/index';
import { useSelector } from 'react-redux';

export default function Category({ route }) {
	const myTheme = useTheme();
	const myStyle = style(myTheme);
	const categoryData = useSelector((state) => state?.root?.bremod?.category);

	const renderItem = ({ item }) => {
		return (
			<CategoryList
				text={item?.name}
				onPress={() => handleGoBack(item)}
			/>
		);
	};
	const handleGoBack = (data) => {
		route.params.onGoBack(data);
		goBack();
	};
	return (
		<MyView>
			<View style={myStyle?.container}>
				<TouchableOpacity
					style={myStyle?.touchableContainerStyle}
					hitSlop={20}
					activeOpacity={0.6}
					onPress={() => goBack()}>
					<Image
						style={myStyle.leftIcon}
						source={BACK_ICON}
						resizeMode='contain'
					/>
				</TouchableOpacity>
				<Text
					numberOfLines={1}
					style={myStyle?.headingTextStyle}>
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
