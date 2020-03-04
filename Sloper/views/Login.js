import React, {useState, useContext} from 'react';
import {
  Container,
  Body,
  Title,
  Content,
  Form,
  Button,
  Text,
  Item,
  H2,
  Card,
  CardItem,
} from 'native-base';
import {AsyncStorage, Dimensions, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {fetchAPI} from '../hooks/APIHooks';
import FormTextInput from '../components/FormTextInput';
import useSignUpForm from '../hooks/LoginHooks';
import {Video} from 'expo-av';
import {loginConstraints} from '../constraints/Constraints';
import {formStyles, loginStyles} from '../styles/Style';
import {UserContext} from '../contexts/UserContext';


const Login = (props) => {
  const [user, setUser] = useContext(UserContext);
  const [toggleForm, setToggleForm] = useState(true);
  const {
    handleUsernameChange,
    handlePasswordChange,
    handleEmailChange,
    handleFullnameChange,
    handleConfirmPasswordChange,
    validateField,
    validateOnSend,
    checkAvail,
    inputs,
    errors,
    setErrors,
  } = useSignUpForm(loginConstraints);

  const validationProperties = {
    username: {username: inputs.username},
    email: {email: inputs.email},
    full_name: {full_name: inputs.full_name},
    password: {password: inputs.password},
    confirmPassword: {
      password: inputs.password,
      confirmPassword: inputs.confirmPassword,
    },
  };

  const signInAsync = async () => {
    try {
      const mediaURL = 'http://media.mw.metropolia.fi/wbma/uploads/';
      const placeHolder = 'https://placekitten.com/1024/1024';
      const user = await fetchAPI(
        'POST',
        'login',
        undefined,
        undefined,
        inputs,
      );
      await AsyncStorage.setItem('userToken', user.token);

      try {
        const avatarPic = await fetchAPI(
          'GET',
          'tags',
          'sloper_avatar_' + user.user.user_id,
        );
        console.log(avatarPic);
        let avPic = '';
        if (avatarPic.length === 0 || avatarPic === placeHolder) {
          // if avatar is not set or
          avPic = placeHolder;
        } else {
          avPic = mediaURL + avatarPic[avatarPic.length - 1].filename;
        }
        user.user.avatar = avPic;
      } catch (e) {
        console.log('setting profile picture error ', e);
      }
      try {
        const result = await fetchAPI('GET', 'tags', 'sloper_skill_'+ user.user.user_id);
        console.log('skill',await result);
        let skill = "";
        if (result.length === 0) {
          skill = 0
        } else {
          skill = result[result.length - 1].description
        }
        user.user.skill = skill;
      } catch (e) {
        console.log('setting skilllevel error ', e)
      }

      await AsyncStorage.setItem('user', JSON.stringify(user));
      await setUser(user);

      props.navigation.navigate('App');
    } catch (e) {
      console.log('signInAsync error: ' + e.message);
      setErrors((errors) => ({
        ...errors,
        fetch: e.message,
      }));
    }
  };

  const registerAsync = async () => {
    const regValid = validateOnSend(validationProperties);
    console.log('reg field errors', errors);
    if (!regValid) {
      return;
    }
    try {
      const user = inputs;
      delete user.confirmPassword;
      const result = await fetchAPI(
        'POST',
        'users',
        undefined,
        undefined,
        user,
      );
      signInAsync();
    } catch (e) {
      console.log('registerAsync error: ', e.message);
      setErrors((errors) => ({
        ...errors,
        fetch: e.message,
      }));
    }
  };

  return (
    <Container>
      <Video
        source={require('../public/media/loginVideo.mp4')}
        style={loginStyles.backgroundVideo}
        rate={1.0}
        volume={1.0}
        isMuted={true}
        resizeMode="cover"
        shouldPlay
        isLooping
        onError={(e) => {
          console.log('video error', e);
        }}
      />
      <Content style={loginStyles.content}>
        {toggleForm && (
          <Form>
            <Body>
              <Text style={loginStyles.title}>
                The night is dark and full of terror, be a sloper and make no
                error
              </Text>
            </Body>
            <Body>
              <Item style={loginStyles.form}>
                <FormTextInput
                  style={formStyles.border}
                  autoCapitalize="none"
                  value={inputs.username}
                  placeholder="Username"
                  onChangeText={handleUsernameChange}
                />
              </Item>
              <Item style={loginStyles.form}>
                <FormTextInput
                  style={formStyles.border}
                  autoCapitalize="none"
                  value={inputs.password}
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={handlePasswordChange}
                />
              </Item>
            </Body>
            <Body>
              <Button
                style={loginStyles.signInOrRegister}
                rounded
                onPress={signInAsync}
              >
                <Text>Sign in</Text>
              </Button>
              <Button
                style={loginStyles.buttonText}
                rounded
                onPress={() => {
                  setToggleForm(false);
                }}
              >
                <Text>Not registered? Create an account</Text>
              </Button>
            </Body>
          </Form>
        )}
        {!toggleForm && (
          <Form>
            <Body>
              <Text style={loginStyles.title}>Become a sloper</Text>
              <Item style={loginStyles.form}>
                <FormTextInput
                  style={formStyles.border}
                  autoCapitalize="none"
                  value={inputs.username}
                  placeholder="Username"
                  onChangeText={handleUsernameChange}
                  onEndEditing={() => {
                    checkAvail();
                    validateField(validationProperties.username);
                  }}
                  error={errors.username}
                />
              </Item>
              <Item style={loginStyles.form}>
                <FormTextInput
                  style={formStyles.border}
                  autoCapitalize="none"
                  value={inputs.email}
                  placeholder="Email"
                  onChangeText={handleEmailChange}
                  onEndEditing={() => {
                    validateField(validationProperties.email);
                  }}
                  error={errors.email}
                />
              </Item>
              <Item style={loginStyles.form}>
                <FormTextInput
                  style={formStyles.border}
                  autoCapitalize="none"
                  value={inputs.full_name}
                  placeholder="Full name"
                  onChangeText={handleFullnameChange}
                  onEndEditing={() => {
                    validateField(validationProperties.full_name);
                  }}
                  error={errors.full_name}
                />
              </Item>
              <Item style={loginStyles.form}>
                <FormTextInput
                  style={formStyles.border}
                  autoCapitalize="none"
                  value={inputs.password}
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={handlePasswordChange}
                  onEndEditing={() => {
                    validateField(validationProperties.password);
                  }}
                  error={errors.password}
                />
              </Item>
              <Item style={loginStyles.form}>
                <FormTextInput
                  style={formStyles.border}
                  autoCapitalize="none"
                  value={inputs.confirmPassword}
                  placeholder="Confirm password"
                  secureTextEntry={true}
                  onChangeText={handleConfirmPasswordChange}
                  onEndEditing={() => {
                    validateField(validationProperties.confirmPassword);
                  }}
                  error={errors.confirmPassword}
                />
              </Item>
            </Body>
            <Body>
              <Button
                style={loginStyles.signInOrRegister}
                rounded
                onPress={registerAsync}
              >
                <Text>Register</Text>
              </Button>
              <Button
                rounded
                style={loginStyles.buttonText}
                onPress={() => {
                  setToggleForm(true);
                }}
              >
                <Text>Already registered? Sign in here</Text>
              </Button>
            </Body>
          </Form>
        )}
        {errors.fetch && (
          <Card>
            <CardItem>
              <Body>
                <Text>{errors.fetch}</Text>
              </Body>
            </CardItem>
          </Card>
        )}
      </Content>
    </Container>
  );
};

// proptypes here
Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;

/* END OF FILE */
