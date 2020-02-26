import {useState, useEffect} from 'react';
import {AsyncStorage} from 'react-native';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

const fetchGET = async (endpoint = '', params = '', token = '') => {
  const fetchOptions = {
    headers: {
      'x-access-token': token,
    },
  };
  const response = await fetch(apiUrl + endpoint + '/' + params,
    fetchOptions);
  if (!response.ok) {
    throw new Error('fetchGET error: ' + response.status);
  }
  return await response.json();
};

const fetchPOST = async (endpoint = '', data = {}, token = '') => {
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(apiUrl + endpoint, fetchOptions);
  const json = await response.json();
  if (response.status === 400 || response.status === 401) {
    const message = Object.values(json).join();
    throw new Error(message);
  } else if (response.status > 299) {
    throw new Error('fetchPOST error: ' + response.status);
  }
  return json;
};

const fetchDELETE = async (endpoint = '', params = '', token = '') => {
  const fetchOptions = {
    method: 'DELETE',
    headers: {
      'x-access-token': token,
    },
  };
console.log('delete path: ', apiUrl + endpoint + '/' + params)
  const response = await fetch(apiUrl + endpoint + '/' + params,
    fetchOptions);
  if (!response.ok) {
    throw new Error('fetchGET error: ' + response.status);
  }

  return await response.json();
};

const fetchPUT = async (endpoint = '', token = '', formBody = '') => {
   const fetchOptions = {
    method: 'PUT',
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formBody),
  };
  const response = await fetch(apiUrl + endpoint,
    fetchOptions);
  if (!response.ok) {
    throw new Error('fetchPUT error: ' + response.status);
  }

  return await response.json();
};

const deletePost = async (id) => {
  try {
    const token =  await AsyncStorage.getItem('userToken');
    const result = fetchDELETE('media',id, token);

  } catch (e) {
    console.log(e);
  }
};

const updatePost = async (data) => {
  let formBody = [];
  for (let property in data.data) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(data.data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    const token = await AsyncStorage.getItem('userToken');
    const result = await fetchPUT('media', data.file_id, token, formBody);

  } catch (e) {
    console.log("update post error", e);
  }
};


const isLiked = async(file_id) => {
  try {
    const arr = await fetchGET('favourites/file', file_id);
    const userFromStorage = await AsyncStorage.getItem('user');
    const user = JSON.parse(userFromStorage);
    return arr.find(it => it.user_id === user.user_id)
  } catch (e) {
    console.log(e.message)
  }
};

const postFavourite = async (file_id) => {
  const token =  await AsyncStorage.getItem('userToken');
  if (await isLiked(file_id) === undefined) {
    try {
      await fetchPOST('favourites', {file_id:file_id},token);
    } catch (e) {
      console.log(e.message);
    }
  } else {
    try {
      await fetchDELETE('favourites/file', file_id, token);
    } catch (e) {
      console.log(e.message)
    }
  }
};

const getAllMedia = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchMedia = async () => {
    try {
      const json = await fetchGET('tags/sloperTEST');
      // slice for only last 20
      const result = await Promise.all(json.reverse().slice(0, 10).map(async (item) => {
        return await fetchGET('media', item.file_id);
      }));

      setData(result);
      setLoading(false);
    } catch (e) {
      console.log('getAllMedia error', e.message);
    }
  };
  useEffect(() => {
    fetchMedia();
  }, []);
  return [data, loading];
};

const getAllUserMedia = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchMedia = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const json = await fetchGET('media/user', '', token);
      const result = await Promise.all(json.map(async (item) => {
        return await fetchGET('media', item.file_id);
      }));
      setData(result);
      setLoading(false);
    } catch (e) {
      console.log('getAllUserMedia error', e.message);
    }
  };
  useEffect(() => {
    fetchMedia();
  }, []);
  return [data, loading];
};

const uploadImage = async (data, tag) => {
  const token = await AsyncStorage.getItem('userToken');

  try {
    const response = await fetch(apiUrl + 'media', {
      method: "POST",
      body: data,
      headers: {
        "content-type": "multipart/form-data",
        "x-access-token": token,
      },
    });
    const responseData = await response.json();
    const fileid = {
      file_id: responseData.file_id,
      tag: tag
    };
    try {
      await fetchPOST('tags', fileid, token)
    } catch (e) {
      console.log('error in image tag', e.message)
    }
  } catch (e) {
    console.log('upload image error: ', e);
  }
};


export {
  getAllMedia,
  fetchGET,
  fetchPOST,
  uploadImage,
  postFavourite,
  isLiked,
  getAllUserMedia,
  deletePost,
  updatePost,
  fetchPUT
};

/* END OF FILE */
