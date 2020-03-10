import React, {useContext, useEffect, useState} from "react";
import {
  Container,
  Item,
  List as BaseList,
  Spinner,
  Header,
  Icon,
  Input,
} from "native-base";
import ListItem from "./ListItem";
import {MediaContext} from "../contexts/MediaContext";
import {listStyles} from "../styles/Style";
import {getAllMedia} from "../hooks/APIHooks";
import PropTypes from "prop-types";
import useSearchForm from "../hooks/SearchHooks";
import {UserContext} from "../contexts/UserContext";

// Custom List component
const List = props => {
  // Hooks
  const [media, setMedia] = useContext(MediaContext);
  const [{user}] = useContext(UserContext);
  const [searchResult, setSearchResult] = useState();
  const [data, loading] = getAllMedia();
  useEffect(() => {
    setMedia(data);
  }, [loading]);

  const {inputs, handleSearchChange} = useSearchForm();

  // Updates content after every character change
  const handleSearch = async text => {
    const result = [...media.filter(i => i.title.match(new RegExp(text, "i")))];
    setSearchResult(result);
  };

  // Returns the selected item
  const dataPicker = () => {
    if (searchResult) return searchResult;
    return media;
  };

  // List view components
  return (
    <Container style={listStyles.baseList}>
      <Header style={listStyles.headerBar} searchBar rounded>
        <Item style={listStyles.headerInput}>
          <Icon name="ios-search"/>
          <Input placeholder="Search"
                 onChangeText={t => {
                   handleSearchChange(t);
                   handleSearch(t);
                 }}
                 value={inputs.search}/>
        </Item>
      </Header>
      {!loading ? (
        <BaseList
          dataArray={dataPicker()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <ListItem
              navigation={props.navigation}
              singleMedia={item}
              user={undefined}
            />
          )}
        />
      ) : (
        <Spinner size="large" color="#0000ff" style={{top: "40%"}}/>
      )}
    </Container>
  );
};

List.propTypes = {
  navigation: PropTypes.object
};

export default List;

/* END OF FILE */
