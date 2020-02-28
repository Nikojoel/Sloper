import React from 'react';
import {
  Input,
  Content,
  Badge,
  Item,
  Text,
  Body,
} from 'native-base';
import PropTypes from 'prop-types';
import {formStyles} from "../styles/Style";

const FormTextInput = (props) => {
  const {error, ...otherProps} = props;
  return (
    <Body>
      <Item style={formStyles.form}>
        <Input
          {...otherProps}
        />
      </Item>
      {error &&
      <Badge><Text>{error}</Text></Badge>
      }
    </Body>
  );
};


FormTextInput.propTypes = {
  success: PropTypes.bool,
  error: PropTypes.string,
};

export default FormTextInput;

/* END OF FILE */
