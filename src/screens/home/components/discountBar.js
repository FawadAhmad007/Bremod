/** @format */

import React from 'react';
import { View } from 'react-native';
import { style } from './styles';
import { useTheme } from '@react-navigation/native';
import TextTicker from 'react-native-text-ticker';
import { FONTS_STYLE } from '../../../shared/themes/style/common/fonts';

const DiscountBar = ({ message }) => {
	const myTheme = useTheme();
	const myStyle = style(myTheme);
	return (
		<View style={myStyle.discountBarContainer}>
			<TextTicker
				style={[
					{
						color: myTheme?.colors?.black,
						justifyContent: 'center',
					},
					FONTS_STYLE?.HEADING_MEDIUM,
				]}
				duration={20000}
				loop
				bounce={false}
				scroll={true}
				animationType='scroll'
				repeatSpacer={500}
				marqueeDelay={500}>
				{message}
			</TextTicker>
		</View>
	);
};

export default DiscountBar;
