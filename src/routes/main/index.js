import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "../../shared/services";
import {
  HOME_ENUM,
  CATEGORY_ENUM,
  DETAIL_ENUM,
  CART_ENUM,
  CUSTOMER_ENUM,
  SPLASH_ENUM,
} from "../../shared/constants";
import { Home, Category, Detail, Cart, CustomerDetails, SplashScreen } from "../../screens";
import { DEFAULT_THEME } from "../../shared/themes/style/themes";

const Stack = createNativeStackNavigator();

export default function Routes() {
  const appTheme = DEFAULT_THEME;

  return (
    <NavigationContainer theme={appTheme} ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "ios",
        }}
      >
        <Stack.Screen name={SPLASH_ENUM} component={SplashScreen} />
        <Stack.Screen name={HOME_ENUM} component={Home} />
        <Stack.Screen name={CATEGORY_ENUM} component={Category} />
        <Stack.Screen name={DETAIL_ENUM} component={Detail} />
        <Stack.Screen name={CART_ENUM} component={Cart} />
        <Stack.Screen name={CUSTOMER_ENUM} component={CustomerDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
