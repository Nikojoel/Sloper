import { useState, useEffect, useContext} from 'react';
import { AsyncStorage } from 'react-native';
import { fetchAPI } from './APIHooks'

const checkFavourite = async file_id => {
  try {
    const arr = await fetchAPI("GET", "favourites/file", file_id);
    const userFromStorage = await AsyncStorage.getItem("user");
    const user = JSON.parse(userFromStorage);
    const found = await arr.find(it => it.user_id === user.user.user_id);
    return found === undefined ? false : true;
  } catch (e) {
    console.log(e.message);
  }
};

const postFavourite = async (file_id, liked) => {
  const token = await AsyncStorage.getItem("userToken");
  if (!liked) {
    try {
      await fetchAPI("POST", "favourites", undefined, token, {
        file_id: file_id
      });
    } catch (e) {
      console.log('post fav',e.message);
    }
  } else {
    try {
      await fetchAPI("DELETE", "favourites/file", file_id, token);
    } catch (e) {
      console.log('del fav',  e.message);
    }
  }
};

export {
  checkFavourite,
  postFavourite
}
