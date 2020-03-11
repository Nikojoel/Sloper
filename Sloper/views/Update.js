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
import {Image} from 'react-native';
import FormTextInput from '../components/FormTextInput';
import useUploadForm from '../hooks/UploadHooks';
import {updatePost} from '../hooks/APIHooks';
import {NavigationActions, StackActions} from 'react-navigation';
import {uploadConstraints} from '../constraints/Constraints';
import BackHeader from "../components/BackHeader";
import {updateStyles} from "../styles/Style";

const Update = (props) => {
  // FormTextInput handlers
  const {
    inputs,
    errors,
    handleTextChange,
    handleTitleChange,
    validateInput,
  } = useUploadForm(uploadConstraints);

  // Hooks
  const [image, setImage] = useState(undefined);
  useEffect(() => {
    setImage('http://media.mw.metropolia.fi/wbma/uploads/' + props.navigation.state.params.filename);
  }, []);

  // Updates specific media file with new title and description
  const updateMedia = async () => {
    const regValid = validateInput('title', inputs.title);
    if (!regValid) {
      // Sends data to be formatted
      await updatePost(props.navigation.state.params, {
        title: inputs.title,
        description: inputs.postText,
      });
      // Resets the stack from navigator and navigates back to home
      props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({routeName: 'Home'})],
        }),
      );
    }
  };

  // Update view components
  return (
    <Container>
      <BackHeader navigation={props.navigation}/>
      <Form>
        <Card>
          <CardItem bordered>
            <Item style={{borderColor: 'transparent'}}>
              <FormTextInput
                style={updateStyles.formTextInput}
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
                style={updateStyles.formTextInput}
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
          <CardItem bordered style={updateStyles.imageMargin}>
            <Body>
              <Image source={{uri: image}} style={updateStyles.imageSize}/>
            </Body>
          </CardItem>
        </Card>
      </Form>
    </Container>
  );
};

export default Update;

/* END OF FILE */
