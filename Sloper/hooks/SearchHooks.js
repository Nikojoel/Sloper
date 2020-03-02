import React, {useState,} from 'react';

const useSearchForm = () => {
  const [inputs, setInputs] = useState({});
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
