import {Dimensions, StyleSheet} from 'react-native';

const loginStyles = StyleSheet.create({
  backgroundVideo: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
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
    fontWeight: 'bold',
    fontSize: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
    textDecorationLine: 'underline',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
  form: {
    borderColor: 'transparent',
  },
  signIn: {
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
  registerIn: {
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
});

export {loginStyles};
