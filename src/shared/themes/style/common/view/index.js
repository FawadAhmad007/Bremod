/** @format */

import { SafeAreaView, StatusBar } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { IS_IOS } from '../../../deviceInfo';

export function MyView(props) {
	const myTheme = useTheme();
	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: myTheme?.colors?.primary }}>
			<StatusBar
				barStyle={IS_IOS ? 'dark-content' : 'light-content'}
				backgroundColor={myTheme?.colors?.secondary}
			/>
			{props.children}
		</SafeAreaView>
	);
}
