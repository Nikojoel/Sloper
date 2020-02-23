import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

const bootstrapAsync = async (props) => {
  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    props.navigation.navigate(userToken ? 'App' : 'Auth');
  };
  useEffect(() => {
    getToken();
  }, []);
};

const AuthLoading = (props) => {
  bootstrapAsync(props);
  return (
    <View>
      <ActivityIndicator/>
      <StatusBar barStyle="default"/>
    </View>
  );
};

AuthLoading.propTypes = {
  navigation: PropTypes.object,
};

export default AuthLoading;

/* END OF FILE */
