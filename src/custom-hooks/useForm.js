import { useState } from "react";

const useForm = (callbackSubmitButtonLogic, callbackValidation) => {
  const [inputFields, setInputFields] = useState({});
  const [errors, setErrors] = useState({});

  const handleOnSubmit = async (e) => {
    if (e) e.preventDefault();
    if (Object.keys(callbackValidation(inputFields)).length === 0) {
      await callbackSubmitButtonLogic();
    } else {
      setErrors(callbackValidation(inputFields));
      console.log("Errors in Login Component!");
    }
  };

  const handleOnChange = (e) => {
    setInputFields((inputs) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };
  
  return [inputFields, handleOnChange, handleOnSubmit, errors];
};

export default useForm;
