import React, { useEffect, useContext } from "react";
import { ActivityIndicator, AsyncStorage, StatusBar, View } from "react-native";
import PropTypes from "prop-types";
import { UserContext } from "../contexts/UserContext";

const bootstrapAsync = async props => {
  const [user, setUser] = useContext(UserContext);
  const getToken = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    if (userToken) {
      const userFromAsync = await AsyncStorage.getItem("user");
      const user = await JSON.parse(userFromAsync);
      await setUser(user);
      await props.navigation.navigate("App");
    } else {
      props.navigation.navigate("Auth");
    }
  };
  useEffect(() => {
    getToken();
  }, []);
};

const AuthLoading = props => {
  bootstrapAsync(props);
  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

AuthLoading.propTypes = {
  navigation: PropTypes.object
};

export default AuthLoading;

/* END OF FILE */
