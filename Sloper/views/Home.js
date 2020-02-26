import React from 'react';
import List from '../components/List';
import PropTypes from 'prop-types';

const Home = (props) => {
  const {navigation} = props;
  return (
      <List navigation={navigation}/>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
