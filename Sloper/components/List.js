import React, {useContext, useEffect, useState} from 'react';
import {Container, Item, List as BaseList, Spinner,} from 'native-base';
import ListItem from './ListItem';
import {MediaContext} from '../contexts/MediaContext';
import {getAllMedia} from '../hooks/APIHooks';
import PropTypes from 'prop-types';

const List = (props) => {
  const [media, setMedia] = useContext(MediaContext);
  let [data, loading] = getAllMedia();
  useEffect(() => {
    const sortedData = [...data].sort()
    setMedia(data);
  }, [loading]);


  return (
    <Container>
      {!loading ? (
        <BaseList
          dataArray={media}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <ListItem
            navigation={props.navigation}
            singleMedia={item}
            user={undefined}


          />}
        />
      ) : (<Spinner size="large" color="#0000ff" style={{top: "40%"}}/>)}
    </Container>
  );
};

List.propTypes = {
  navigation: PropTypes.object,
};

export default List;

/* END OF FILE */
