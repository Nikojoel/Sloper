import React, {useState, useEffect} from 'react';
import {
  ListItem as BaseListItem,
  Left,
  Body,
  Right,
  Button,
  Text,
  Thumbnail,
  H3,
  Label,
  Icon,
  Card,
  CardItem,
} from 'native-base';
import PropTypes from 'prop-types';
import nearbyCities from 'nearby-big-cities';
import AsyncImage from '../components/AsyncImage';
import {TouchableOpacity} from 'react-native';
import {listStyles} from '../styles/Style';

const mediaURL = 'http://media.mw.metropolia.fi/wbma/uploads/';

const ListItem = (props) => {
  const [city, setCity] = useState(undefined);
  const allData = JSON.parse(props.singleMedia.description);
  const description = allData.description;
  const exif = allData.exif;

  let temp = '';
  if (exif === undefined || exif.GPSLatitude === undefined || exif.GPSLatitude === null) {
    temp = undefined;
  } else {
    const query = {latitude: exif.GPSLatitude, longitude: exif.GPSLongitude};
    const cities = nearbyCities(query);
    temp = cities[0].name;
  }

  useEffect(() => {
    setCity(temp);
  }, []);

  return (
    <BaseListItem style={listStyles.baseList}>
      <Card>
        <TouchableOpacity onPress={() => {
          props.navigation.push('Single', {file: props.singleMedia, user: props.user});
        }
        }>
          <CardItem style={listStyles.cardStyle}>
            <AsyncImage style={listStyles.asyncImage}
                        source={{uri: mediaURL + props.singleMedia.thumbnails.w160}}
            />
          </CardItem>
        </TouchableOpacity>
        <Body>
          <H3 numberOfLines={1}>{props.singleMedia.title}</H3>
          <Text numberOfLines={1}>{description}</Text>
        </Body>
        <CardItem>
          <Left>
            <Icon name="heart"/>
            <Text>{props.singleMedia.favCount}</Text>
          </Left>
          <Body>
            <CardItem>
              <Icon name="star"/>
              {isNaN(props.singleMedia.rating) ? (
                <Text>0</Text>
              ) : (
                <Text>{props.singleMedia.rating.toFixed(1)}/5</Text>
              )}
            </CardItem>
          </Body>
          <Left>
            {city &&
            <Icon name="locate"/>
            }
              <Text>{city}</Text>
          </Left>
        </CardItem>
      </Card>
    </BaseListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;

/* END OF FILE */
