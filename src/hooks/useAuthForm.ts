import { useState, useEffect } from 'react';
import { isLoginFormPopulated } from '../helpers/utility';

export interface LoginFormData {
  email: string;
  password: string;
}

function useAuthForm(): [
  LoginFormData,
  React.ChangeEventHandler<HTMLInputElement>,
  string[] | null,
  (err: string) => void,
  () => void,
  boolean
] {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<string[] | null>(null);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState<boolean>(false);

  useEffect(() => {
    console.log('errors: ', errors);
  }, [errors]);

  useEffect(() => {
    console.log('formData:');
    console.dir(formData);
  }, [formData]);

  const addError = (err: string) => {
    if (errors && errors.length > 0) {
      setErrors((prevErrors) => {
        if (prevErrors && prevErrors.length > 0) return [...prevErrors, err];
        else return [err];
      });
    } else setErrors([err]);
  };

  const clearErrors = () => {
    setErrors(null);
  };

  const handleFormUpdate: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (errors && errors.length > 0) {
      setErrors(null);
    }

    const inputField = e.target.id;
    const value = e.target.value;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [inputField]: value,
      };
    });
  };

  useEffect(() => {
    if (isLoginFormPopulated(formData)) setIsSubmitEnabled(true);
    else setIsSubmitEnabled(false);
  }, [formData]);

  return [
    formData,
    handleFormUpdate,
    errors,
    addError,
    clearErrors,
    isSubmitEnabled,
  ];
}

export default useAuthForm;
