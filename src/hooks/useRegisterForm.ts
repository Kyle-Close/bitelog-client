import { useState, useEffect } from 'react';
import {
  getAuth,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { isRegisterFormPopulated } from '../helpers/utility';
import { passwordsMatch } from '../helpers/utility';

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IUseRegisterFormExports {
  formData: RegisterFormData;
  handleUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRegisterSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errors: string[] | null;
  addError: (err: string) => void;
  clearErrors: () => void;
  isSubmitEnabled: boolean;
}

const initFormData: RegisterFormData = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function useRegisterForm(handleOpen: () => void): IUseRegisterFormExports {
  const [formData, setFormData] = useState<RegisterFormData>(initFormData);
  const [errors, setErrors] = useState<string[] | null>(null);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState<boolean>(false);

  const addError = (err: string) => {
    // If error already exists then don't display it again
    const exists = errors?.find((error) => error === err);
    if (exists) return;

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

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = getAuth();
    if (!formData) return;

    // Check if all form fields are populated
    if (!isRegisterFormPopulated(formData)) {
      addError('All fields must be filled out.');
      return;
    }

    // Check if passwords match
    if (!passwordsMatch(formData.password, formData.confirmPassword)) {
      addError('Passwords must match');
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

      handleOpen();
      //LoginUser(auth, { email: email, username: displayName });
      clearErrors();
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
    if (isRegisterFormPopulated(formData)) setIsSubmitEnabled(true);
    else setIsSubmitEnabled(false);
  }, [formData]);

  return {
    formData,
    handleUpdate,
    handleRegisterSubmit,
    errors,
    addError,
    clearErrors,
    isSubmitEnabled,
  };
}

export default useRegisterForm;
