import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import {Form,
  Container,
  Content,
  Item,
  Input,
  Picker,
  Icon,
  Textarea,
  Text,
  H3,
  Button, Label} from 'native-base'
import useUploadForm from '../hooks/UploadHooks'
import useSignUpForm from '../hooks/LoginHooks'
import * as ImagePicker from "expo-image-picker";
import {fetchPUT} from '../hooks/APIHooks'
import updateConstraints from '../constraints/Constraints'


const UpdateUser = ({navigation}) => {
  const {userdata} = navigation.state.params
  const { handleUpload } = useUploadForm();
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
    setInputs

  } = useSignUpForm(updateConstraints);
  useEffect(()=> {
    setInputs({
      username: userdata.username,
      email: userdata.email,
      full_name: userdata.full_name
    })
  },[])

 const validationProperties = {
    username: {username: inputs.username},
    email: {email: inputs.email},
  };

  // Image picker from gallery
 const [avatarPic, setAvatarPic] = useState(undefined)
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });
    if (!result.cancelled) {
      setAvatarPic(result.uri);
    }
  };

  const updateProfileAsync = async () => {
    /*const regValid = validateOnSend(validationProperties);

    console.log('reg field errors', errors);
    if (!regValid) {
      return;
    }*/
    const token =  await AsyncStorage.getItem('userToken');
    try {
      const user = inputs;
      //delete user.confirmPassword;
      const result = await fetchPUT('users', token, user);
      console.log(await result);
      await AsyncStorage.clear()

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
    <Content padder>
      <Form>
        <Item>
        <Label>Username:</Label>
        <Input
          placeholder={inputs.username}
          onChangeText={handleUsernameChange}
        />
        </Item>
        <Item>
        <Label>Email</Label>
        <Input
          placeholder={userdata.email}
          onChangeText={handleEmailChange}
        />
        </Item>
        <Item>
          <Button onPress={pickImage}><Text>select image</Text></Button>
          {avatarPic && <Image source={{uri: avatarPic}} style={styles.image}></Image>}
        </Item>
        <Item>
          <Button onPress={async () => {
            await updateProfileAsync();
            navigation.navigate('AuthLoading');
          }}><Text>Update profile</Text></Button>
        </Item>
       </Form>
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
