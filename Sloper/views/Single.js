import React, {useContext, useEffect, useState} from "react";
import {
  Container,
  Content,
  Card,
  CardItem,
  Left,
  Body,
  Icon,
  Text,
  Button,
  List,
  ListItem,
  Item,
  Form,
  Input,
  Right,
  Spinner
} from "native-base";
import {fetchAPI, deletePost} from "../hooks/APIHooks";
import {postFavourite, checkFavourite} from "../hooks/FavouriteHooks";
import PropTypes from "prop-types";
import AsyncImage from "../components/AsyncImage";
import {Dimensions} from "react-native";
import {Video} from "expo-av";
import MapView from "react-native-maps";
import useCommentForm from "../hooks/CommentHooks";
import StarRating from "react-native-star-rating";
import {MediaContext} from "../contexts/MediaContext";
import {UserContext} from "../contexts/UserContext";
import {modifyContext} from "../hooks/ContextHooks";
import {loadingStyles, singleStyles} from "../styles/Style";
import BackHeader from "../components/BackHeader";

const deviceHeight = Dimensions.get("window").height;

const mediaURL = "http://media.mw.metropolia.fi/wbma/uploads/";

const Single = props => {
  // Hooks
  const {navigation} = props;
  const file = navigation.state.params.file;
  const allData = JSON.parse(file.description);
  const exif = allData.exif;
  const description = allData.description;
  const [media, setMedia] = useContext(MediaContext);
  const [{user, token}, setUser] = useContext(UserContext);
  const {inputs, handleCommentChange} = useCommentForm();
  const [owner, setOwner] = useState({});
  const [liked, setLiked] = useState();
  const [loadedComments, setLoadedComments] = useState([]);
  const [star, setStar] = useState(0);
  const [loading, setLoading] = useState(true);
  const [avail, setAvail] = useState(false);
  const level = ["Beginner", "Intermediate", "Advanced", "Expert"];

  // Fetch all comments and rating for a single post
  const getComments = id => {
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const fetchComments = async id => {
      try {
        // API call to get comments
        const comments = await fetchAPI("GET", "comments/file", id);
        // API call to get ratings
        const rating = await fetchAPI("GET", "ratings/file", id);
        await Promise.all(
          comments.map(async i => {
            // API call to get users
            const user = await fetchAPI("GET", "users", i.user_id, token);
            i.username = user.username;
          })
        );
        // Iterate over ratings
        for (const x in rating) {
          if (rating[x].user_id === user.user_id) {
            comments.myRating = rating[x].rating;
            console.log("my rating", comments.myRating);
            break;
          }
        }
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
  useEffect(() => {
    setLoadedComments(comments);
  }, [commentsLoading]);

  // Create a list from loaded comments
  const commentList = loadedComments.map(comment => {
    return (
      <ListItem style={singleStyles.comments} key={comment.comment_id}>
        <Body>
          <Item style={{borderColor: "transparent"}}>
            <Icon name="chatbubbles"/>
            <Text style={singleStyles.username}>{comment.username}: </Text>
          </Item>
          <Text>{comment.comment}</Text>
        </Body>
      </ListItem>
    );
  });

  // Post a new comment and update a local state
  const postComment = async () => {
    try {
      // API call to post comment
      const result = await fetchAPI("POST", "comments", undefined, token, {
        file_id: file.file_id,
        comment: inputs.comment
      });
      setLoadedComments(c => [
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

  // Rate the post by star and update the main list context
  const postRating = async rating => {
    try {
      if (comments.myRating !== undefined) {
        try {
          // API call to delete rating
          await fetchAPI("DELETE", "ratings/file", file.file_id, token);
        } catch (e) {
          console.log("error deleting user rating", e);
        }
      }
      const data = {
        file_id: file.file_id,
        rating: rating
      };
      // API call to post rating
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
      // Modifies local data to display
      modifyContext(media, setMedia, file, newRating);
    } catch (e) {
      console.log("posting rating error", e);
    }
  };

  // Get owner of this post
  const getOwner = async () => {
    try {
      // API call to get user
      const user = await fetchAPI("GET", "users", file.user_id, token);
      // API call to get user skill level
      const result = await fetchAPI(
        "GET",
        "tags",
        "sloper_skill_" + user.user_id
      );
      // User skill level
      if (result.length < 1) {
        user.skill = 0;
      } else {
        user.skill = result[result.length - 1].description;
      }
      setOwner(user);
    } catch (e) {
      console.log(e);
    }
  };

  // Checks if the current user has liked this post
  const checkLicked = async () => {
    const status = await checkFavourite(file.file_id);
    setLiked(status);
  };

  // Sets the like for this post with current user and update main list context
  const putLike = async () => {
    if (liked) {
      setLiked(false);
      const data = media[media.indexOf(file)];
      data.favCount--;
      const newContext = [...media.filter(i => i !== file), data].sort(
        (a, b) => {
          return new Date(b.time_added) - new Date(a.time_added);
        }
      );
      setMedia(newContext);
    } else {
      setLiked(true);
      const data = media[media.indexOf(file)];
      data.favCount++;
      const newContext = [...media.filter(i => i !== file), data].sort(
        (a, b) => {
          return new Date(b.time_added) - new Date(a.time_added);
        }
      );
      setMedia(newContext);
    }
    await postFavourite(file.file_id, liked);
  };

  useEffect(() => {
    getOwner();
    checkLicked();
  }, []);

  // Sets the altitude from exif data if it exists
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

  // Single view components
  return (
    <Container>
      <BackHeader navigation={props.navigation}/>
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
                    style={singleStyles.asyncImage}
                    onError={e => {
                      console.log("video error", e);
                    }}
                  />
                )}
              </Body>
            </CardItem>
            <CardItem bordered style={singleStyles.cardItem}>
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
                  {!liked && <Icon name="heart" style={singleStyles.heart}/>}
                  {liked && (
                    <Icon name="heart" style={singleStyles.heartLiked}/>
                  )}
                </Button>
              </Right>
            </CardItem>
            <CardItem bordered>
              <Left>
                <Icon name="paper"/>
                <Text style={singleStyles.description}>{description}</Text>
              </Left>
            </CardItem>

            <CardItem bordered>
              <Left>
                <Icon name="ios-person"/>
                <Text>{owner.username}</Text>
              </Left>
              <Right>
                <Button
                  primary
                  rounded
                  iconLeft
                  onPress={() => {
                    navigation.navigate("ShowProfile", owner.user_id);
                  }}
                >
                  <Icon name={"ios-eye"}/>
                  <Text>View profile</Text>
                </Button>
              </Right>
            </CardItem>
            <CardItem bordered>
              <Left>
                <Icon name="ios-podium"/>
                <Text>{level[owner.skill]}</Text>
              </Left>
            </CardItem>

            <Body>
              <Text style={singleStyles.rateText}>Rate this post</Text>
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
                  <Icon name="md-send"/>
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
                    <Icon name="ios-trash"/>
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
                    <Icon name="ios-cog"/>
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
