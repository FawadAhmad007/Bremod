/** @format */

import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { FONTS_STYLE, DEVICE_WIDTH } from '../../shared/themes/style/common';
export const style = (myTheme) =>
	StyleSheet.create({
		headingTextStyle: [
			FONTS_STYLE.TEXT_HEADING,
			{
				width: '70%',
				alignSelf: 'center',
				color: myTheme?.colors?.black,
				marginVertical: verticalScale(30),
				textAlign: 'center',
				includeFontPadding: false,
			},
		],
		container: {
			alignSelf: 'center',
			alignItems: 'center',
			justifyContent: 'space-between',
			flexDirection: 'row',
			width: '90%',
		},
		touchableContainerStyle: {
			width: moderateScale(24),
			height: moderateScale(24),
		},
		leftIcon: {
			width: moderateScale(20),
			height: moderateScale(20),
		},
		rightIcon: {
			width: moderateScale(20),
			height: moderateScale(20),
		},
		buttonStyle: {
			backgroundColor: myTheme?.colors?.secondary,
			borderRadius: moderateScale(8),
			alignItems: 'center',
			justifyContent: 'center',
			includeFontPadding: false,
			position: 'absolute',
			bottom: verticalScale(30),
			right: scale(30),
			flexDirection: 'row',
			padding: moderateScale(12),
		},
		buttonTextStyle: [
			FONTS_STYLE?.TEXT_BOLD_SMALL,
			{ color: myTheme?.colors?.primary },
		],
		categoryIconStyle: {
			width: moderateScale(15),
			height: moderateScale(15),
			marginRight: moderateScale(5),
			tintColor: myTheme?.colors?.primary,
		},
		coverImageStyle: {
			width: '80%',
			marginVertical: scale(10),
			alignSelf: 'center',
			tintColor: myTheme?.color?.gray,
			height: moderateScale(180),
			borderRadius: moderateScale(12),
		},

		itemHeadingStyle: [
			FONTS_STYLE.HEADING_BOLD_MEDIUM,
			{
				width: '30%',
				color: myTheme?.colors?.black,
				includeFontPadding: false,
			},
		],
		itemTextStyle: [
			FONTS_STYLE.TEXT_MEDIUM,
			{
				width: '70%',
				color: myTheme?.colors?.gray,
				includeFontPadding: false,
				marginLeft: moderateScale(10),
			},
		],
		itemStyle: {
			marginVertical: verticalScale(2),
			flexDirection: 'row',
			alignSelf: 'center',
			width: '80%',
		},
		detailViewStyle: {
			marginVertical: verticalScale(5),
		},
		detailHeadingStyle: [
			FONTS_STYLE.HEADING_BOLD_MEDIUM,
			{
				color: myTheme?.colors?.black,
				includeFontPadding: false,
			},
		],
		detailView: {
			width: '80%',
			alignSelf: 'center',
			marginTop: verticalScale(10),
		},
		moreTextStyle: [
			FONTS_STYLE.TEXT_MEDIUM,
			{
				color: myTheme?.colors?.skyBlue,
				includeFontPadding: false,
			},
		],
	});
