import React, {useState,} from 'react';
import {
  Text,
  Button,
  Form,
  Body,
  Item,
  Container,
  Spinner,
  Badge,
  Left,
  Card,
  CardItem,
  Icon,
} from "native-base";
import {Image, Dimensions, StyleSheet, BackHandler,} from 'react-native';
import PropTypes from 'prop-types';
import FormTextInput from "../components/FormTextInput";
import useUploadForm from "../hooks/UploadHooks";
import * as ImagePicker from "expo-image-picker";
import {uploadConstraints} from '../constraints/Constraints';
import BackHeader from '../components/BackHeader';
import {apiKey} from "../API";

const geoApi = "https://api.opencagedata.com/geocode/v1/json?q=";

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
  } = useUploadForm(uploadConstraints);

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

  const uploadImage = async () => {
    const regValid = validateInput("title", inputs.title);
    if (!image) {
      setErrors((errors) =>
        ({
          ...errors,
          fetch: "Choose an image before uploading",
        }));
    }
    if (!regValid && image) {
      setLoading(true);
      setErrors((errors) =>
        ({
          ...errors,
          fetch: undefined,
        }));

      let city = undefined;
      try {
        const result = await fetch(geoApi + exif.GPSLatitude + "+" + exif.GPSLongitude + "&key=" + apiKey);
        const response = await result.json();
        const components = response.results[0].components;

        if (components.town !== undefined || null) {
          city = components.town;
        } else if (components.city !== undefined || null) {
          city = components.city;
        }
      } catch (e) {
        console.log("geo api error", e);
        setExif(undefined);
      }
      let resultData = undefined;
      if (exif !== undefined) {
        resultData = {
          GPSLatitude: exif.GPSLatitude,
          GPSLongitude: exif.GPSLongitude,
          GPSAltitude: exif.GPSAltitude,
          location: city,
        };
      }
      await handleUpload(image, resultData, 'sloperTESTV2');
      props.navigation.replace("Home");
    }
  };

  return (
    <Container>
      <BackHeader title="Upload" navigation={props.navigation}/>
      {!loading ? (
        <Body>
          <Form>
            <Card>
              <CardItem bordered>
                <Item style={{borderColor: "transparent"}}>
                  <FormTextInput
                    style={{borderRadius: 25, borderStyle: 'solid', borderWidth: 1,}}
                    value={inputs.title}
                    placeholder='Title'
                    onChangeText={handleTitleChange}
                    onEndEditing={() => {
                      validateInput("title", inputs.title);
                    }}
                    error={errors.title}
                  />
                </Item>
              </CardItem>
              <CardItem bordered>
                <Item style={{borderColor: "transparent"}}>
                  <FormTextInput
                    style={{borderRadius: 25, borderStyle: 'solid', borderWidth: 1,}}
                    value={inputs.postText}
                    placeholder='Description'
                    onChangeText={handleTextChange}
                  />
                </Item>
              </CardItem>
              <CardItem bordered>
                <Left>
                  <Button primary rounded iconLeft onPress={pickImage}>
                    <Icon name={"ios-image"}/>
                    <Text>Select</Text>
                  </Button>
                  <Button warning rounded iconLeft onPress={uploadImage}>
                    <Icon name={"ios-cloud-upload"}/>
                    <Text>Upload</Text>
                  </Button>
                  {image &&
                  <Button danger rounded iconLeft onPress={clearForms}>
                    <Icon name={"ios-trash"}/>
                    <Text>Delete</Text>
                  </Button>
                  }
                </Left>
              </CardItem>
              {errors.fetch &&
              <Body>
                <Badge><Text>{errors.fetch}</Text></Badge>
              </Body>
              }
              {image &&
              <CardItem bordered style={{marginLeft: 10}}>
                <Body>
                  <Image source={{uri: image}} style={{width: styles.image.width, height: styles.image.height}}/>
                </Body>
              </CardItem>
              }
            </Card>
          </Form>
        </Body>
      ) : (<Spinner size="large" color="#0000ff" style={{top: "40%"}}/>)}
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
