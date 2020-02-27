import React, { useState, useEffect } from 'react';
import {
  List as BaseList,
  Container,
  Spinner,
  Text,
} from 'native-base';
import ListItem from '../components/ListItem';
import { getAllUserMedia } from '../hooks/APIHooks';
import PropTypes from 'prop-types';

const MyFiles = (props) => {
  const user = props.navigation.state.params.user.userdata.user_id;
  const [media, setMedia] = useState({});
  const [data, loading] = getAllUserMedia();
  useEffect(()=> {
    setMedia(data);
  },[loading]);
  return (
    <Container>
      {data.length === 0 &&
        <Text>You have no files</Text>
      }
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
    </Container>
  );
};

MyFiles.propTypes = {
  navigation: PropTypes.object,
};

export default MyFiles;

/* END OF FILE */
