import React, { useContext } from 'react';
import { List as BaseList } from 'native-base';
import ListItem from './ListItem';
import { MediaContext } from '../contexts/MediaContext';
import { getAllMedia } from '../hooks/APIHooks';
import PropTypes from 'prop-types';

const List = (props) => {
  const [media, setMedia] = useContext(MediaContext);
  const [data, loading] = getAllMedia();
  setMedia(data);
  return (
    <BaseList
      dataArray={media}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <ListItem
        navigation={props.navigation}
        singleMedia={item}
        user={undefined}
      />}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object,
};

export default List;

/* END OF FILE */
