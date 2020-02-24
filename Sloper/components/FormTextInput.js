import React from 'react';
import {
  Input,
  Content,
  Badge,
  Item,
  Text
} from 'native-base';
import PropTypes from 'prop-types';
import {Dimensions, StyleSheet} from 'react-native';

const FormTextInput = (props) => {

  const {error, ...otherProps} = props;
  return (
    <Content>
      <Item style={styles.form}>
        <Input style={styles.border}
          {...otherProps}
        />
      </Item>
      {error &&
      <Badge><Text>{error}</Text></Badge>
      }
    </Content>
  );
};
const styles = StyleSheet.create({
  border: {
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 25,
    borderStyle: 'solid',
    borderWidth: 1,
    fontSize: 15,
    marginTop: 5,
  },
  form: {
    borderColor: "transparent",
  }
});

FormTextInput.propTypes = {
  success: PropTypes.bool,
  error: PropTypes.string,
};

export default FormTextInput;

/* END OF FILE */
