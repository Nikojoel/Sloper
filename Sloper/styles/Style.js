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
  asyncImage: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.4,
  },
  cardStyle: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.4,
    flex: 1,
  },
  baseList: {
    borderColor: 'transparent',
  },
});

export {loginStyles, formStyles, listStyles};

