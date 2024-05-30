import React from "react";
import Routes from "./routes";
import SplashScreen from "react-native-splash-screen";
import { IS_ANDROID } from "./shared/themes/deviceInfo";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./shared/redux/store";
import Toast from 'react-native-toast-message';

const App = () => {
  React.useEffect(() => {
    if (IS_ANDROID)
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000);
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
        <Toast />
      </PersistGate>
    </Provider>
  );
};

export default App;
