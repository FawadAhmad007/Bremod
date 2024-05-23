/** @format */

import {
	View,
	TextInput,
	Text,
	Image,
	TouchableOpacity,
	FlatList,
	RefreshControl,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
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
import Carousel from './components/slider';
import {
	getList,
	getProductList,
} from '../../shared/services/FetchIntercepter/request';
import { useSelector, useDispatch } from 'react-redux';
import { bremodSilce } from '../../shared/redux/reducers/index';

export default function Home() {
	const myTheme = useTheme();
	const myStyle = style(myTheme);
	const dispatch = useDispatch();
	const productData = useSelector((state) => state?.root?.bremod?.product);
	const coverData = useSelector((state) => state?.root?.bremod?.cover);
	const [searchText, setSearchText] = useState(null);
	const [showCross, setShowCross] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [reachedEnd, setReachedEnd] = useState(false);
	const [pagination, setPagination] = useState(false);
	const [category, setCategory] = useState(null);

	let page = useRef(1);

	const navigateHandler = () => {
		navigate(CATEGORY_ENUM, {
			onGoBack: (data) => {
				setSearchText(data?.name);
				setCategory(data?.name);
			},
		});
	};

	const appendDataToProducts = (
		products,
		images,
		productCategories,
		categoryList,
	) => {
		const imageMap = images.reduce((map, cover) => {
			if (!map[cover.product_id]) {
				map[cover.product_id] = [];
			}
			map[cover.product_id].push(cover.url);
			return map;
		}, {});
		const categoryMap = categoryList.reduce((map, category) => {
			map[category.id] = category.name;
			return map;
		}, {});

		const categoryByProductMap = productCategories.reduce((map, pc) => {
			if (!map[pc.product_id]) {
				map[pc.product_id] = [];
			}
			map[pc.product_id].push({
				id: pc.category_id,
				name: categoryMap[pc.category_id],
			});
			return map;
		}, {});

		return products.map((product) => ({
			...product,
			image: imageMap[product.id] || null,
			categories: categoryByProductMap[product.id] || [],
		}));
	};

	const getProducts = async () => {
		try {
			const res = await getProductList(
				'_product',
				page.current,
				10,
				searchText,
			);
			const [
				imageRes,
				productCategoriesRes,
				categoriesRes,
				coverRes,
				colorRes,
			] = await Promise.all([
				getList('image'),
				getProductList('_products_categories', page.current, 10),
				getProductList('_category', page.current, 10),
				getList('_cover'),
				getList('_color'),
			]);

			const updateProductData = appendDataToProducts(
				res?.data?.data,
				imageRes?.data?.data,
				productCategoriesRes?.data?.data,
				categoriesRes?.data?.data,
			);
			dispatch(bremodSilce?.actions?.ADD_COVER(coverRes?.data?.data));
			dispatch(bremodSilce?.actions?.ADD_COLOR(colorRes?.data?.data));
			setRefreshing(false);
			dispatch(bremodSilce?.actions?.ADD_CATEGORY(categoriesRes?.data?.data));
			const data = { data: updateProductData, page: page.current };
			dispatch(bremodSilce?.actions?.ADD_PRODUCTS(data));
			data?.data?.length == 10
				? (page.current = page.current + 1)
				: setPagination(true);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		getProducts();
	}, []);

	const searchHandler = () => {
		if (showCross) {
			fetchSearchedProducts();
			setShowCross(false);
			setSearchText(null);
			setCategory(null);
		} else {
			fetchSearchedProducts();
			setShowCross(true);
		}
	};
	const fetchSearchedProducts = async () => {
		page.current = 1;
		setPagination(false);
		setReachedEnd(false);
		await getProducts();
	};

	useEffect(() => {
		if (category !== null) {
			setShowCross(true);
		}
		fetchSearchedProducts();
	}, [category, searchText]);

	const handleRefresh = () => {
		page.current = 1;
		setPagination(false);
		setReachedEnd(false);
		getProducts();
	};

	const handelPagination = () => {
		getProducts();
	};

	const renderItem = ({ item }) => {
		return (
			<Items
				data={item}
				onPress={() => navigate(DETAIL_ENUM, { data: item })}
			/>
		);
	};

	const HeaderComponent = () => (
		<View>
			<Carousel
				images={coverData?.length > 0 ? coverData : [PLACEHOLDER_IMAGE]}
			/>
			{/* <Image
				style={myStyle?.coverImageStyle}
				source={PLACEHOLDER_IMAGE}
				resizeMode='cover'
			/> */}
			<Text
				numberOfLines={1}
				style={myStyle?.headingTextStyle}>
				{OUR_PRODUCTS}
			</Text>
		</View>
	);

	return (
		<MyView>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
							keyboardType='default'
							placeholderTextColor={myTheme?.colors?.gray}
							onChangeText={(e) => {
								setCategory(null);
								setSearchText(e);
							}}
							style={myStyle?.inputStyle}
						/>

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
					</View>
				</View>
			</View>
			<FlatList
				columnWrapperStyle={myStyle?.flatListStyle}
				numColumns={3}
				keyExtractor={(item, index) => index.toString()}
				data={productData}
				ListHeaderComponent={HeaderComponent}
				renderItem={renderItem}
				onEndReached={() => {
					if (!reachedEnd) {
						productData?.length > 0 &&
							page.current > 0 &&
							!pagination &&
							handelPagination();
					}
				}}
				onEndReachedThreshold={0.1}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={() => {
							handleRefresh();
						}}
					/>
				}
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
