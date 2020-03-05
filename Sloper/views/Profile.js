import React, {useEffect, useState, useContext} from 'react';
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
import {AsyncStorage, BackHandler} from 'react-native';
import PropTypes from 'prop-types';
import AsyncImage from '../components/AsyncImage';
import {Dimensions} from 'react-native';
import {UserContext} from '../contexts/UserContext';
import BackHeader from '../components/BackHeader';

const deviceHeight = Dimensions.get('window').height;

const skillLevel = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
];

const Profile = (props) => {
  const [{user}, setUser] = useContext(UserContext);
  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
  };
  console.log(user);
  return (
    <Container>
      <BackHeader navigation={props.navigation}/>
      <Content>
        <Card>
          <CardItem bordered>
            <Icon name='ios-person' style={{fontSize: 30,}}/>
            <Text style={{fontSize: 16}}>Username: {user.username}</Text>
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
          <CardItem bordered>
            <Icon name='ios-document' style={{fontSize: 30}}/>
            <Body>
              <Text style={{fontSize: 16}}>Full Name: {user.full_name}</Text>
              <Text style={{fontSize: 16}}>Email: {user.email}</Text>
              <Text style={{fontSize: 16}}>Skill Level: {skillLevel[user.skill]}</Text>
            </Body>
          </CardItem>
          <Body>
            <CardItem footer bordered>
              <Button primary rounded iconLeft style={{marginRight: 10}} onPress={() => {
                props.navigation.navigate('MyFiles')
              }}>
                <Icon name='ios-list'/>
                <Text>My posts</Text>
              </Button>
              <Button warning rounded iconLeft onPress={() => props.navigation.navigate('UpdateUser')}>
                <Icon name='ios-cog'/>
                <Text>Edit</Text>
              </Button>
              <Button danger rounded iconLeft style={{marginLeft: 10}} onPress={signOutAsync}>
                <Icon name='ios-exit'/>
                <Text>Logout</Text>
              </Button>
            </CardItem>
          </Body>
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
