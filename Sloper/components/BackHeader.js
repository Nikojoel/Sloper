import React, {useContext} from "react";
import {Image} from 'react-native';
import {
  Header,
  Left,
  Button,
  Body,
  Right,
  Icon,} from "native-base";
import {UserContext} from '../contexts/UserContext';
import {headerStyles} from "../styles/Style";

// Custom header, replaces the standard navigation header
const BackHeader = ({navigation, title}) => {
  // Hook
  const [{user}] = useContext(UserContext);

  // Custom header components
  return (
    <Header style={{backgroundColor: 'white'}} androidStatusBarColor="#424242">
      <Left>
        <Button transparent onPress={() => {
          navigation.goBack()
        }}>
          <Icon style={headerStyles.headerArrow} name="arrow-back"/>
        </Button>
      </Left>
      <Body>
        <Image style={headerStyles.headerLogo} source={require('../public/media/sloper.png')}/>
      </Body>
      <Right>
        <Button transparent onPress={() => {
          navigation.navigate('Profile')
        }}>
          <Image
            style={headerStyles.headerImage}
            source={{uri: user.avatar}}
          />
        </Button>
      </Right>
    </Header>
  );
};

export default BackHeader;

/* END OF FILE */
