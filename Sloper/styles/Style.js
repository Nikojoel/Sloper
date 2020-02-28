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

export {loginStyles, formStyles};

