import React, { useContext, useEffect, useState } from "react";
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
  H4,
  Spinner,
  View
} from "native-base";
import { fetchAPI, deletePost } from "../hooks/APIHooks";
import { postFavourite, checkFavourite } from "../hooks/FavouriteHooks";
import {
  ActivityIndicator,
  AsyncStorage,
  ListView,
  BackHandler
} from "react-native";
import PropTypes from "prop-types";
import AsyncImage from "../components/AsyncImage";
import { Dimensions, StyleSheet } from "react-native";
import { Video } from "expo-av";
import MapView from "react-native-maps";
import useCommentForm from "../hooks/CommentHooks";
import StarRating from "react-native-star-rating";
import { MediaContext } from "../contexts/MediaContext";
import { UserContext } from "../contexts/UserContext";
import { modifyContext } from "../hooks/ContextHooks";
import { listStyles, loadingStyles, singleStyles } from "../styles/Style";
import FormTextInput from "../components/FormTextInput";
import BackHeader from "../components/BackHeader";
import { TouchableOpacity } from "react-native-gesture-handler";

const deviceHeight = Dimensions.get("window").height;

const mediaURL = "http://media.mw.metropolia.fi/wbma/uploads/";

const Single = props => {
  const level = ["Beginner", "Intermediate", "Advanced", "Expert"];
  const [media, setMedia] = useContext(MediaContext);
  const [{ user, token }, setUser] = useContext(UserContext);
  const [liked, setLiked] = useState();
  const { navigation } = props;
  const file = navigation.state.params.file;
  const [owner, setOwner] = useState({});
  const { inputs, handleCommentChange } = useCommentForm();
  const [star, setStar] = useState(0);
  const [loadingSingle, setLoadingSingle] = useState(true);

  const getComments = id => {
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const fetchComments = async id => {
      try {
        const comments = await fetchAPI("GET", "comments/file", id);
        const rating = await fetchAPI("GET", "ratings/file", id);
        await Promise.all(
          comments.map(async i => {
            const user = await fetchAPI("GET", "users", i.user_id, token);
            i.username = user.username;
          })
        );
        for (const x in rating) {
          if (rating[x].user_id === user.user_id) {
            comments.myRating = rating[x].rating;
            console.log("my rating", comments.myRating);
            break;
          }
        }
        console.log(comments.myRating);
        setStar(comments.myRating);
        setComments(comments);
        setCommentsLoading(false);
        setLoading(false);
      } catch (e) {
        console.log("comments loading error ", e);
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

  const commentList = c.map(comment => {
    return (
      <ListItem style={singleStyles.comments} key={comment.comment_id}>
        <Left>
          <Icon name="chatbubbles" />
          <Text style={singleStyles.username}>{comment.username}: </Text>
          <Text>{comment.comment}</Text>
        </Left>
      </ListItem>
    );
  });

  const postComment = async () => {
    try {
      const result = await fetchAPI("POST", "comments", undefined, token, {
        file_id: file.file_id,
        comment: inputs.comment
      });
      console.log("posting comment response", await result);
      setC(c => [
        ...c,
        {
          comment: inputs.comment,
          comment_id: result.comment_id,
          username: user.username
        }
      ]);
    } catch (e) {
      console.log("posting comment error", e);
    }
  };

  const postRating = async rating => {
    try {
      if (comments.myRating !== undefined) {
        try {
          await fetchAPI("DELETE", "ratings/file", file.file_id, token);
        } catch (e) {
          console.log("error deleting user rating", e);
        }
      }
      const data = {
        file_id: file.file_id,
        rating: rating
      };
      const response = await fetchAPI(
        "POST",
        "ratings",
        undefined,
        token,
        data
      );
      const newRating = {
        ratingTot: file.rating + rating,
        ratingNum: file.ratingNum + 1,
        rating: (file.ratingTot + rating) / (file.ratingNum + 1)
      };
      modifyContext(media, setMedia, file, newRating);
      console.log("rating response", response);
    } catch (e) {
      console.log("posting rating error", e);
    }
  };

  const getUser = async () => {
    try {
      const user = await fetchAPI("GET", "users", file.user_id, token);
      const result = await fetchAPI(
        "GET",
        "tags",
        "sloper_skill_" + user.user_id
      );

      if (result.length < 1) {
        user.skill = 0;
      } else {
        user.skill = result[result.length - 1].description;
      }
      console.log(user);
      setOwner(user);
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
        favCount: file.favCount - 1
      };
      await modifyContext(media, setMedia, file, newData);
    } else {
      setLiked(true);
      const newData = {
        favCount: file.favCount + 1
      };
      await modifyContext(media, setMedia, file, newData);
    }
    await postFavourite(file.file_id, liked);
  };

  useEffect(() => {
    getUser();
    checkLicked();
  }, []);

  const [loading, setLoading] = useState(true);
  const [avail, setAvail] = useState(false);
  const allData = JSON.parse(file.description);
  const exif = allData.exif;
  const description = allData.description;

  let altitude = "No altitude data";
  if (exif !== undefined) {
    if (exif.GPSLongitude !== undefined && exif.GPSLatitude !== undefined) {
      if (exif.GPSAltitude !== 0) {
        altitude = `${exif.GPSAltitude.toFixed(1)} meters above the sea level`;
      }
      useEffect(() => {
        setAvail(true);
      }, []);
    }
  }

  return (
    <Container>
      <BackHeader navigation={props.navigation} />
      {!loading ? (
        <Content>
          <Card>
            <Body>
              <Text style={singleStyles.title}>{file.title}</Text>
            </Body>
            <CardItem>
              <Body>
                {file.media_type === "image" && (
                  <AsyncImage
                    style={singleStyles.asyncImage}
                    spinnerColor="#777"
                    source={{ uri: mediaURL + file.filename }}
                  />
                )}
                {file.media_type === "video" && (
                  <Video
                    source={{ uri: mediaURL + file.filename }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                    style={{ width: "100%", height: deviceHeight / 2, flex: 1 }}
                    onError={e => {
                      console.log("video error", e);
                    }}
                  />
                )}
              </Body>
            </CardItem>
            <CardItem bordered style={{ marginTop: -60 }}>
              <Left>
                <Body>
                  <CardItem>
                    <Icon name="heart" />
                    <Text>{file.favCount}</Text>
                  </CardItem>
                </Body>
              </Left>
              <Right>
                <Body>
                  <CardItem>
                    <Icon name="star" />
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
                  {!liked && <Icon name="heart" style={singleStyles.heart} />}
                  {liked && (
                    <Icon name="heart" style={singleStyles.heartLiked} />
                  )}
                </Button>
              </Right>
            </CardItem>
            <CardItem bordered>
              <Left>
                <Icon name="paper" />
                <Text style={singleStyles.description}>{description}</Text>
              </Left>
            </CardItem>

            <CardItem bordered>
                <Left>
                  <Icon name="ios-person" />
                  <Text>{owner.username}</Text>
                </Left>
                <Right>
                  <Button primary rounded iconLeft onPress={() => {
                    navigation.navigate("ShowProfile", owner.user_id)
                  }}>
                    <Icon name={"ios-eye"}/>
                    <Text>View profile</Text>
                  </Button>
                </Right>
            </CardItem>
            <CardItem bordered>
              <Left>
                <Icon name="ios-podium" />
                <Text>{level[owner.skill]}</Text>
              </Left>
            </CardItem>

            <Body>
              <Text style={{ marginTop: 10 }}>Rate this post</Text>
              <CardItem bordered>
                <StarRating
                  fullStarColor={"gold"}
                  disabled={false}
                  maxStars={5}
                  rating={star}
                  selectedStar={rating => {
                    setStar(rating);
                    postRating(rating);
                  }}
                />
              </CardItem>
            </Body>
            <CardItem>
              {avail && (
                <Body>
                  <MapView
                    style={singleStyles.map}
                    region={{
                      latitude: exif.GPSLatitude,
                      longitude: exif.GPSLongitude,
                      latitudeDelta: 1,
                      longitudeDelta: 1
                    }}
                  >
                    <MapView.Marker
                      coordinate={{
                        latitude: exif.GPSLatitude,
                        longitude: exif.GPSLongitude
                      }}
                      title={altitude}
                    />
                  </MapView>
                </Body>
              )}
            </CardItem>
            <Item>
              <Body>
                <CardItem>
                  <Text style={singleStyles.commentTitle}>Comments </Text>
                </CardItem>
              </Body>
            </Item>
            <Item>
              <List>{commentList}</List>
            </Item>
            <Form>
              <Item style={singleStyles.commentForm}>
                <Input
                  style={singleStyles.commentInput}
                  placeholder="Write a comment"
                  onChangeText={handleCommentChange}
                  value={inputs.comment}
                />
                <Button
                  primary
                  rounded
                  onPress={async () => {
                    if (inputs.comment !== "") {
                      handleCommentChange("");
                      await postComment();
                    }
                  }}
                >
                  <Icon name="md-send" />
                </Button>
              </Item>
            </Form>
            {user.user_id === file.user_id && (
              <CardItem>
                <Body>
                  <Button
                    danger
                    rounded
                    iconLeft
                    onPress={() => {
                      deletePost(file.file_id);
                      setMedia([
                        ...media.filter(i => i.file_id !== file.file_id)
                      ]);
                      props.navigation.navigate("Home");
                    }}
                  >
                    <Icon name="ios-trash" />
                    <Text>Delete</Text>
                  </Button>
                </Body>
                <Right>
                  <Button
                    warning
                    rounded
                    iconLeft
                    onPress={async () => {
                      setLoading(true);
                      props.navigation.replace("Update", file);
                    }}
                  >
                    <Icon name="ios-cog" />
                    <Text>Edit</Text>
                  </Button>
                </Right>
              </CardItem>
            )}
          </Card>
        </Content>
      ) : (
        <Spinner
          style={loadingStyles.activityIndicator}
          size="large"
          color="blue"
        />
      )}
    </Container>
  );
};

Single.propTypes = {
  navigation: PropTypes.object,
  file: PropTypes.object
};

export default Single;

/* END OF FILE */
