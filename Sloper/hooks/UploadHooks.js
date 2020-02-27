import { useState, } from "react";
import validate from "validate.js";
import { uploadImage } from "./APIHooks";
import {uploadConstraints} from '../constraints/Constraints';

const useUploadForm = () => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  const handleTitleChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        title: text,
      }));
  };
  const handleTextChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        postText: text,
      }));
  };
  const resetText = (attr, text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        [attr]: text,
      }));
  };

  const handleUpload = async (file, exifData, tag ) => {
    try {
      const filename = file.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      let type = '';
      if (file.type !== 'video') {
        type = match ? `image/${match[1]}` : `image`;
        if (type === 'image/jpg' || type === 'image/heic') {
          type = 'image/jpeg'
        } else {
          type = match ? `video/${match[1]}` : `video`;
        }
      }
      const formData = new FormData();
      const descriptionData = {
        description: inputs.postText,
        exif: exifData,
      };
      formData.append("file", {uri: file, name: filename, type});
      formData.append("title", inputs.title);
      formData.append("description", JSON.stringify(descriptionData));
      await uploadImage(formData, tag);
    } catch (e) {
      console.log("upload error", e);
      setErrors((errors) =>
        ({
          ...errors,
          fetch: e.message,
        }));
    }
  };

  const validateInput = (attr, value) => {
    const validated = validate({[attr]: value}, uploadConstraints);
    let valResult = undefined;
    if (validated) {
      valResult = validated[attr][0];
    }
    setErrors((errors) =>
      ({
        ...errors,
        [attr]: valResult,
        fetch: undefined
      }));
  };

  return {
    handleTitleChange,
    handleTextChange,
    validateInput,
    handleUpload,
    inputs,
    errors,
    setErrors,
    resetText,
  };
};

export default useUploadForm;

/* END OF FILE */
