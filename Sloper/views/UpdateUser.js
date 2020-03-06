import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  AsyncStorage,
  Image,
  Dimensions,
  Slider,
} from "react-native";

import {
  Form,
  Container,
  Content,
  Item,
  Input,
  Picker,
  Icon,
  Textarea,
  Text,
  H3,
  Button,
  Label,
  Card,
  CardItem,
  Body,
  Left,
} from 'native-base'
import useUploadForm from '../hooks/UploadHooks'
import useSignUpForm from '../hooks/LoginHooks'
import FormTextInput from '../components/FormTextInput';
import * as ImagePicker from "expo-image-picker";
import {fetchAPI, uploadImage} from '../hooks/APIHooks'
import {loginConstraints} from '../constraints/Constraints'
import { UserContext } from '../contexts/UserContext';
import BackHeader from "../components/BackHeader";

const UpdateUser = ({navigation}) => {
  const skillLevel = [
    "Beginner",
    "Intermediate",
    "Advanced",
    "Expert",
  ];
  const [{user, token}, setUser] = useContext(UserContext);
  const { handleUpload } = useUploadForm();
  const [skillState, setSkill] = useState(skillLevel[user.skill]);
  const [skillNumber, setSkillNumber] = useState({});

  const {
    handleUsernameChange,
    handlePasswordChange,
    handleEmailChange,
    handleConfirmPasswordChange,
    validateField,
    validateOnSend,
    checkAvail,
    inputs,
    errors,
    setErrors,
    setInputs
  } = useSignUpForm(loginConstraints);

  useEffect(()=> {
    setInputs({
      username: user.username,
      email: user.email
    })
  },[]);

  const validationProperties = {
    username: {username: inputs.username},
    email: {email: inputs.email},
    password: {password: inputs.password},
    confirmPassword: {
      password: inputs.password,
      confirmPassword: inputs.confirmPassword,
    },
  };

  // Image picker from gallery
 const [avatarPic, setAvatarPic] = useState(undefined);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });
    if (!result.cancelled) {
      setAvatarPic(result.uri);
    }
  };

  const updateProfileAsync = async () => {
    const regValid = validateOnSend(validationProperties);

    if (!regValid) {
      console.log('not valid');
      return;
    }

    try {
      const update = {
        username: inputs.username,
        email: inputs.email,
        password: inputs.password,
      };
      const token =  await AsyncStorage.getItem('userToken');
      //delete user.confirmPassword;
      console.log('avatarpic', avatarPic  );
      if (avatarPic !== undefined) {
        await handleUpload(avatarPic, undefined, 'sloper_avatar_' + user.user_id)
      }
      const formData = new FormData();
      formData.append("file", {uri: "https://placekitten.com/1024/1024", name: "placeholder.jpg", type: "image/jpeg"});
      formData.append("description", skillNumber);
      await uploadImage(formData, 'sloper_skill_' + user.user_id);
      console.log(formData);
      await fetchAPI('PUT','users',undefined , token, update);
      await AsyncStorage.clear();
      navigation.navigate('AuthLoading');

   } catch (e) {
      console.log('registerAsync error: ', e.message);
      setErrors((errors) =>
        ({
          ...errors,
          fetch: e.message,
        }));
    }
  };
  console.log(user);
  return (
    <Container>
      <BackHeader navigation={navigation}/>
    <Content padder>
      <Form>
        <CardItem bordered>
        <Item style={{borderColor: "transparent"}}>
        <Icon name={"ios-person"} style={{fontSize: 30}}/>
        <FormTextInput
          placeholder={user.username}
          style={{borderRadius: 25, borderStyle: 'solid', borderWidth: 1,}}
          onChangeText={handleUsernameChange}
          onEndEditing={() => {
            if (user.username !== inputs.username) {
              checkAvail(inputs.username);
            }
            validateField(validationProperties.username);
          }}
          error={errors.username}
        />
        </Item>
        </CardItem>
        <CardItem bordered>
        <Item style={{borderColor: "transparent"}}>
        <Icon name={"ios-mail"} style={{fontSize: 30}}/>
        <FormTextInput
          placeholder={user.email}
          style={{borderRadius: 25, borderStyle: 'solid', borderWidth: 1,}}
          onChangeText={handleEmailChange}
          onEndEditing={() => {
            validateField(validationProperties.email)
          }}
          error={errors.email}
        />
        </Item>
        </CardItem>
        <CardItem bordered>
        <Item style={{borderColor: "transparent"}}>
        <Icon name={"ios-lock"} style={{fontSize: 30}}/>
        <FormTextInput
          placeholder='Password'
          style={{borderRadius: 25, borderStyle: 'solid', borderWidth: 1,}}
          secureTextEntry={true}
          onChangeText={handlePasswordChange}
          onEndEditing={() => {
            validateField(validationProperties.password)
          }}
          error={errors.password}
        />
        </Item>
        </CardItem>
        <CardItem bordered>
        <Item style={{borderColor: "transparent"}}>
        <Icon name={"ios-lock"} style={{fontSize: 30}}/>
        <FormTextInput
          placeholder='Confirm password'
          style={{borderRadius: 25, borderStyle: 'solid', borderWidth: 1,}}
          secureTextEntry={true}
          onChangeText={handleConfirmPasswordChange}
          onEndEditing={() => {
            validateField(validationProperties.confirmPassword)
          }}
          error={errors.confirmPassword}
        />
        </Item>
        </CardItem>
        <Body>
          <Label>{skillState}</Label>
        </Body>
        <CardItem>
          <Icon name={"ios-podium"} style={{fontSize: 30}}/>
          <Slider
            style={{width: 300, height: 40}}
            value={parseInt(user.skill)}
            minimumValue={0}
            maximumValue={3}
            minimumTrackTintColor="red"
            maximumTrackTintColor="blue"
            onSlidingComplete={(value) => {
              if (value % 1 < 0.5) {
                setSkill(skillLevel[Math.floor(value)]);
                setSkillNumber(Math.floor(value));
              } else {
                setSkill(skillLevel[Math.ceil(value)]);
                setSkillNumber(Math.ceil(value));
              }
            }}
          />
        </CardItem>
        <CardItem bordered>
          <Item style={{borderColor: "transparent"}}>
          </Item>
        </CardItem>
        <CardItem bordered>
          <Left>
          <Button primary rounded iconLeft onPress={pickImage}>
            <Icon name={"ios-image"}/>
            <Text>Select</Text>
          </Button>
          <Button warning rounded iconLeft onPress={async () => {
            await updateProfileAsync();
          }}>
            <Icon name={"ios-cloud-upload"}/>
            <Text>Update</Text>
          </Button>
          </Left>
          {avatarPic &&
          <Image source={{uri: avatarPic}} style={styles.image}/>
          }
        </CardItem>
       </Form>
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
  const styles = StyleSheet.create({
    image: {
      width: Dimensions.get("window").width * 0.15,
      height: Dimensions.get("window").width * 0.15,
    },
  });



export default UpdateUser;
