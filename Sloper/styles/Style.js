import {Dimensions, StyleSheet, Platform, ActivityIndicator} from 'react-native';
import React from "react";

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
    ...Platform.select({
      ios: {
        top: '20%',
      },
      android: {
        top: '10%',
      },
    }),
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
  alert: {
      fontSize: 30,
  },
  alertButton: {
    zIndex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    width: 50,
    marginLeft: 10,
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
        height: windowHeight * 0.2,
        marginLeft: -15,
        marginTop: -40,
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
      },
      android: {
        width: windowWidth,
        height: windowHeight * 0.19,
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
    ...Platform.select({
      ios: {
        zIndex: 1,
        marginLeft: -15,
        maxWidth: windowWidth * 0.6,
        color: 'black',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        top: -15,
      },
      android: {
        zIndex: 1,
        marginLeft: -15,
        maxWidth: windowWidth * 0.6,
        color: 'black',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        top: -18,
      },
    }),
  },
  bodyMargin: {
    marginTop: -10,
  },
  headerBar: {
    backgroundColor: 'white',
  },
  headerInput: {
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
  },
});

const singleStyles = StyleSheet.create({
  map: {
    width: '100%',
    height: windowHeight * 0.4,
    flex: 1,
    marginTop: 0,
  },
  asyncImage: {
    ...Platform.select({
      ios: {
        width: '100%',
        height: windowHeight * 0.5,
        flex: 1,
        marginTop: -30,
      },
      android: {
        width: '100%',
        height: windowHeight * 0.5,
        flex: 1,
      },
    }),
  },
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
    marginRight: 20,
  },
  heartLiked: {
    color: 'red',
    fontSize: 30,
    marginRight: 20,
  },
  commentTitle: {
    fontSize: 20,
  },
  comments: {
    width: windowWidth * 0.9,
    borderColor: 'transparent',
  },
  border: {
    borderColor: 'transparent',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  commentForm: {
    borderColor: 'transparent',
    marginTop: 10,
    marginBottom: 10,
  },
  commentInput: {
    borderRadius: 25,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  bubbleIcon: {
    fontSize: 25,
    marginRight: 5,
  },
});

const myFilesStyles = StyleSheet.create({
  tabFooter: {
    ...Platform.select({
      ios: {
        backgroundColor: 'white',
      },
      android: {},
    }),
  },
});

const headerStyles = StyleSheet.create({
  headerLogo: {
    ...Platform.select({
      ios: {
        width: 70,
        height: 25,
        marginLeft: 10,
      },
      android: {
        width: 70,
        height: 25,
        marginLeft: 95,
      },
    }),
  },
  headerArrow: {
    ...Platform.select({
      ios: {},
      android: {
        color: 'blue',
      },
    }),
  },
  loginLogo: {
    width: 150,
    height: 50,
    top: '8%',
    left: '33%',
    zIndex: 1,
  },
});

const loadingStyles = StyleSheet.create({
  activityIndicator: {
    top: '30%',
  },
});

export {loginStyles, formStyles, listStyles, singleStyles, myFilesStyles, headerStyles, loadingStyles};

