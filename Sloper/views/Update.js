import React, {useState, useEffect} from 'react';
import {
  Text,
  Button,
  Form,
  Body,
  Item,
  Container,
  Card,
  CardItem,
  Icon,
} from 'native-base';
import {Image, Dimensions, StyleSheet} from 'react-native';
import FormTextInput from '../components/FormTextInput';
import useUploadForm from '../hooks/UploadHooks';
import {updatePost} from '../hooks/APIHooks';
import {NavigationActions, StackActions} from 'react-navigation';
import {uploadConstraints} from '../constraints/Constraints';
import BackHeader from "../components/BackHeader";

const Update = (props) => {
  const {
    inputs,
    errors,
    handleTextChange,
    handleTitleChange,
    validateInput,
  } = useUploadForm(uploadConstraints);

  const [image, setImage] = useState(undefined);

  useEffect(() => {
    setImage('http://media.mw.metropolia.fi/wbma/uploads/' + props.navigation.state.params.filename);
  }, []);

  const updateMedia = async () => {
    const regValid = validateInput('title', inputs.title);
    if (!regValid) {
      await updatePost(props.navigation.state.params, {
        title: inputs.title,
        description: inputs.postText,
      });
      props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({routeName: 'Home'})],
          }),
      );
    }
  };

  return (
    <Container>
      <BackHeader navigation={props.navigation}/>
      <Form>
        <Card>
          <CardItem bordered>
            <Item style={{borderColor: 'transparent'}}>
              <FormTextInput
                style={{borderRadius: 25, borderStyle: 'solid', borderWidth: 1}}
                value={inputs.title}
                placeholder='New title'
                onChangeText={handleTitleChange}
                onEndEditing={() => {
                  validateInput('title', inputs.title);
                }}
                error={errors.title}
              />
            </Item>
          </CardItem>
          <CardItem bordered>
            <Item style={{borderColor: 'transparent'}}>
              <FormTextInput
                style={{borderRadius: 25, borderStyle: 'solid', borderWidth: 1}}
                value={inputs.postText}
                placeholder='New description'
                onChangeText={handleTextChange}
              />
            </Item>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Button full warning rounded iconLeft onPress={updateMedia}>
                <Icon name={'ios-cloud-upload'}/>
                <Text>Update</Text>
              </Button>
            </Body>
          </CardItem>
          <CardItem bordered style={{marginLeft: 10}}>
            <Body>
              <Image source={{uri: image}} style={{width: styles.image.width, height: styles.image.height}}/>
            </Body>
          </CardItem>
        </Card>
      </Form>
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width * 0.85,
    height: Dimensions.get('window').width * 0.85,
  },
});

export default Update;
