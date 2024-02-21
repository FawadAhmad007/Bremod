import React from "react";
import Routes from "./routes";
import SplashScreen from "react-native-splash-screen";

const App = () => {
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);
  return <Routes />;
};

export default App;
