import React, {useContext, useEffect, useState} from "react";
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
  Input, Label,
} from "native-base";
import {
  fetchAPI,
  postFavourite,
  isLiked,
  deletePost,
} from '../hooks/APIHooks'
import {ActivityIndicator, AsyncStorage, ListView, BackHandler} from 'react-native'
import PropTypes from "prop-types";
import AsyncImage from "../components/AsyncImage";
import {Dimensions, StyleSheet} from "react-native";
import {Video} from "expo-av";
import MapView from "react-native-maps";
import useCommentForm from "../hooks/CommentHooks";
import StarRating from 'react-native-star-rating';
import {RefreshContext} from '../contexts/RefreshContext';
import {MediaContext} from '../contexts/MediaContext';

const deviceHeight = Dimensions.get("window").height;

const mediaURL = "http://media.mw.metropolia.fi/wbma/uploads/";


const Single = props => {
  const [media, setMedia] = useContext(MediaContext);
  const [liked, setLiked] = useState();
  const {navigation} = props;
  const file = navigation.state.params.file;
  const owner = navigation.state.params.user;
  const [refresh, setRefresh] = useContext(RefreshContext);
  const [user, setUser] = useState({});
  const {inputs, handleCommentChange} = useCommentForm();

  const modifyContext = (context, file , data) => {
    if([...context.filter(i => i === file)]){
      const modifyData = (file) => ({
        ...file,
        ...data
      })
      console.log(file);
      const newData = [...context.filter(i => i !== file), modifyData(file)]
      setMedia(newData.sort((a,b)=> {return new Date(b.time_added) - new Date(a.time_added)}))
     };
  }



  useEffect(()=> {
    BackHandler.addEventListener("hardwareBackPress", reloadData);
    return () => {
    BackHandler.removeEventListener("hardwareBackPress", reloadData);
    }

  })

  const reloadData = () => {
    modifyContext(media, file, {favCount: file.favCount + 10});

  }

  const getComments = (id) => {

    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const fetchComments = async (id) => {
      try {
        const usr = await AsyncStorage.getItem('user')
        const userParsed = await JSON.parse(usr)
        const token = await AsyncStorage.getItem("userToken");
        const comments = await fetchAPI('GET', 'comments/file', id);
        const rating = await fetchAPI('GET', 'ratings/file', id );
        await Promise.all(
          comments.map(async i => {
            const user = await fetchAPI('GET', 'users', i.user_id, token);
            i.username = user.username;
          })
        );

        for(const x in rating) {
          if(rating[x].user_id === userParsed.user_id) {
            comments.myRating = rating[x].rating;
            break;
          };
        }
        setComments(comments);
        setCommentsLoading(false);

      } catch (e) {
        console.log('comments loading error ', e)
      }
    };
    useEffect(() => {
      fetchComments(id)
    }, []);
    return [comments, commentsLoading];
  };
  const [comments, commentsLoading] = getComments(file.file_id);
  const [c, setC] = useState([]);
  useEffect(()=> {
    setC(comments);
  },[commentsLoading])

  const commentList = c.map(comment => {
    return (
    <ListItem key={comment.comment_id}>
      <H3>{comment.username}</H3>
      <Text>{comment.comment}</Text>
    </ListItem>);
  });

  const postComment = async () => {
    try {
      const usr = await AsyncStorage.getItem('user')
      const userParsed = await JSON.parse(usr)
      const token = await AsyncStorage.getItem('userToken');
      const result = await fetchAPI('POST', 'comments', undefined, token, {file_id: file.file_id, comment: inputs.comment});
      console.log('posting comment response', await result);
      setC((c) => ([...c, {comment: inputs.comment,
                  comment_id: result.comment_id,
                  username: userParsed.username}
      ]))
    } catch (e) {
      console.log('posting comment error', e)
    }
  };

  const postRating = async (rating) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
       if(comments.myRating !== undefined) {
        try {
          await fetchAPI('DELETE','ratings/file', file.file_id, token);
        } catch (e){
          console.log('error deleting user rating', e)
        }
      }
            const data = {
        file_id: file.file_id,
        rating: rating
      }
      const response = await fetchAPI('POST', 'ratings', undefined, token, data)
      console.log('rating response', response)
    } catch (e) {
      console.log('posting rating error', e)
    }
  }

  const getUser = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const user = await fetchAPI('GET', 'users', file.user_id, token);
      setUser(user);
    } catch (e) {
      console.log(e)
    }
  };

  const checkLicked = async () => {
    const status = await isLiked(file.file_id);
    setLiked(status);
  };

  const putLike = async () => {
    await postFavourite(file.file_id);
    await checkLicked(file.file_id);
  };

  useEffect(() => {
    getUser();
    checkLicked();
  }, []);

  const [loading, setLoading] = useState(false);
  const [avail, setAvail] = useState(false);
  const [star, setStar] = useState(0);
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
          <StarRating
            disabled={false}
            maxStars={5}
            rating={star}
            selectedStar={(rating) => {
              setStar(rating);
              postRating(rating);
            }}
          />
          <Card>
            <CardItem>
              {file.media_type === "image" && (
                <AsyncImage
                  style={{
                    width: "100%",
                    height: deviceHeight / 2
                  }}
                  spinnerColor="#777"
                  source={{uri: mediaURL + file.filename}}
                />
              )}
              {file.media_type === "video" && (
                <Video
                  source={{uri: mediaURL + file.filename}}
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  resizeMode="cover"
                  shouldPlay
                  isLooping
                  style={{width: "100%", height: deviceHeight / 2}}
                  onError={(e) => {
                    console.log('video error', e)
                  }}
                />
              )}
            </CardItem>
            <CardItem>
              <Left>
                <Body>
                  <H3>{file.title}</H3>
                  <Text>{description}</Text>
                  <Text>By {user.username}</Text>
                  {avail ? (
                    <MapView style={styles.map}
                             region={{
                               latitude: exif.GPSLatitude,
                               longitude: exif.GPSLongitude,
                               latitudeDelta: 1,
                               longitudeDelta: 1,
                             }}>
                      <MapView.Marker
                        coordinate={{
                          latitude: exif.GPSLatitude,
                          longitude: exif.GPSLongitude,
                        }}
                        title={`${exif.GPSAltitude} meters above the sea level`}
                      />
                    </MapView>
                  ) : (
                    <Text>No GPS data available</Text>
                  )}
                </Body>
              </Left>
              <Button transparent onPress={() => {
                putLike(file.file_id)
              }}>
                {liked === undefined && <Icon name="heart" style={{color: "#3F51B5"}}/>}
                {liked !== undefined && <Icon name="heart" style={{color: "red"}}/>}
              </Button>
            </CardItem>
            <Form>
              <Item>
                <Input
                  placeholder="Write a comment"
                  onChangeText={handleCommentChange}
                  value={inputs.comment}
                />
                <Button warning rounded onPress={async () => {
                  handleCommentChange("");
                  await postComment()}
                }>
                  <Text>Comment</Text>
                </Button>
              </Item>
            </Form>
            <Item>
              <H3>Comments</H3>
              <List>
                {commentList}
              </List>
            </Item>
            {owner === file.user_id &&
            <CardItem>
              <Button danger onPress={() => {
                deletePost(file.file_id)
              }}>
                <Text>DELETE</Text>
              </Button>
              <Button warning onPress={async () => {
                setLoading(true);
                props.navigation.replace("Update", file);
              }}>
                <Text>UPDATE</Text>
              </Button>
            </CardItem>}
          </Card>
        </Content>
      ) : (<ActivityIndicator size="large" color="#0000ff"/>)}
    </Container>
  );
};
const styles = StyleSheet.create({
  map: {
    height: Dimensions.get('window').height * 0.5,
    width: Dimensions.get('window').width * 0.75,
  }
});
Single.propTypes = {
  navigation: PropTypes.object,
  file: PropTypes.object
};

export default Single;

/* END OF FILE */
