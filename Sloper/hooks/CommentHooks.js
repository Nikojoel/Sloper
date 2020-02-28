import { useState, } from "react";

const useCommentForm = () => {
  const [inputs, setInputs] = useState({});

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
