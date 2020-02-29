import React, {useState} from 'react';
import PropTypes from 'prop-types';

const RefreshContext = React.createContext([, () => {}]);


const RefreshProvider = (props) => {
  const [refresh, setRefresh] = useState(false);
  return (
    <RefreshContext.Provider value={[refresh, setRefresh]}>
      {props.children}
    </RefreshContext.Provider>
  );
};

RefreshProvider.propTypes = {
  children: PropTypes.node,
};

export {
  RefreshContext,
  RefreshProvider
};

/* END OF FILE */
