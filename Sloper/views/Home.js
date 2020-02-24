import React from 'react';
import List from '../components/List';
import PropTypes from 'prop-types';
import Exif from "react-native-exif";

const Home = (props) => {
  const {navigation} = props;
  try {
    Exif.getExif('../public/media/IMG_0042.jpg')
      .then(msg => console.warn('OK: ' + JSON.stringify(msg)))
      .catch(msg => console.warn('ERROR: ' + msg))
  } catch (e) {
    console.log(e);
  }
  return (
      <List navigation={navigation}></List>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
