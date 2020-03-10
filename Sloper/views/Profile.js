import React, {useContext} from 'react';
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
import {AsyncStorage} from 'react-native';
import PropTypes from 'prop-types';
import AsyncImage from '../components/AsyncImage';
import {Dimensions} from 'react-native';
import {UserContext} from '../contexts/UserContext';
import BackHeader from '../components/BackHeader';
import {profileStyles} from "../styles/Style";

const deviceHeight = Dimensions.get('window').height;

// Skill level array
const skillLevel = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
];

const Profile = (props) => {
  const [{user}, setUser] = useContext(UserContext);

  // Removes token from AsyncStorage and logs the user out
  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
  };

  // Profile view components
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
                style={profileStyles.profilePic}
                spinnerColor='#777'
                source={{uri: user.avatar}}
              />
            </Body>
          </CardItem>
          <CardItem bordered>
            <Icon name='ios-document' style={profileStyles.profileIcon}/>
            <Body>
              <Text style={profileStyles.info}>Full Name: {user.full_name}</Text>
              <Text style={profileStyles.info}>Email: {user.email}</Text>
              <Text style={profileStyles.info}>Skill Level: {skillLevel[user.skill]}</Text>
            </Body>
          </CardItem>
          <Body>
            <CardItem footer bordered>
              <Button primary rounded iconLeft style={profileStyles.myPostsIcon} onPress={() => {
                props.navigation.navigate('MyFiles')
              }}>
                <Icon name='ios-list'/>
                <Text>My posts</Text>
              </Button>
              <Button warning rounded iconLeft onPress={() => props.navigation.navigate('UpdateUser')}>
                <Icon name='ios-cog'/>
                <Text>Edit</Text>
              </Button>
              <Button danger rounded iconLeft style={profileStyles.logoutIcon} onPress={signOutAsync}>
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
