import {AsyncStorage} from 'react-native';
import {fetchAPI} from './APIHooks'

// API call to check if user has favoured media
const checkFavourite = async file_id => {
  try {
    const arr = await fetchAPI("GET", "favourites/file", file_id);
    const userFromStorage = await AsyncStorage.getItem("user");
    const user = JSON.parse(userFromStorage);
    const found = await arr.find(it => it.user_id === user.user.user_id);
    return found === undefined ? false : true;
  } catch (e) {
    console.log("check favourite error", e.message);
  }
};

// API call to post or delete favourite
const postFavourite = async (file_id, liked) => {
  const token = await AsyncStorage.getItem("userToken");
  // If user hasn't liked the media file, post favourite
  if (!liked) {
    try {
      await fetchAPI("POST", "favourites", undefined, token, {
        file_id: file_id
      });
    } catch (e) {
      console.log('post favourite error', e.message);
    }
    // If the user has liked the media file, delete the favourite
  } else {
    try {
      await fetchAPI("DELETE", "favourites/file", file_id, token);
    } catch (e) {
      console.log("delete favourite error", e.message);
    }
  }
};

// Exports
export {
  checkFavourite,
  postFavourite
}

/* END OF FILE */
