import React from 'react';
import List from '../components/List';
import PropTypes from 'prop-types';
import {RefreshProvider} from '../contexts/RefreshContext'

const Home = (props) => {
  const {navigation} = props;
  return (
    <RefreshProvider>
      <List navigation={navigation}/>
    </RefreshProvider>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
