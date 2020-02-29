import React, {useState, useEffect } from 'react';
import {Text, Button, Form, Body, Item, Container, Label, Right, } from "native-base";
import {Image, Dimensions, StyleSheet, ActivityIndicator} from 'react-native';
import FormTextInput from "../components/FormTextInput";
import useUploadForm from "../hooks/UploadHooks";
import {updatePost} from "../hooks/APIHooks";

const Update = (props) => {
  const {
    inputs,
    handleTextChange,
    handleTitleChange,
    validateInput,
  } = useUploadForm();

  const [image, setImage] = useState(null);
  useEffect(() => {
    setImage("http://media.mw.metropolia.fi/wbma/uploads/" + props.navigation.state.params.filename);
  },[]);

  console.log(props.navigation.state);
  return (
    <Container>
        <Form>
          <Item style={{borderColor: "transparent"}}>
            <FormTextInput
              value={inputs.title}
              placeholder='New title'
              onChangeText={handleTitleChange}
              onEndEditing={() => validateInput("title", inputs.title)}
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
              await updatePost({
                file_id: props.navigation.state.params.file_id,
                data: {
                  title: inputs.title,
                  description: inputs.postText,
                }
              });
              props.navigation.navigate("MyFiles", props.navigation.state.params.user_id);
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
