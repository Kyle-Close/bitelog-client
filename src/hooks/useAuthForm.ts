import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth, signInWithEmailAndPassword } from 'firebase/auth';
import { isLoginFormPopulated } from '../helpers/utility';

export interface LoginFormData {
  email: string;
  password: string;
}

interface IUseAuthFormExports {
  formData: LoginFormData;
  handleUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLoginSubmit: (e: React.FormEvent<HTMLFormElement>, auth: Auth) => void;
  errors: string[] | null;
  addError: (err: string) => void;
  clearErrors: () => void;
  isSubmitEnabled: boolean;
}

const initFormData = {
  email: '',
  password: '',
};

function useAuthForm(): IUseAuthFormExports {
  const [formData, setFormData] = useState<LoginFormData>(initFormData);
  const [errors, setErrors] = useState<string[] | null>(null);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState<boolean>(false);
  const navigate = useNavigate();

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

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleLoginSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    auth: Auth
  ) => {
    e.preventDefault();
    if (!formData) return;

    if (!formData.email || !formData.password) {
      addError('All fields must be filled out.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      // TO-DO store user data in context
      console.log(userCredential);
      clearErrors();
      navigate('/');
    } catch (err: any) {
      const errorMessage = err.message;
      const regex: RegExp = /(?<=\()(.*)(?=\))/;
      const match: RegExpExecArray | null = regex.exec(errorMessage);

      if (match) {
        const errorBetweenParenthesis = match[0];
        const authErrorSplit = errorBetweenParenthesis.split('/');

        if (authErrorSplit.length > 1) {
          const displayErrorMsg = authErrorSplit[1];
          addError(displayErrorMsg);
        }
      }
    }
  };

  useEffect(() => {
    if (isLoginFormPopulated(formData)) setIsSubmitEnabled(true);
    else setIsSubmitEnabled(false);
  }, [formData]);

  return {
    formData,
    handleUpdate,
    handleLoginSubmit,
    errors,
    addError,
    clearErrors,
    isSubmitEnabled,
  };
}

export default useAuthForm;
