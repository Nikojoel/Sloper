import React, {useContext} from "react";
import {Image} from 'react-native';
import {Header, Left, Button, Body, Right, Icon, Title} from "native-base";
import {UserContext} from '../contexts/UserContext';
import {headerStyles} from "../styles/Style";

const BackHeader = ({navigation, title}) => {
  const [{user}] = useContext(UserContext);

  return (
    <Header style={{backgroundColor: 'white'}}>
      <Left>
        <Button transparent onPress={() => {
          navigation.goBack()
        }}>
          <Icon style={headerStyles.headerArrow} name="arrow-back"/>
        </Button>
      </Left>
      <Body>
        <Image style={headerStyles.headerLogo} source={require('../public/media/sloper.png')}></Image>
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
