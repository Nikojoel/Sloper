import React, { useState, useEffect } from 'react';
import {
  List as BaseList,
  Container,
  Spinner,
  Text,
  Footer,
  Icon,
  Button,
  FooterTab,
} from 'native-base';
import ListItem from '../components/ListItem';
import { getAllUserMedia } from '../hooks/APIHooks';
import PropTypes from 'prop-types';

const MyFiles = (props) => {
  const user = props.navigation.state.params.user.userdata.user_id;
  const [media, setMedia] = useState({});
  if (props.navigation.state.routeName === "MyFiles") {
    console.log("moi");
  }
  const [data, loading] = getAllUserMedia();
  useEffect(()=> {
    setMedia(data);
  },[loading]);
  return (
    <Container>
      {!loading ? (
        <BaseList
        dataArray={media}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <ListItem
          navigation={props.navigation}
          singleMedia={item}
          user={user}
        />}
      />
      ) : (<Spinner size="large" color="#0000ff" style={{top: "40%"}}/>)}
      <Footer>
        <FooterTab>
          <Button vertical light>
            <Icon name="person"/>
            <Text>My Files</Text>
          </Button>
          <Button vertical light>
            <Icon name="heart" />
            <Text>My Favourites</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

MyFiles.propTypes = {
  navigation: PropTypes.object,
};

export default MyFiles;

/* END OF FILE */
