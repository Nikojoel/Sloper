import React, {useState, useEffect } from 'react';
import {Text, Button, Form, Body, Item, Container, Label, Right, } from "native-base";
import {Image, Dimensions, StyleSheet, ActivityIndicator} from 'react-native';
import FormTextInput from "../components/FormTextInput";
import useUploadForm from "../hooks/UploadHooks";
import {updatePost} from "../hooks/APIHooks";

const Update = (props) => {
  const {
    inputs,
    valid,
    handleTextChange,
    handleTitleChange,
    validateInput,
  } = useUploadForm();

  const [image, setImage] = useState(null);
  useEffect(() => {
    setImage("http://media.mw.metropolia.fi/wbma/uploads/" + props.navigation.state.params.filename);
  },[]);
  console.log(props.navigation.state.params);
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      {!loading ? (
        <Form>
          <Item style={{borderColor: "transparent"}}>
            <FormTextInput
              value={inputs.title}
              placeholder='title'
              onChangeText={handleTitleChange}
              onEndEditing={() => validateInput("title", inputs.title)}
            />

            {valid.title &&
            <Label style={{color: "red"}}>{valid.title}</Label>
            }
          </Item>
          <Item style={{borderColor: "transparent"}}>

            <FormTextInput
              value={inputs.postText}
              placeholder='text'
              onChangeText={handleTextChange}
            />

          </Item>
          {!valid.title && image &&
          <Form>
            <Button warning onPress={async () => {
              setLoading(true);
              props.navigation.replace("Home");
            }}>
              <Body>
                <Text style={{color: "white"}}>Update</Text>
              </Body>
            </Button>
          </Form>
          }
          {image &&
          <Item>
            <Body>
              <Image source={{uri: image}} style={styles.image}/>
            </Body>
          </Item>
          }
        </Form>
      ) : (<ActivityIndicator size="large" color="#0000ff"/>)}
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
