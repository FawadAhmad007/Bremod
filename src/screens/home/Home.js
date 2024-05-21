/** @format */

import {
	View,
	TextInput,
	Text,
	Image,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { MyView } from '../../shared/themes/style/common';
import { useTheme } from '@react-navigation/native';
import { style } from './styles';
import {
	SEARCH,
	CATEGORY,
	OUR_PRODUCTS,
	CATEGORY_ENUM,
	DETAIL_ENUM,
} from '../../shared/constants';
import {
	SEARCH_ICON,
	PLACEHOLDER_IMAGE,
	CATEGORY_ICON,
	CROSS_ICON,
	BREMOD_ICON,
	GROCERY_CART_ICON,
} from '../../assets';
import { navigate } from '../../shared/services';
import Items from './components/Items';

export default function Home() {
	const myTheme = useTheme();
	const myStyle = style(myTheme);
	const [searchText, setSearchText] = useState(null);
	const [showCross, setShowCross] = useState(false);

	const navigateHandler = () => {
		navigate(CATEGORY_ENUM);
	};

	const data = [
		{ name: 'Name', category: 'Category1, Category2, Category3 ' },
		{ name: 'Name', category: 'Category1, Category2, Category3 ' },
		{ name: 'Name', category: 'Category1, Category2, Category3 ' },
		{ name: 'Name', category: 'Category1, Category2, Category3 ' },
		{ name: 'Name', category: 'Category1, Category2, Category3 ' },
		{ name: 'Name', category: 'Category1, Category2, Category3 ' },
		{ name: 'Name', category: 'Category1, Category2, Category3 ' },
	];

	const searchHandler = () => {
		if (showCross) {
			setShowCross(false);
			setSearchText(null);
		} else {
			setShowCross(true);
		}
	};
	const renderItem = ({ item }) => {
		return (
			<Items
				name={item?.name}
				category={item?.category}
				onPress={() => navigate(DETAIL_ENUM)}
			/>
		);
	};

	return (
		<MyView>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}>
				<Image
					style={myStyle?.logoStyle}
					source={BREMOD_ICON}
					resizeMode='contain'
				/>
				<TouchableOpacity style={myStyle?.cartContainer}>
					<Image
						style={myStyle?.cartStyle}
						source={GROCERY_CART_ICON}
						resizeMode='contain'
					/>
					<View style={myStyle.badge}>
						<Text style={myStyle?.cartTextStyle}>{'2'}</Text>
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
							placeholderTextColor={myTheme?.colors?.gray}
							onChangeText={setSearchText}
							style={myStyle?.inputStyle}
						/>
						{searchText && (
							<TouchableOpacity
								style={myStyle?.searchIconViewStyle}
								hitSlop={10}
								onPress={searchHandler}>
								<Image
									style={myStyle?.searchIconStyle}
									source={showCross ? CROSS_ICON : SEARCH_ICON}
									resizeMode='contain'
								/>
							</TouchableOpacity>
						)}
					</View>
				</View>
			</View>

			<Image
				style={myStyle?.coverImageStyle}
				source={PLACEHOLDER_IMAGE}
				resizeMode='cover'
			/>

			<Text
				numberOfLines={1}
				style={myStyle?.headingTextStyle}>
				{OUR_PRODUCTS}
			</Text>

			<FlatList
				columnWrapperStyle={myStyle?.flatListStyle}
				numColumns={3}
				keyExtractor={(item, index) => index.toString()}
				data={data}
				renderItem={renderItem}
			/>

			<TouchableOpacity
				style={myStyle?.buttonStyle}
				onPress={navigateHandler}>
				<Image
					style={myStyle?.categoryIconStyle}
					source={CATEGORY_ICON}
					resizeMode='contain'
				/>
				<Text
					numberOfLines={1}
					style={myStyle?.buttonTextStyle}>
					{CATEGORY}
				</Text>
			</TouchableOpacity>
		</MyView>
	);
}
