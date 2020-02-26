import React, { useEffect, useState } from 'react';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Button,
  Icon,
} from 'native-base';
import { AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { fetchGET } from '../hooks/APIHooks';
import AsyncImage from '../components/AsyncImage';
import { Dimensions } from 'react-native';

const deviceHeight = Dimensions.get('window').height;

const mediaURL = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Profile = (props) => {
  const [user, setUser] = useState({
    userdata: {},
    avatar: 'https://',
  });
  const userToState = async () => {
    try {
      const userFromStorage = await AsyncStorage.getItem('user');
      const uData = JSON.parse(userFromStorage);
      const avatarPic = await fetchGET('tags', 'sloper_avatar_' + uData.user_id);
      let avPic = '';
      if (avatarPic.length === 0) { // if avatar is not set
        avPic = 'https://placekitten.com/1024/1024';
      } else {
        avPic = mediaURL + avatarPic[avatarPic.length -1].filename;
      }
      setUser((user) => (
        {
          userdata: uData,
          avatar: avPic,
        }));
    } catch (e) {
      console.log('Profile error: ', e.message);
    }
  };

  useEffect(() => {
    userToState();
  }, []);

  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
  };

   return (
    <Container>
      <Content>
        <Card>
          <CardItem header bordered>
            <Icon name='person'/>
            <Text>Username: {user.userdata.username}</Text>
          </CardItem>
          <CardItem>
            <Body>
              <AsyncImage
                style={{
                  width: '100%',
                  height: deviceHeight / 2,
                }}
                spinnerColor='#777'
                source={{uri: user.avatar}}
              />
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Fullname: {user.userdata.full_name}</Text>
              <Text numberOfLines={1}>email: {user.userdata.email}</Text>
            </Body>
          </CardItem>
          <CardItem footer bordered>
              <Button primary rounded onPress={() => {
                props.navigation.navigate('MyFiles', {user: user})}}>
                <Text>My posts</Text>
              </Button>
              <Button danger rounded onPress={signOutAsync}>
                <Text>Logout</Text>
              </Button>
              <Button primary rounded onPress={() => props.navigation.navigate('UpdateUser', user)}>
                <Text>Edit</Text>
              </Button>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;

/* END OF FILE */
