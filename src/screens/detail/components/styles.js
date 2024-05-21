/** @format */

import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import {
	FONTS_STYLE,
	DEVICE_WIDTH,
} from '../../../shared/themes/deviceInfo/index';

export const style = (myTheme) =>
	StyleSheet.create({
		container: {
			flex: 1,
		},
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
		paginationContainer: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			marginTop: moderateScale(10),
		},
		dot: {
			width: verticalScale(5),
			height: moderateScale(5),
			borderRadius: moderateScale(4),
			marginHorizontal: scale(5),
		},
		activeDot: {
			backgroundColor: myTheme?.colors?.secondary,
		},
	});
