import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from '../../shared/services';
import {HOME, DETAIL, CATEGORY} from '../../shared/constants';
import {Home, Category, Detail} from '../../screens';
import {DEFAULT_THEME} from '../../shared/themes/style/themes';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const appTheme = DEFAULT_THEME;

  return (
    <NavigationContainer theme={appTheme} ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name={HOME} component={Home} />
        <Stack.Screen name={CATEGORY} component={Category} />
        <Stack.Screen name={DETAIL} component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
