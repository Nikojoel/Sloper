import React, {useContext, useEffect, useState} from 'react';
import {
  Container,
  Content,
  Card,
  CardItem,
  Left,
  Body,
  H3,
  Icon,
  Text,
  Button,
  List,
  ListItem,
  Item,
  Form,
  Input,
  Label,
  Right,
} from 'native-base';
import {
  fetchAPI,

  deletePost,
} from '../hooks/APIHooks';
import {
  postFavourite,
  checkFavourite
} from '../hooks/FavouriteHooks';
import {
  ActivityIndicator,
  AsyncStorage,
  ListView,
  BackHandler,
} from 'react-native';
import PropTypes from 'prop-types';
import AsyncImage from '../components/AsyncImage';
import {Dimensions, StyleSheet} from 'react-native';
import {Video} from 'expo-av';
import MapView from 'react-native-maps';
import useCommentForm from '../hooks/CommentHooks';
import StarRating from 'react-native-star-rating';
import {MediaContext} from '../contexts/MediaContext';
import {UserContext} from '../contexts/UserContext';
import {modifyContext} from '../hooks/ContextHooks';
import {listStyles, singleStyles} from '../styles/Style';

const deviceHeight = Dimensions.get('window').height;

const mediaURL = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Single = (props) => {
  const [media, setMedia] = useContext(MediaContext);
  const [liked, setLiked] = useState();
  const {navigation} = props;
  const file = navigation.state.params.file;
  const [user, setUser] = useState({});
  const {inputs, handleCommentChange} = useCommentForm();
  const [star, setStar] = useState(0);

  /* const modifyContext = async (context,setContext, file, data) => {
    const modifyData = file => ({
      ...file,
      ...data
    });
    const newData = [...context.filter(i => i !== file), modifyData(file)].sort(
      (a, b) => {
        return new Date(b.time_added) - new Date(a.time_added);
      }
    );
    setContext(newData);
  };*/

  /* useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", reloadData);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", reloadData);
    };
  });*/


  const getComments = (id) => {
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const fetchComments = async (id) => {
      try {
        const usr = await AsyncStorage.getItem('user');
        const userParsed = await JSON.parse(usr);
        const token = await AsyncStorage.getItem('userToken');
        const comments = await fetchAPI('GET', 'comments/file', id);
        const rating = await fetchAPI('GET', 'ratings/file', id);
        await Promise.all(
          comments.map(async (i) => {
            const user = await fetchAPI('GET', 'users', i.user_id, token);
            i.username = user.username;
          }),
        );
        for (const x in rating) {
          if (rating[x].user_id === userParsed.user.user_id) {
            comments.myRating = rating[x].rating;
            console.log('my rating', comments.myRating);
            break;
          }
        }
        console.log(comments.myRating);
        setStar(comments.myRating);
        setComments(comments);
        setCommentsLoading(false);
      } catch (e) {
        console.log('comments loading error ', e);
      }
    };
    useEffect(() => {
      fetchComments(id);
    }, []);
    return [comments, commentsLoading];
  };
  const [comments, commentsLoading] = getComments(file.file_id);
  const [c, setC] = useState([]);
  useEffect(() => {
    setC(comments);
  }, [commentsLoading]);

  const commentList = c.map((comment) => {
    return (
      <ListItem style={singleStyles.comments} key={comment.comment_id}>
        <Left>
        <H3>{comment.username}</H3>
        <Text>{comment.comment}</Text>
        </Left>
      </ListItem>
    );
  });

  const postComment = async () => {
    try {
      const usr = await AsyncStorage.getItem('user');
      const userParsed = await JSON.parse(usr);
      const token = await AsyncStorage.getItem('userToken');
      const result = await fetchAPI('POST', 'comments', undefined, token, {
        file_id: file.file_id,
        comment: inputs.comment,
      });
      console.log('posting comment response', await result);
      setC((c) => [
        ...c,
        {
          comment: inputs.comment,
          comment_id: result.comment_id,
          username: userParsed.username,
        },
      ]);
    } catch (e) {
      console.log('posting comment error', e);
    }
  };

  const postRating = async (rating) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (comments.myRating !== undefined) {
        try {
          await fetchAPI('DELETE', 'ratings/file', file.file_id, token);
        } catch (e) {
          console.log('error deleting user rating', e);
        }
      }
      const data = {
        file_id: file.file_id,
        rating: rating,
      };
      const response = await fetchAPI(
        'POST',
        'ratings',
        undefined,
        token,
        data,
      );
      const newRating = {
        ratingTot: file.rating + rating,
        ratingNum: file.ratingNum + 1,
        rating: (file.ratingTot + rating) / (file.ratingNum + 1),
      };
      modifyContext(media, setMedia, file, newRating);
      console.log('rating response', response);
    } catch (e) {
      console.log('posting rating error', e);
    }
  };

  const getUser = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const user = await fetchAPI('GET', 'users', file.user_id, token);
      setUser(user);
    } catch (e) {
      console.log(e);
    }
  };

  const checkLicked = async () => {
    const status = await checkFavourite(file.file_id);
    setLiked(status);
  };

  const putLike = async () => {
    if (liked) {
      setLiked(false);
      const newData = {
        favCount: file.favCount - 1,
      };
      await modifyContext(media, setMedia, file, newData);
    } else {
      setLiked(true);
      const newData = {
        favCount: file.favCount + 1,
      };
      await modifyContext(media, setMedia, file, newData);
    }
    await postFavourite(file.file_id, liked);
  };

  useEffect(() => {
    getUser();
    checkLicked();
  }, []);

  const [loading, setLoading] = useState(false);
  const [avail, setAvail] = useState(false);
  const allData = JSON.parse(file.description);
  const exif = allData.exif;
  const description = allData.description;

  if (exif !== undefined) {
    if (exif.GPSLongitude !== undefined && exif.GPSLatitude !== undefined) {
      useEffect(() => {
        setAvail(true);
      }, []);
    }
  }

  return (
    <Container>
      {!loading ? (
        <Content>
          <Card>
            <Body>
              <Text style={singleStyles.title}>{file.title}</Text>
            </Body>
            <CardItem>
              <Body>
                {file.media_type === 'image' && (
                  <AsyncImage
                    style={{
                      width: '100%',
                      height: deviceHeight / 2,
                      flex: 1,
                      marginTop: -30,
                    }}
                    spinnerColor="#777"
                    source={{uri: mediaURL + file.filename}}
                  />
                )}
                {file.media_type === 'video' && (
                  <Video
                    source={{uri: mediaURL + file.filename}}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                    style={{width: '100%', height: deviceHeight / 2, flex: 1,}}
                    onError={(e) => {
                      console.log('video error', e);
                    }}
                  />
                )}
              </Body>
            </CardItem>
            <CardItem style={{marginTop: -60}}>
              <Left>
                <Body>
                  <CardItem>
                    <Icon name="heart"/>
                    <Text>{file.favCount}</Text>
                  </CardItem>
                </Body>
              </Left>
              <Right>
                <Body>
                  <CardItem>
                    <Icon name="star"/>
                    {isNaN(file.rating) ? (
                      <Text>0</Text>
                    ) : (
                      <Text>{file.rating.toFixed(1)}/5</Text>
                    )}
                  </CardItem>
                </Body>
              </Right>
              <Right>
                <Button
                  transparent
                  onPress={() => {
                    putLike();
                  }}
                >
                  {!liked && (
                    <Icon name="heart" style={singleStyles.heart}/>
                  )}
                  {liked && (
                    <Icon name="heart" style={singleStyles.heartLiked}/>
                  )}
                </Button>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text style={singleStyles.description}>{description}</Text>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Body>
                  <Text>By {user.username}</Text>
                </Body>
              </Left>
            </CardItem>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={star}
              selectedStar={(rating) => {
                setStar(rating);
                postRating(rating);
              }}
            />
            <CardItem>
              {avail ? (
                <Body>
                  <MapView
                    style={listStyles.asyncImage}
                    region={{
                      latitude: exif.GPSLatitude,
                      longitude: exif.GPSLongitude,
                      latitudeDelta: 1,
                      longitudeDelta: 1,
                    }}
                  >
                    <MapView.Marker
                      coordinate={{
                        latitude: exif.GPSLatitude,
                        longitude: exif.GPSLongitude,
                      }}
                      title={`${exif.GPSAltitude} meters above the sea level`}
                    />
                  </MapView>
                </Body>
              ) : (
                <Text>No GPS data available</Text>
              )}
            </CardItem>
            <Item>
              <Body>
                <Text style={singleStyles.commentTitle}>Comments</Text>
              </Body>
            </Item>
            <Item>
              <List>{commentList}</List>
            </Item>
            <Form>
              <Item>
                <Input
                  placeholder="Write a comment"
                  onChangeText={handleCommentChange}
                  value={inputs.comment}
                />
                <Button
                  warning
                  rounded
                  onPress={async () => {
                    handleCommentChange('');
                    await postComment();
                  }}
                >
                  <Text>Comment</Text>
                </Button>
              </Item>
            </Form>
            {user.user_id === file.user_id && (
              <CardItem>
                <Body>
                  <Button
                    danger
                    onPress={() => {
                      deletePost(file.file_id);
                      setMedia([
                        ...media.filter((i) => i.file_id !== file.file_id),
                      ]);
                      props.navigation.navigate('Home');
                    }}
                  >
                    <Text>DELETE</Text>
                  </Button>
                </Body>
                <Button
                  warning
                  onPress={async () => {
                    setLoading(true);
                    props.navigation.replace('Update', file);
                  }}
                >
                  <Text>UPDATE</Text>
                </Button>
              </CardItem>
            )}
          </Card>
        </Content>
      ) : (
        <ActivityIndicator size="large" color="#0000ff"/>
      )}
    </Container>
  );
};

Single.propTypes = {
  navigation: PropTypes.object,
  file: PropTypes.object,
};

export default Single;

/* END OF FILE */
