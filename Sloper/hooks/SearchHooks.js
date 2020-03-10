import React, {useState} from 'react';

const useSearchForm = () => {
  // Hook
  const [inputs, setInputs] = useState({});

  // Set search bar input value
  const handleSearchChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        search: text,
      }));
  };

  return {
    inputs,
    handleSearchChange,
  };
};

export default useSearchForm;

/* END OF FILE */
