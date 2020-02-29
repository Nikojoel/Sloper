import React, { useEffect, useState, useContext } from 'react';
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
import AsyncImage from '../components/AsyncImage';
import { Dimensions } from 'react-native';
import { UserContext} from '../contexts/UserContext';

const deviceHeight = Dimensions.get('window').height;

const Profile = (props) => {
  const [{user}, setUser] = useContext(UserContext);

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
            <Text>Username: {user.username}</Text>
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
              <Text>Fullname: {user.full_name}</Text>
              <Text numberOfLines={1}>email: {user.email}</Text>
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
