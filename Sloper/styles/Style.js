import {Dimensions, StyleSheet, Platform} from 'react-native';

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
    ...Platform.select({
      ios: {
        width: windowWidth * 0.6,
        height: windowHeight * 0.18,
        marginLeft: -15,
        marginTop: -37,
      },
      android: {
        width: windowWidth * 0.6,
        height: windowHeight * 0.3,
        marginLeft: -15,
        marginTop: -10,
      },
    }),
  },
  baseList: {
    borderColor: 'transparent',
    backgroundColor: 'aliceblue',
    marginLeft: 0,
  },
  card: {
    ...Platform.select({
      ios: {
        width: windowWidth,
        height: windowHeight * 0.16,
        marginTop: -5,
        marginBottom: 0,
      },
      android: {
        width: windowWidth,
        height: windowHeight * 0.28,
        marginTop: -5,
      },
    }),
  },
  heartColor: {
    color: 'black',
  },
  starColor: {
    color: 'black',
  },
  locationColor: {
    color: 'black',
  },
  listTitle: {
    zIndex: 1,
    marginLeft: -15,
    maxWidth: windowWidth * 0.6,
    color: 'black',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    top: -15,
  },
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
    fontSize: 30,
  },
  heartLiked: {
    color: 'red',
    fontSize: 30,
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

