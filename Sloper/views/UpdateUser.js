import React, {useState} from 'react';
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


const UpdateUser = ({navigation}) => {
  const {userdata} = navigation.state.params
  console.log(userdata)
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
    const regValid = validateOnSend(validationProperties);
    const token =  await AsyncStorage.getItem('userToken');
    console.log('reg field errors', errors);
    if (!regValid) {
      return;
    }
    try {
      const user = inputs;
      delete user.confirmPassword;
      const result = await fetchPUT('users',token = token, formBody = JSON.stringify(user));
      console.log(await result);
   } catch (e) {
      console.log('registerAsync error: ', e.message);
      setErrors((errors) =>
        ({
          ...errors,
          fetch: e.message,
        }));
    }
  };
  console.log(avatarPic)

  return (
    <Container>
    <Content padder>
      <Form>
        <Item>
        <Label>Username:</Label>
        <Input
          placeholder={userdata.username}
          onChangeText={handleUsernameChange}
        />
        </Item>
        <Item>
        <Label>Email</Label>
        <Input
          placeholder={userdata.email}
          onChangeText={handleUsernameChange}
        />
        </Item>
        <Item>
          <Button onPress={pickImage}><Text>select image</Text></Button>
          {avatarPic && <Image source={{uri: avatarPic}} style={styles.image}></Image>}
        </Item>
        <Item>
          <Button><Text>Update profile</Text></Button>
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
