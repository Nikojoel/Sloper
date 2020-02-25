import { useState, } from "react";
import validate from "validate.js";
import { uploadImage } from "./APIHooks";

const constraints = {
  title: {
    length: {
      minimum: 5,
      message: "^Minimum 5 characters",
    }
  },
};

const useUploadForm = () => {
  const [inputs, setInputs] = useState({});
  const [valid, setValid] = useState({});
  const [uploading, setUploading] = useState({});

  const validateInput = (attr, value) => {
    const validated = validate({[attr]: value}, constraints);
    let valResult = undefined;
    if (validated) {
      valResult = validated[attr][0];
    }
    setValid((valid) =>
      ({
        ...valid,
        [attr]: valResult
      }));
  };

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

  const handleUpload = async (file, exifData) => {
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
    await uploadImage(formData);
  };

  return {
    handleTitleChange,
    handleTextChange,
    validateInput,
    handleUpload,
    inputs,
    valid,
    resetText,
    uploading,
  };
};

export default useUploadForm;

/* END OF FILE */
