import React, { useState } from 'react';
import { View, Image } from 'react-native';
import {Spinner} from 'native-base';
import PropTypes from 'prop-types';
import {aSyncImageStyles} from "../styles/Style";

const AsyncImage = (props) => {
  const [loaded, setLoaded] = useState(false);
  const onLoad = () => {
    setLoaded(true);
  };
  const {
    style,
    spinnerColor,
    source,
  } = props;

  return (
    <View style={[
      style, {
        flex: 1,
      }]}>
      <Image
        source={source}
        resizeMode={'contain'}
        style={aSyncImageStyles.image}
        onLoad={onLoad}/>
      {!loaded &&
      <View style={aSyncImageStyles.view}>
        <Spinner color={spinnerColor}/>
      </View>
      }
    </View>
  );
};

AsyncImage.propTypes = {
  spinnerColor: PropTypes.string,
  style: PropTypes.object,
  source: PropTypes.object,
};

export default AsyncImage;

/* END OF FILE */
