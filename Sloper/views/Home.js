import React, {useState,} from 'react';
import List from '../components/List';
import PropTypes from 'prop-types';
import {Container, Text, Button} from "native-base";
import { SearchBar } from 'react-native-elements';
import {getAllMedia} from "../hooks/APIHooks";
import useSearchForm from "../hooks/SearchHooks";

const Home = (props) => {
  const {navigation} = props;
  const [data, loading] = getAllMedia();
  const {
    inputs,
    handleSearchChange
  } = useSearchForm();

  console.log(inputs.search);
  return (
      <Container>
        <SearchBar
          placeholder="Search for posts"
          onChangeText={handleSearchChange}
          value={inputs.search}
        />
        <Button onPress={async () => {
          // Hardcoded button to try out filtering
          // TODO: Search for posts using title as a parameter
        }}><Text>Search</Text>

        </Button>
        <List navigation={navigation}/>
      </Container>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
