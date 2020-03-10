import React, {useState} from "react";
import PropTypes from "prop-types";

const UserContext = React.createContext();

const UserProvider = props => {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};

UserContext.propTypes = {
  children: PropTypes.node
};

export {UserContext, UserProvider};

/* END OF FILE */
