import React from 'react';
import List from '../components/List';
import PropTypes from 'prop-types';


const Home = (props) => {
  const {navigation} = props;
  /*try {
    Exif.getExif('/images.jpg')
      .then(msg => console.log('OK: ' + JSON.stringify(msg)))
      .catch(msg => console.log('ERROR: ' + msg))
  } catch (e) {
    console.log('errorrrrr', e);
  }*/
  return (
      <List navigation={navigation}></List>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
