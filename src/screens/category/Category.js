/** @format */

import {
	View,
	Text,
	Image,
	FlatList,
	ActivityIndicator,
	TouchableOpacity,
	ToastAndroid,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { MyView } from '../../shared/themes/style/common';
import { useTheme } from '@react-navigation/native';
import { style } from './styles';
import { CATEGORY } from '../../shared/constants';
import { BACK_ICON } from '../../assets';
import { goBack } from '../../shared/services';
import CategoryList from './component/index';
import { useSelector } from 'react-redux';
import { getListForDiscount } from '../../shared/services/FetchIntercepter/request';
import DiscountBar from '../home/components/discountBar';
import { isDiscountValid } from '../../shared/utils/index'; // Import the utility function
import { IS_IOS } from '../../shared/themes/deviceInfo/index';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export default function Category({ route }) {
	const myTheme = useTheme();
	const myStyle = style(myTheme);
	const categoryData = useSelector((state) => state?.root?.bremod?.category);
	const [showBar, setShowBar] = useState(false);
	const [loading, setLoading] = useState(false); // Loading state
	const [discountDetails, setDiscountDetails] = useState({
		message: '',
		date: '',
		value: null,
	});

	useEffect(() => {
		setLoading(true);
		getDiscount();
	}, []);

	const getDiscount = async () => {
		try {
			const res = await getListForDiscount();
			if (res?.status === 200) {
				setLoading(false);
				const discount = res?.data[0]?.end_at; // Adjust as per your data structure
				const showDiscountBar = isDiscountValid(discount);
				setDiscountDetails({
					message: res?.data[0]?.message,
					date: res?.data[0]?.end_at,
					value: res?.data[0]?.discount_percentage || 0,
				});
				setShowBar(showDiscountBar);
			} else if (res?.message == 'Network Error') {
				setLoading(false);
				ToastAndroid.show("Network Error", ToastAndroid.SHORT);
		
			} else {
				setLoading(false);
				// Toast.show({
				// 	type: 'error',
				// 	text1: res?.error,
				// 	visibilityTime: 2000,
				// });
			}
		} catch (error) {
			setLoading(false);
			ToastAndroid.show(error, ToastAndroid.SHORT);
	
		}
	};

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

	if (loading) {
		return (
			<View style={myStyle.loaderContainer}>
				<ActivityIndicator
					size='large'
					color='#19B95C'
				/>
			</View>
		);
	}

	return (
		<MyView>
			{showBar && <DiscountBar message={discountDetails?.message} />}

			<View
				style={[
					myStyle?.container,

					{
						marginTop: !showBar ? moderateScale(10) : moderateScale(2),
					},
				]}>
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
				contentContainerStyle={
					categoryData?.length == 0 && {
						flexGrow: 1,
						paddingBottom: IS_IOS ? verticalScale(85) : verticalScale(70),
					}
				}
				renderItem={renderItem}
				ListEmptyComponent={() => (
					<Text
						style={{
							justifyContent: 'center',
							alignSelf: 'center',
							textAlignVertical: 'center',
							height: '100%',
							color: myTheme?.colors?.black,
						}}>
						No Category Found
					</Text>
				)}
				ItemSeparatorComponent={<View style={myStyle?.lineStyle} />}
			/>
		</MyView>
	);
}
