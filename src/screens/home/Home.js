/** @format */

import {
	View,
	TextInput,
	Text,
	Image,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
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
	CART_ENUM,
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
	getProductList,
	getListForCategoryAndCover,
} from '../../shared/services/FetchIntercepter/request';
import { useSelector, useDispatch } from 'react-redux';
import { bremodSilce } from '../../shared/redux/reducers/index';
import Toast from 'react-native-toast-message';
import { IS_IOS } from '../../shared/themes/deviceInfo/index';
import { verticalScale } from 'react-native-size-matters';

export default function Home() {
	const myTheme = useTheme();
	const myStyle = style(myTheme);
	const dispatch = useDispatch();
	const productData = useSelector((state) => state?.root?.bremod?.product);
	const coverData = useSelector((state) => state?.root?.bremod?.cover);
	const cart = useSelector((state) => state?.root?.bremod?.card);
	const [searchText, setSearchText] = useState(null);
	const [showCross, setShowCross] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [reachedEnd, setReachedEnd] = useState(false);
	const [pagination, setPagination] = useState(false);
	const [loading, setLoading] = useState(false);
	const [category, setCategory] = useState(null);
	const [loader, setLoader] = useState(false);

	let page = useRef(1);

	const navigateHandler = () => {
		navigate(CATEGORY_ENUM, {
			onGoBack: (data) => {
				setSearchText(data?.name);
				setCategory(data?.name);
			},
		});
	};

	function processProducts(products) {
		return products.map((product) => {
			return {
				...product,
				product_categories: product.product_categories
					? product.product_categories.split(',')
					: [],
				product_image_urls: product.product_image_urls
					? product.product_image_urls.split(',')
					: [],
				product_colors: product.product_colors
					? product.product_colors.split(',')
					: [],
			};
		});
	}

	const getProducts = async () => {
		try {
			console.log('products page', page.current);
			console.log('products query', searchText);
			const res = await getProductList(
				'products/listing',
				page.current,
				10,
				searchText,
			);
			const [categoriesRes, coverRes] = await Promise.all([
				getListForCategoryAndCover('_category'),
				getListForCategoryAndCover('_cover'),
			]);
			console.log('ressssss of the products', res);
			if (res?.status === 200) {
				// Toast.show({
				//   type: "success",
				//   text1: "Products Fetched Successfully",
				//   visibilityTime: 2000,
				// });
				// console.log("res info",res);
				// console.log("res of the products",JSON.stringify(res?.data));
				setLoader(false);

				const processedProducts = processProducts(res?.data);
				dispatch(bremodSilce?.actions?.ADD_COVER(coverRes?.data?.data));
				setRefreshing(false);
				dispatch(bremodSilce?.actions?.ADD_CATEGORY(categoriesRes?.data?.data));
				const data = { data: processedProducts, page: page.current };
				dispatch(bremodSilce?.actions?.ADD_PRODUCTS(data));
				console.log('products data', JSON.stringify(data, 4, null));
				data?.data?.length == 10
					? (page.current = page.current + 1)
					: setPagination(true);
			} else {
				setLoader(false);

				Toast.show({
					type: 'error',
					text1: res?.error,
					visibilityTime: 2000,
				});
			}
		} catch (error) {
			setLoader(false);

			Toast.show({
				type: 'error',
				text1: error,
				text2: error.message,
			});
		} finally {
			setLoader(false);

			setLoading(false);
		}
	};

	useEffect(() => {
		setLoading(true);
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
		setLoader(false);
		getProducts();
	};

	const handelPagination = () => {
		setLoader(true);
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

	const HeaderComponent = () =>
		productData?.length != 0 && (
			<View>
				{(!searchText || searchText === '') && (
					<Carousel
						images={coverData?.length > 0 ? coverData : [PLACEHOLDER_IMAGE]}
					/>
				)}
				<Text
					numberOfLines={1}
					style={myStyle?.headingTextStyle}>
					{OUR_PRODUCTS}
				</Text>
			</View>
		);

	const handleEmptyCart = () => {
		Toast.show({
			type: 'error',
			text1: 'Your Cart is empty.',
			visibilityTime: 2000,
		});
		return '';
	};

	return (
		<MyView>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<Image
					style={myStyle?.logoStyle}
					source={BREMOD_ICON}
					resizeMode='contain'
				/>
				<TouchableOpacity
					onPress={() => {
						cart?.length && cart?.length > 0
							? navigate(CART_ENUM)
							: handleEmptyCart();
					}}
					style={myStyle?.cartContainer}>
					<Image
						style={myStyle?.cartStyle}
						source={GROCERY_CART_ICON}
						resizeMode='contain'
					/>
					<View style={myStyle.badge}>
						<Text style={myStyle?.cartTextStyle}>{cart?.length}</Text>
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
				contentContainerStyle={
					productData?.length == 0 && {
						flexGrow: 1,
						paddingBottom: IS_IOS ? verticalScale(85) : verticalScale(70),
					}
				}
				ListHeaderComponent={HeaderComponent}
				renderItem={renderItem}
				ListEmptyComponent={() => (
					<Text
						style={{
							justifyContent: 'center',
							alignSelf: 'center',
							height: '100%',
							textAlignVertical: 'center',
						}}>
						No Data Found
					</Text>
				)}
				onEndReached={() => {
					if (!reachedEnd) {
						productData?.length > 0 &&
							page.current > 0 &&
							!pagination &&
							handelPagination();
					}
				}}
				onEndReachedThreshold={0.3}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={() => {
							handleRefresh();
						}}
					/>
				}
				ListFooterComponent={() =>
					loader ? (
						<ActivityIndicator
							style={[
								myStyle?.ListFooterComponentLoader,
								{
									paddingVertical: IS_IOS
										? verticalScale(15)
										: verticalScale(10),
								},
							]}
							size='small'
							color={myTheme?.colors?.secondary}
						/>
					) : (
						productData?.length > 0 &&
						pagination &&
						page.current > 0 && (
							<View
								style={[
									myStyle?.ListFooterComponent,
									{
										paddingVertical: IS_IOS
											? verticalScale(25)
											: verticalScale(15),
									},
								]}>
								<Text style={myStyle?.ListFooterComponentText}>
									{'No More Products'}
								</Text>
							</View>
						)
					)
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
			{loading && (
				<View style={myStyle.loaderContainer}>
					<ActivityIndicator
						size='large'
						color='#19B95C'
					/>
				</View>
			)}
		</MyView>
	);
}
