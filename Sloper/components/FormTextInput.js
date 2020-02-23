import React from 'react';
import {
  Input,
  Content,
  Badge,
  Item,
  Text
} from 'native-base';
import PropTypes from 'prop-types';

const FormTextInput = (props) => {
  const {error, ...otherProps} = props;
  return (
    <Content>
      <Item>
        <Input
          {...otherProps}
        />
      </Item>
      {error &&
      <Badge><Text>{error}</Text></Badge>
      }
    </Content>
  );
};

FormTextInput.propTypes = {
  success: PropTypes.bool,
  error: PropTypes.string,
};

export default FormTextInput;

/* END OF FILE */
