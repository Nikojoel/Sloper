import React, {useState, useEffect} from 'react';
import {
  List as BaseList,
  Container,
  Spinner,
  Text,
  Footer,
  Icon,
  Button,
  FooterTab,
  H3,
} from 'native-base';
import ListItem from '../components/ListItem';
import {getAllUserMedia} from '../hooks/APIHooks';
import PropTypes from 'prop-types';

const MyFiles = (props) => {
  const user = props.navigation.state.params.user.userdata.user_id;
  const [media, setMedia] = useState({});
  const [data, loading] = getAllUserMedia();
  const [toggle, setToggle] = useState({});

  useEffect(() => {
    setMedia(data);
    setToggle(true);
  }, [loading]);

  const changeMedia = () => {
    if (!toggle) {
      setMedia(data);
      setToggle(true);
    } else {
      setMedia(data.favourites);
      setToggle(false);
    }
  };

  return (
    <Container>
      {!loading ? (
        <Container>
        <BaseList
          dataArray={media}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <ListItem
            navigation={props.navigation}
            singleMedia={item}
            user={user}
          />}
        />
          <Footer >
            <FooterTab>
              <Button vertical light onPress={() => {
                changeMedia();
              }}>
                <Icon name="person"/>
                <Text>My Files</Text>
              </Button>
              <Button vertical light onPress={() => {
                changeMedia();
              }}>
                <Icon name="heart"/>
                <Text>My Favourites</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      ) : (<Spinner size="large" color="#0000ff" style={{top: "40%"}}/>)}
    </Container>
  );
};

MyFiles.propTypes = {
  navigation: PropTypes.object,
};

export default MyFiles;

/* END OF FILE */
