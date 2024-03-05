import React from "react";
import Routes from "./routes";
import SplashScreen from "react-native-splash-screen";
import { IS_ANDROID } from "./shared/themes/deviceInfo";

const App = () => {
  React.useEffect(() => {
    if (IS_ANDROID)
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000);
  }, []);
  return <Routes />;
};

export default App;
