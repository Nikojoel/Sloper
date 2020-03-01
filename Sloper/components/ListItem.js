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
} from 'native-base';
import PropTypes from 'prop-types';
import nearbyCities from "nearby-big-cities";

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
    <BaseListItem thumbnail>
      <Left>
        <Thumbnail
          square
          source={{uri: mediaURL + props.singleMedia.thumbnails.w160}}
        />
        {city &&
        <Text>Taken near {city}</Text>

        }
      </Left>
      <Body>
        <H3 numberOfLines={1}>{props.singleMedia.title}</H3>
        <Text numberOfLines={1}>{description}</Text>
        <Icon name="heart"/>
        <Text>{props.singleMedia.favCount}</Text>
        <Icon name="star"/>
        {isNaN(props.singleMedia.rating) ? (
          <Text>0</Text>
        ) : (
          <Text>{props.singleMedia.rating.toFixed(1)}/5</Text>
        )}
      </Body>
      <Right>
        <Button onPress={() => {
          props.navigation.push('Single', {file: props.singleMedia, user: props.user});
        }
        }>
          <Text>View</Text>
        </Button>
      </Right>
    </BaseListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;

/* END OF FILE */
