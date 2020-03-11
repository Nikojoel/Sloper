import React, {useState, useEffect, useContext} from "react";
import {
  AsyncStorage,
  Image,
  Slider,
  Alert
} from "react-native";
import {
  Form,
  Container,
  Content,
  Item,
  Icon,
  Text,
  Button,
  Label,
  Card,
  CardItem,
  Body,
  Left
} from "native-base";
import useUploadForm from "../hooks/UploadHooks";
import useSignUpForm from "../hooks/LoginHooks";
import FormTextInput from "../components/FormTextInput";
import * as ImagePicker from "expo-image-picker";
import {fetchAPI, uploadImage} from "../hooks/APIHooks";
import {loginConstraints} from "../constraints/Constraints";
import {UserContext} from "../contexts/UserContext";
import BackHeader from "../components/BackHeader";
import {updateUserStyles} from "../styles/Style";

const UpdateUser = ({navigation}) => {
  const skillLevel = ["Beginner", "Intermediate", "Advanced", "Expert"];

  // Hooks
  const [{user, token}, setUser] = useContext(UserContext);
  const {handleUpload} = useUploadForm();
  const [skillState, setSkill] = useState(skillLevel[user.skill]);
  const [skillNumber, setSkillNumber] = useState(user.skill);

  // FormTextInput handlers
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

  // Set current user data
  useEffect(() => {
    setInputs({
      username: user.username,
      email: user.email
    });
  }, []);

  // Used to validate user input
  const validationProperties = {
    username: {username: inputs.username},
    email: {email: inputs.email},
    password: {password: inputs.password},
    confirmPassword: {
      password: inputs.password,
      confirmPassword: inputs.confirmPassword
    }
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
    // useState setter if an image was chosen
    if (!result.cancelled) {
      setAvatarPic(result.uri);
    }
  };

  // Sends an API call to update user data
  const updateProfileAsync = async () => {
    // Check username
    await checkAvail();
    const regValid = validateOnSend(validationProperties);
    if (!regValid) {
      return;
    }
    // Try to update user data
    try {
      const update = {
        username: inputs.username,
        email: inputs.email,
        password: inputs.password
      };
      const token = await AsyncStorage.getItem("userToken");
      if (avatarPic !== undefined) {
        // Send avatar picture to be set to correct file format
        await handleUpload(
          avatarPic,
          undefined,
          "sloper_avatar_" + user.user_id
        );
      }
      const formData = new FormData();
      formData.append("file", {
        uri: "https://placekitten.com/1024/1024",
        name: "placeholder.jpg",
        type: "image/jpeg"
      });
      formData.append("description", skillNumber);
      await uploadImage(formData, "sloper_skill_" + user.user_id);
      await fetchAPI("PUT", "users", undefined, token, update); // API call to update user data
      await AsyncStorage.clear(); // Remove token and user from AsyncStorage
      navigation.navigate("AuthLoading"); // Navigate to Login
    } catch (e) {
      console.log("registerAsync error: ", e.message);
      // Set error badges
      setErrors(errors => ({
        ...errors,
        fetch: e.message
      }));
    }
  };

  // UpdateUser view components
  return (
    <Container>
      <BackHeader navigation={navigation}/>
      <Content padder>
        <Form>
          <CardItem bordered>
            <Item style={updateUserStyles.border}>
              <Icon name={"ios-person"} style={updateUserStyles.iconSize}/>
              <FormTextInput
                placeholder={user.username}
                style={updateUserStyles.input}
                onChangeText={handleUsernameChange}
                onEndEditing={() => {
                  // Check if user is not updating its username
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
            <Item style={updateUserStyles.border}>
              <Icon name={"ios-mail"} style={updateUserStyles.iconSize}/>
              <FormTextInput
                placeholder={user.email}
                style={updateUserStyles.input}
                onChangeText={handleEmailChange}
                onEndEditing={() => {
                  validateField(validationProperties.email);
                }}
                error={errors.email}
              />
            </Item>
          </CardItem>
          <CardItem bordered>
            <Item style={updateUserStyles.border}>
              <Icon name={"ios-lock"} style={updateUserStyles.iconSize}/>
              <FormTextInput
                placeholder="Password"
                style={updateUserStyles.input}
                secureTextEntry={true}
                onChangeText={handlePasswordChange}
                onEndEditing={() => {
                  validateField(validationProperties.password);
                }}
                error={errors.password}
              />
            </Item>
          </CardItem>
          <CardItem bordered>
            <Item style={updateUserStyles.border}>
              <Icon name={"ios-lock"} style={updateUserStyles.iconSize}/>
              <FormTextInput
                placeholder="Confirm password"
                style={updateUserStyles.input}
                secureTextEntry={true}
                onChangeText={handleConfirmPasswordChange}
                onEndEditing={() => {
                  validateField(validationProperties.confirmPassword);
                }}
                error={errors.confirmPassword}
              />
            </Item>
          </CardItem>
          <Body>
            <Label>{skillState}</Label>
          </Body>
          <CardItem>
            <Icon name={"ios-podium"} style={updateUserStyles.iconSize}/>
            <Slider
              style={updateUserStyles.slider}
              value={parseInt(user.skill)}
              minimumValue={0}
              maximumValue={3}
              minimumTrackTintColor="red"
              maximumTrackTintColor="blue"
              onSlidingComplete={value => {
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
            <Item style={updateUserStyles.border}/>
          </CardItem>
          <CardItem bordered>
            <Left>
              <Button primary rounded iconLeft onPress={pickImage}>
                <Icon name={"ios-image"}/>
                <Text>Select</Text>
              </Button>
              <Button
                warning
                rounded
                iconLeft
                onPress={() => {
                  Alert.alert(
                    "Are you sure?",
                    "After updating you will be redirected to login page and have to sign in again.",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel pressed")
                      },
                      {
                        text: "OK",
                        onPress: async () => {
                          console.log("OK pressed");
                          await updateProfileAsync();
                        }
                      }
                    ],
                    {cancelable: false}
                  );
                }}
              >
                <Icon name={"ios-cloud-upload"}/>
                <Text>Update</Text>
              </Button>
            </Left>
            {avatarPic && (
              <Image source={{uri: avatarPic}} style={updateUserStyles.image}/>
            )}
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

export default UpdateUser;

/* END OF FILE */
