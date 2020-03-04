import {Dimensions, StyleSheet} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const loginStyles = StyleSheet.create({
  backgroundVideo: {
    height: windowHeight,
    width: windowWidth,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
  content: {
    top: '20%',
  },
  title: {
    color: 'grey',
    margin: 40,
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
    textDecorationLine: 'underline',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    borderColor: 'grey',
    borderWidth: 1,
  },
  form: {
    borderColor: 'transparent',
  },
  signInOrRegister: {
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    marginTop: 15,
  },
});

const formStyles = StyleSheet.create({
  border: {
    borderColor: 'black',
    color: 'white',
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    borderRadius: 25,
    borderStyle: 'solid',
    borderWidth: 1,
    fontSize: 15,
    marginTop: 5,
  },
  form: {
    borderColor: 'transparent',
  },
});

const listStyles = StyleSheet.create({
  thumbNail: {
    width: 160,
    height: 160,
  },
  cardStyle: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.2,
  },
  baseList: {
    borderColor: 'transparent',
    backgroundColor: 'aliceblue',
  },
  card: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.27,
  },
  heartColor: {
    color: 'red',
    marginLeft: 30,
  },
  starColor: {
    color: '#ffe100',
    marginLeft: 30,
  },
  locationColor: {
    color: '#3f51b5',
    marginLeft: 30,
  },
  listTitle: {},
});

const singleStyles = StyleSheet.create({
  title: {
    fontSize: 40,
    marginTop: 10,
  },
  description: {
    fontSize: 18,
  },
  heart: {
    color: '#3F51B5',
    width: 30,
  },
  heartLiked: {
    color: 'red',
    width: 30,
  },
  commentTitle: {
    fontSize: 25,
    textDecorationLine: 'underline',
  },
  comments: {
    width: windowWidth * 0.7,
    borderColor: 'transparent',
  },
  border: {
    borderColor: 'transparent',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});


export {loginStyles, formStyles, listStyles, singleStyles};

