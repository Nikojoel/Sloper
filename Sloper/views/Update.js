import React, {useState, useEffect} from 'react';
import {Text, Button, Form, Body, Item, Container,} from "native-base";
import {Image, Dimensions, StyleSheet,} from 'react-native';
import FormTextInput from "../components/FormTextInput";
import useUploadForm from "../hooks/UploadHooks";
import {updatePost} from "../hooks/APIHooks";
import {NavigationActions, StackActions} from "react-navigation";
import {uploadConstraints} from '../constraints/Constraints';

const Update = (props) => {
  const {
    inputs,
    errors,
    handleTextChange,
    handleTitleChange,
    validateInput,
  } = useUploadForm(uploadConstraints);

  const [image, setImage] = useState(null);
  useEffect(() => {
    setImage("http://media.mw.metropolia.fi/wbma/uploads/" + props.navigation.state.params.filename);
  }, []);

  return (
    <Container>
      <Form>
        <Item style={{borderColor: "transparent"}}>
          <FormTextInput
            value={inputs.title}
            placeholder='New title'
            onChangeText={handleTitleChange}
            onEndEditing={() => validateInput("title", inputs.title)}
            error={errors.title}
          />
        </Item>
        <Item style={{borderColor: "transparent"}}>
          <FormTextInput
            value={inputs.postText}
            placeholder='New text'
            onChangeText={handleTextChange}
          />
        </Item>
        <Form>
          <Button warning onPress={async () => {
            const regValid = validateInput("title", inputs.title);
            if (!regValid) {
              await updatePost(props.navigation.state.params, {
                title: inputs.title,
                description: inputs.postText,
              });
              props.navigation.dispatch(
                StackActions.reset({
                  index: 0,
                  key: null,
                  actions: [NavigationActions.navigate({routeName: "Home"})]
                })
              );
            }
          }}>
            <Body>
              <Text style={{color: "white"}}>Update</Text>
            </Body>
          </Button>
        </Form>
        <Item>
          <Body>
            <Image source={{uri: image}} style={styles.image}/>
          </Body>
        </Item>
      </Form>
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width * 0.85,
    height: Dimensions.get("window").width * 0.85,
  },
});

export default Update;
