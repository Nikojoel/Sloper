import React, {useState} from 'react';
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
import { AsyncStorage, Dimensions, StyleSheet, } from 'react-native';
import PropTypes from 'prop-types';
import { fetchPOST } from '../hooks/APIHooks';
import FormTextInput from '../components/FormTextInput';
import useSignUpForm from '../hooks/LoginHooks';
import { Video } from "expo-av";


const Login = (props) => {
  const styles = StyleSheet.create({
    backgroundVideo: {
      height: Dimensions.get("window").height,
      width: Dimensions.get("window").width,
      position: "absolute",
      top: 0,
      left: 0,
      alignItems: "stretch",
      bottom: 0,
      right: 0
    },
    content: {
      top: "30%"
    }
  });
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
  } = useSignUpForm();

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
      console.log(inputs);
      const user = await fetchPOST('login', inputs);
      console.log('Login', user);
      await AsyncStorage.setItem('userToken', user.token);
      await AsyncStorage.setItem('user', JSON.stringify(user.user));
      props.navigation.navigate('App');
    } catch (e) {
      console.log('signInAsync error: ' + e.message);
      setErrors((errors) =>
        ({
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
      console.log('sen inputs', inputs);
      const user = inputs;
      delete user.confirmPassword;
      const result = await fetchPOST('users', user);
      console.log('register', result);
      signInAsync();
    } catch (e) {
      console.log('registerAsync error: ', e.message);
      setErrors((errors) =>
        ({
          ...errors,
          fetch: e.message,
        }));
    }
  };


  return (
    <Container>
      <Video
        source={require("../public/media/backgroundVideo.mp4")}
        style={styles.backgroundVideo}
        rate={1.0}
        volume={1.0}
        isMuted={true}
        resizeMode="cover"
        shouldPlay
        isLooping
        onError={(e) => {console.log('video error', e)}}
      />
      <Content style={styles.content}>
        {toggleForm &&
        <Form>
          <Title>
           Login
          </Title>
          <Item>
            <FormTextInput
              autoCapitalize='none'
              value={inputs.username}
              placeholder='username'
              onChangeText={handleUsernameChange}
            />
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize='none'
              value={inputs.password}
              placeholder='password'
              secureTextEntry={true}
              onChangeText={handlePasswordChange}
            />
          </Item>
          <Body>
          <Button rounded onPress={signInAsync}><Text>Sign in!</Text></Button>
          <Button rounded dark onPress={() => {
            setToggleForm(false);
          }}>
            <Text>or Register</Text>
          </Button>
          </Body>
        </Form>
        }
        {!toggleForm &&
        <Form>
          <Title>
            Register
          </Title>
          <Item>
            <FormTextInput
              autoCapitalize='none'
              value={inputs.username}
              placeholder='username'
              onChangeText={handleUsernameChange}
              onEndEditing={() => {
                checkAvail();
                validateField(validationProperties.username);
              }}
              error={errors.username}
            />
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize='none'
              value={inputs.email}
              placeholder='email'
              onChangeText={handleEmailChange}
              onEndEditing={() => {
                validateField(validationProperties.email);
              }}
              error={errors.email}
            />
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize='none'
              value={inputs.full_name}
              placeholder='fullname'
              onChangeText={handleFullnameChange}
              onEndEditing={() => {
                validateField(validationProperties.full_name);
              }}
              error={errors.full_name}
            />
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize='none'
              value={inputs.password}
              placeholder='password'
              secureTextEntry={true}
              onChangeText={handlePasswordChange}
              onEndEditing={() => {
                validateField(validationProperties.password);
              }}
              error={errors.password}
            />
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize='none'
              value={inputs.confirmPassword}
              placeholder='confirm password'
              secureTextEntry={true}
              onChangeText={handleConfirmPasswordChange}
              onEndEditing={() => {
                validateField(validationProperties.confirmPassword);
              }}
              error={errors.confirmPassword}
            />
          </Item>
          <Body>
          <Button rounded onPress={registerAsync}>
            <Text>Register!</Text>
          </Button>
          <Button dark rounded onPress={() => {
            setToggleForm(true);
          }}>
            <Text>or Login</Text>
          </Button>
          </Body>
        </Form>
        }
        {errors.fetch &&
        <Card>
          <CardItem>
            <Body>
              <Text>{errors.fetch}</Text>
            </Body>
          </CardItem>
        </Card>
        }
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
