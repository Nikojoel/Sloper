import React, { useContext, useEffect, useState } from "react";
import {Image} from 'react-native'
import {
  Container,
  Text,
  Button,
  Item,
  List as BaseList,
  Spinner,
  Header,
  Icon,
  Input,
  Right

} from "native-base";
import ListItem from "./ListItem";
import { MediaContext } from "../contexts/MediaContext";
import { listStyles } from "../styles/Style";
import { SearchBar } from "react-native-elements";
import { getAllMedia } from "../hooks/APIHooks";
import PropTypes from "prop-types";
import useSearchForm from "../hooks/SearchHooks";
import {UserContext} from "../contexts/UserContext";

const List = props => {
  const [media, setMedia] = useContext(MediaContext);
  const [{user}] = useContext(UserContext);
  const [searchResult, setSearchResult] = useState();
  const [data, loading] = getAllMedia();
  useEffect(() => {
    setMedia(data);
  }, [loading]);

  const { inputs, handleSearchChange } = useSearchForm();

  const handleSearch = async text => {
    const result = [...media.filter(i => i.title.match(new RegExp(text, "i")))];
    setSearchResult(result);
  };

  const dataPicker = () => {
    if (searchResult) return searchResult;
    return media;
  };

  return (
    <Container style={listStyles.baseList}>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search"
          onChangeText={t => {
            handleSearchChange(t);
            handleSearch(t);
          }}
          value={inputs.search} />
          <Icon name="ios-people" />
        </Item>
     </Header>
      {!loading ? (
        <BaseList
          dataArray={dataPicker()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ListItem
              navigation={props.navigation}
              singleMedia={item}
              user={undefined}
            />
          )}
        />
      ) : (
        <Spinner size="large" color="#0000ff" style={{ top: "40%" }} />
      )}
    </Container>
  );
};

List.propTypes = {
  navigation: PropTypes.object
};

export default List;

/* END OF FILE */
