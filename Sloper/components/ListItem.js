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
  View,
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
    temp = 'Unknown';
  } else {
    const query = {latitude: exif.GPSLatitude, longitude: exif.GPSLongitude};
    const cities = nearbyCities(query);
    temp = cities[0].name;
  }

  useEffect(() => {
    setCity(temp);
    console.log("exif: ", exif, "postTitle: ", props.singleMedia.title);
  }, []);

  return (
    <BaseListItem style={listStyles.baseList}>
      <Card style={listStyles.card}>
        <CardItem>
          <TouchableOpacity onPress={() => {
            props.navigation.push('Single', {file: props.singleMedia, user: props.user});
          }
          }>
            <H3 style={listStyles.listTitle} numberOfLines={1}>{props.singleMedia.title}</H3>

            <Thumbnail square style={listStyles.thumbNail}
                       source={{uri: mediaURL + props.singleMedia.thumbnails.w640}}
            />

          </TouchableOpacity>
          <Body style={listStyles.bodyMargin}>
            <TouchableOpacity onPress={() => {
              props.navigation.push('Single', {file: props.singleMedia, user: props.user});
            }
            }>
              <CardItem>
                <Icon style={listStyles.heartColor} name="heart"/>
                <Text>{props.singleMedia.favCount}</Text>
              </CardItem>
              <CardItem>
                <Icon style={listStyles.starColor} name="star"/>
                {isNaN(props.singleMedia.rating) ? (
                  <Text>0</Text>
                ) : (
                  <Text>{props.singleMedia.rating.toFixed(1)}/5</Text>
                )}
              </CardItem>
              <CardItem>
                {city &&
                <Icon style={listStyles.locationColor} name="locate"/>
                }
                <Text>{city}</Text>
              </CardItem>
            </TouchableOpacity>
          </Body>
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
