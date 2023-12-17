import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Auth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { isLoginFormPopulated } from '../helpers/utility';
import { UserContext } from '../contexts';

export interface FormData {
  username?: string;
  email: string;
  password: string;
}

interface IUseAuthFormExports {
  formData: FormData;
  handleUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLoginSubmit: (e: React.FormEvent<HTMLFormElement>, auth: Auth) => void;
  handleRegisterSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    auth: Auth
  ) => void;
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
  const [formData, setFormData] = useState<FormData>(initFormData);
  const [errors, setErrors] = useState<string[] | null>(null);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState<boolean>(false);
  const navigate = useNavigate();
  const { LoginUser } = useContext(UserContext);

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
      const { email, displayName } = userCredential.user;
      if (!email || !displayName) {
        addError('Could not find account username or email.');
        return;
      }
      LoginUser(auth, { email: email, username: displayName });
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

  const handleRegisterSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    auth: Auth
  ) => {
    e.preventDefault();
    if (!formData) return;

    if (!formData.username || !formData.email || !formData.password) {
      addError('All fields must be filled out.');
      return;
    }

    try {
      // Create the new user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Update the new account's username (displayName)
      if (auth.currentUser)
        await updateProfile(auth.currentUser, {
          displayName: formData.username,
        });

      // Send verification email
      await sendEmailVerification(userCredential.user);

      // Update global user context
      const { email, displayName } = userCredential.user;

      if (!email || !displayName) {
        addError('Could not find account username or email.');
        return;
      }

      LoginUser(auth, { email: email, username: displayName });
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
    handleRegisterSubmit,
    errors,
    addError,
    clearErrors,
    isSubmitEnabled,
  };
}

export default useAuthForm;
