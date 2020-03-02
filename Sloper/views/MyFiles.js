import React, {useState, useEffect, useContext} from 'react';
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
  Tab,
  Tabs,
  TabHeading,
} from 'native-base';
import ListItem from '../components/ListItem';
import {getAllUserMedia} from '../hooks/APIHooks';
import PropTypes from 'prop-types';
import {UserContext} from '../contexts/UserContext';
import {listStyles} from '../styles/Style';


const MyFiles = (props) => {
  const [{user}, setUser] = useContext(UserContext);
  const [media, setMedia] = useState({});
  const [data, loading] = getAllUserMedia();

  useEffect(() => {
    setMedia(data);
  }, [loading]);

  return (
    <Container>
      {!loading ? (
        <Container style={listStyles.baseList}>
          <BaseList
            dataArray={media}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <ListItem
              navigation={props.navigation}
              singleMedia={item}
              user={user.user_id}
            />}
          />
          <Footer>
            <Footer hasTabs/>
            <Tabs onChangeTab={(from) => {
              if (from.i === 0) {
                setMedia(data);
              } else if (from.i === 1) {
                setMedia(data.favourites);
              }
            }}>
              <Tab heading={
                <TabHeading style={{backgroundColor: 'red'}}>
                  <Icon name="person"/>
                  <Text>My Files</Text>
                </TabHeading>}>
              </Tab>
              <Tab heading={
                <TabHeading style={{backgroundColor: 'red'}}>
                  <Icon name="heart"/>
                  <Text>My Favourites</Text>
                </TabHeading>}>
              </Tab>
            </Tabs>
          </Footer>
        </Container>
      ) : (<Spinner size="large" color="#0000ff" style={{top: '40%'}}/>)}
    </Container>
  );
};

MyFiles.propTypes = {
  navigation: PropTypes.object,
};

export default MyFiles;

/* END OF FILE */
