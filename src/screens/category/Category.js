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
export default function Category() {
	const myTheme = useTheme();
	const myStyle = style(myTheme);

	const data = [
		{ name: 'Category  1' },
		{ name: 'Category  2' },
		{ name: 'Category  3' },
		{ name: 'Category  4' },
		{ name: 'Category  5' },
	];
	const renderItem = ({ item }) => {
		return <CategoryList text={item?.name} />;
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
				// columnWrapperStyle={myStyle?.flatListStyle}
				numColumns={1}
				keyExtractor={(item, index) => index.toString()}
				data={data}
				renderItem={renderItem}
				ItemSeparatorComponent={<View style={myStyle?.lineStyle} />}
			/>
		</MyView>
	);
}
