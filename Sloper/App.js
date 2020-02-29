import React, { useState, useEffect } from "react";
import { MediaProvider } from "./contexts/MediaContext";
import { UserProvider } from "./contexts/UserContext";
import Navigator from "./navigators/Navigator";
import * as Expo from "expo";
import * as Font from "expo-font";

const App = () => {
  const [fontReady, setFontReady] = useState(false);
  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    setFontReady(true);
  };
  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontReady) {
    console.log("Waiting for fonts...");
    return <Expo.AppLoading />;
  }
  return (
    <MediaProvider>
      <UserProvider>
        <Navigator />
      </UserProvider>
    </MediaProvider>
  );
};

export default App;

/* END OF FILE */
