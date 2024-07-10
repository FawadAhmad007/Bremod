/** @format */

import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { FONTS_STYLE } from '../../shared/themes/style/common';
import { DEVICE_WIDTH } from '../../shared/themes/deviceInfo/index';

export const style = (myTheme) =>
	StyleSheet.create({
		headingTextStyle: [
			FONTS_STYLE.TEXT_HEADING,
			{
				width: '70%',
				alignSelf: 'center',
				color: myTheme?.colors?.black,
				marginBottom: verticalScale(30),
				textAlign: 'center',
				includeFontPadding: false,
			},
		],
		container: {
			alignSelf: 'center',
			justifyContent: 'space-between',
			flexDirection: 'row',
			width: '90%',
		},

		touchableContainerStyle: {
			marginTop: moderateScale(5),
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
			marginBottom: moderateScale(40),
		},
		moreTextStyle: [
			FONTS_STYLE.TEXT_MEDIUM,
			{
				color: myTheme?.colors?.skyBlue,
				includeFontPadding: false,
			},
		],

		listContainer: {
			flexDirection: 'row',
			flexWrap: 'wrap',
			justifyContent: 'flex-start',
			padding: verticalScale(10),
			marginHorizontal: scale(19),
		},
		circle: {
			borderRadius: scale(25),
			margin: scale(4),
			justifyContent: 'center',
			alignItems: 'center',
			paddingHorizontal: moderateScale(10),
			paddingVertical: moderateScale(5),
		},
		selectedCircle: {
			borderWidth: scale(3),
			borderColor: myTheme?.colors?.secondary,
		},
		count: [
			{
				color: myTheme?.colors?.primary,
			},
			FONTS_STYLE.TEXT_MEDIUM,
		],
		item: {
			width: DEVICE_WIDTH,
			justifyContent: 'center',
			alignItems: 'center',
		},
		image: {
			width: DEVICE_WIDTH,
			marginVertical: scale(10),
			alignSelf: 'center',
			height: moderateScale(180),
			borderRadius: moderateScale(12),
		},
		counterRow: {
			flexDirection: 'row',
			gap: moderateScale(10),
			marginBottom: 5,
		},
		counterButton: {
			paddingLeft: moderateScale(10),
			paddingRight: moderateScale(10),
			backgroundColor: 'darkgrey',
			borderRadius: 4,
		},
		counterButtonText: {
			fontSize: 18,
			fontWeight: 'bold',
		},

		loaderContainer: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: myTheme?.colors?.primary, // Semi-transparent black background
		},

		counterText: {
			// marginHorizontal: 10,
			fontSize: 16,
			color: myTheme?.colors?.black,
		},
		counterButtonTextDisabled: {
			opacity: 0.5,
			pointerEvents: 'none',
		},
	});
