import React, {useEffect, useState, useContext} from "react";
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Icon,
} from "native-base";
import AsyncImage from "../components/AsyncImage";
import {Dimensions} from "react-native";
import {UserContext} from "../contexts/UserContext";
import BackHeader from "../components/BackHeader";
import {fetchAPI} from "../hooks/APIHooks";

const deviceHeight = Dimensions.get("window").height;

const ShowProfile = ({navigation}) => {
  // Hooks
  const id = navigation.state.params;
  const [{token}] = useContext(UserContext);
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);

  const getProfile = async id => {
    const level = ["Beginner", "Intermediate", "Advanced", "Expert"];
    // API call to get user
    const user = await fetchAPI("GET", "users", id, token);
    // API call to get user skill level
    const skill = await fetchAPI("GET", "tags", "sloper_skill_" + id);
    // If skill level is not set, set it to beginner
    if (skill.length < 1) {
      user.skill = level[0];
    } else {
      user.skill = level[skill[skill.length - 1].description];
    }
    // API call to get user avatar pic
    const pictureId = await fetchAPI("GET", "tags", "sloper_avatar_" + id);
    if (pictureId.length !== 0) {
      // API call to get profile picture
      const picture = await fetchAPI(
        "GET",
        "media",
        pictureId[pictureId.length - 1].file_id
      );
      user.picture =
        "http://media.mw.metropolia.fi/wbma/uploads/" + picture.filename;
    } else {
      user.picture = "https://placekitten.com/1024/1024";
    }
    setProfile(user);
    setLoading(false);
  };
  useEffect(() => {
    getProfile(id);
  }, []);

  // ShowProfile view components
  return (
    <Container>
      <BackHeader navigation={navigation}/>
      {!loading && (
        <Content>
          <Card>
            <CardItem bordered>
              <Icon name="ios-person" style={{fontSize: 30}}/>
              <Text style={{fontSize: 16}}>Username: {profile.username}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <AsyncImage
                  style={{
                    width: "100%",
                    height: deviceHeight / 2
                  }}
                  spinnerColor="#777"
                  source={{uri: profile.picture}}
                />
              </Body>
            </CardItem>
            <CardItem bordered>
              <Icon name="ios-document" style={{fontSize: 30}}/>
              <Body>
                <Text style={{fontSize: 16}}>
                  Full Name: {profile.full_name}
                </Text>
                <Text style={{fontSize: 16}}>Email: {profile.email}</Text>
                <Text style={{fontSize: 16}}>
                  Skill Level: {profile.skill}
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      )}
    </Container>
  );
};

export default ShowProfile;

/* END OF FILE */
