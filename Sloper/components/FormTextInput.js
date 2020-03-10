import React from 'react';
import {
  Input,
  Badge,
  Item,
  Text,
  Body,
} from 'native-base';
import PropTypes from 'prop-types';
import {formStyles} from "../styles/Style";

// Custom input component
const FormTextInput = (props) => {
  const {error, ...otherProps} = props;

  // FormTextInput view components
  return (
    <Body>
      <Item style={formStyles.form}>
        <Input
          {...otherProps}
        />
      </Item>
      {/* Error badge */}
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
