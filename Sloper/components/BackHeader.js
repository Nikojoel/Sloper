import React, {useContext} from "react";
import {Image} from 'react-native';
import { Header, Left, Button, Body, Right, Icon, Title } from "native-base";
import { UserContext } from '../contexts/UserContext';

const BackHeader = ({navigation, title}) => {
  const [{user}] = useContext(UserContext);

  return (
    <Header>
      <Left>
        <Button transparent onPress={()=>{navigation.goBack()} }>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body>
        <Image source={require('../public/media/sloper.png')}></Image>
      </Body>
      <Right>
        <Button transparent onPress={()=> {navigation.navigate('Profile')}}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 40
                }}

                source={{uri: user.avatar}}
              />
        </Button>
      </Right>
    </Header>
  );
};

export default BackHeader;
