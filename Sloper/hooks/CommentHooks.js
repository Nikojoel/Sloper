import {useState,} from "react";

const useCommentForm = () => {
  // Hook
  const [inputs, setInputs] = useState({});

  // Set comment FormTextInput value
  const handleCommentChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        comment: text,
      }));
  };

  return {
    handleCommentChange,
    inputs,
  };
};

export default useCommentForm;

/* END OF FILE */
