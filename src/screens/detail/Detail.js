/** @format */

import {
	View,
	Text,
	Image,
	ScrollView,
	TouchableOpacity,
	Linking,
} from 'react-native';
import React from 'react';
import { MyView } from '../../shared/themes/style/common';
import { useTheme } from '@react-navigation/native';
import { style } from './styles';
import {
	CATEGORY,
	DESCRIPTION,
	NAME,
	OUR_PRODUCTS,
	PRICE,
	ADD_CART,
} from '../../shared/constants';
import { PLACEHOLDER_IMAGE, BACK_ICON, CART_ICON } from '../../assets';
import DetailItem from './components/DetailItem';
import ReadMore from 'react-native-read-more-text';
import { goBack } from '../../shared/services';

export default function Detail() {
	const myTheme = useTheme();
	const myStyle = style(myTheme);

	const renderTruncatedFooter = (handlePress) => {
		return (
			<Text
				style={myStyle?.moreTextStyle}
				onPress={handlePress}>
				Read more
			</Text>
		);
	};

	const renderRevealedFooter = (handlePress) => {
		return (
			<Text
				style={myStyle?.moreTextStyle}
				onPress={handlePress}>
				Show less
			</Text>
		);
	};
	const openWhatsApp = () => {
		const phoneNumber = '1234567890';
		const message = 'Hello%20World';
		const url = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
		console.log('here');
		Linking.canOpenURL(url)
			.then((canOpen) => {
				console.log(canOpen);
				if (canOpen) {
					return Linking.openURL(url);
				} else {
					// WhatsApp is not installed, redirect to the app store
					const storeUrl = Platform.select({
						ios: 'https://apps.apple.com/app/whatsapp/id310633997',
						android:
							'https://play.google.com/store/apps/details?id=com.whatsapp',
					});

					return Linking.openURL(storeUrl);
				}
			})
			.catch((e) => {
				console.log('Error opening WhatsApp', e);
			});
	};
	return (
		<MyView>
			<ScrollView>
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
						{OUR_PRODUCTS}
					</Text>
					<View style={myStyle?.rightIcon} />
				</View>
				<Image
					style={myStyle?.coverImageStyle}
					source={PLACEHOLDER_IMAGE}
					resizeMode='cover'
				/>
				<View style={myStyle.detailViewStyle}>
					<DetailItem
						heading={NAME}
						text={'Product'}
					/>
					<DetailItem
						heading={CATEGORY}
						text={'Category1, Category2, Category3'}
					/>
					<DetailItem
						heading={PRICE}
						text={'00.00'}
					/>
					<View style={myStyle?.detailView}>
						<Text style={myStyle?.detailHeadingStyle}>{DESCRIPTION}:</Text>
						<ReadMore
							numberOfLines={8}
							renderTruncatedFooter={renderTruncatedFooter}
							renderRevealedFooter={renderRevealedFooter}>
							<Text style={myStyle?.itemTextStyle}>
								Lorem Ipsum is simply dummy text of the printing and typesetting
								industry. Lorem Ipsum has been the industry's standard dummy
								text ever since the 1500s, when an unknown printer took a galley
								of type and scrambled it to make a type specimen book. It has
								survived not only five centuries, but also the leap into
								electronic typesetting, remaining essentially unchanged. It was
								popularised in the 1960s with the release of Letraset sheets
								containing Lorem Ipsum passages, and more recently with desktop
								publishing software like Aldus PageMaker including versions of
								Lorem Ipsum.
							</Text>
						</ReadMore>
					</View>
				</View>
			</ScrollView>
			<TouchableOpacity
				onPress={openWhatsApp}
				style={myStyle?.buttonStyle}>
				<Image
					style={myStyle?.categoryIconStyle}
					source={CART_ICON}
					resizeMode='contain'
				/>
				<Text
					numberOfLines={1}
					style={myStyle?.buttonTextStyle}>
					{ADD_CART}
				</Text>
			</TouchableOpacity>
		</MyView>
	);
}
