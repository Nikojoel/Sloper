import React, {useState, } from 'react';
import {
  Text,
  Button,
  Form,
  Body,
  Item,
  Container,
  Spinner,
  Badge, } from "native-base";
import {Image, Dimensions, StyleSheet, } from 'react-native';
import PropTypes from 'prop-types';
import FormTextInput from "../components/FormTextInput";
import useUploadForm from "../hooks/UploadHooks";
import * as ImagePicker from "expo-image-picker";

const Upload = (props) => {
  const {
    inputs,
    errors,
    setErrors,
    handleTextChange,
    handleTitleChange,
    validateInput,
    handleUpload,
    resetText,
  } = useUploadForm();

  const [image, setImage] = useState(null);
  const [exif, setExif] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      exif: true,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      setExif(result.exif);
      console.log(image);
      console.log(exif);
    }
  };

  const clearForms = () => {
    setImage(null);
    resetText("title", "");
    resetText("postText", "");
  };

  return (
    <Container>
      {!loading ? (
        <Form>
          <Item style={{borderColor: "transparent"}}>
            <Body>
              <Text style={{fontWeight: "bold", fontSize: 30,}}>Upload</Text>
            </Body>
          </Item>
          <Item style={{borderColor: "transparent"}}>
            <FormTextInput
              value={inputs.title}
              placeholder='Title'
              onChangeText={handleTitleChange}
              onEndEditing={() => {
                validateInput("title", inputs.title);
              }}
              error={errors.title}
            />
          </Item>
          <Item style={{borderColor: "transparent"}}>
            <FormTextInput
              value={inputs.postText}
              placeholder='Description'
              onChangeText={handleTextChange}
            />
          </Item>
          <Button primary dark onPress={pickImage}>
            <Body>
              <Text style={{color: "white"}}>Select</Text>
            </Body>
          </Button>
          <Form>
            <Button primary onPress={async () => {
              if (!image) {
                setErrors((errors) =>
                  ({
                    ...errors,
                    fetch: "Choose an image before uploading"
                  }));
              } else {
                setLoading(true);
                setErrors((errors) =>
                  ({
                    ...errors,
                    fetch: undefined,
                  }));
                await handleUpload(image, exif, 'sloperTEST');
                props.navigation.replace("Home");
              }
            }}>
              <Body>
                <Text style={{color: "white"}}>Upload</Text>
              </Body>
            </Button>
            <Button danger onPress={clearForms}>
              <Body>
                <Text style={{color: "white"}}>Delete</Text>
              </Body>
            </Button>
          </Form>
          {image &&
          <Item>
            <Body>
              <Text style={{fontWeight: "bold", fontSize: 30,}}>Selected image</Text>
              <Image source={{uri: image}} style={styles.image}/>
            </Body>
          </Item>
          }
        </Form>
      ) : (<Spinner size="large" color="#0000ff" style={{top: "40%"}}/>)}
      {errors.fetch &&
          <Body>
            <Badge><Text>{errors.fetch}</Text></Badge>
          </Body>
      }
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width * 0.85,
    height: Dimensions.get("window").width * 0.85,
  },
});
// proptypes here
Upload.propTypes = {
  navigation: PropTypes.object,
};
export default Upload;

/* END OF FILE */
