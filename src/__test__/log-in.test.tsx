import '@testing-library/jest-dom';
import LoginForm from '../components/LoginForm';
import { render } from '@testing-library/react';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA1-_ryNYOdqZxIL7T3VZMABVF200PFXvs',
  authDomain: 'auth-blog-practice.firebaseapp.com',
  projectId: 'auth-blog-practice',
  storageBucket: 'auth-blog-practice.appspot.com',
  messagingSenderId: '595001719173',
  appId: '1:595001719173:web:719f6ff4a9e182ed57acec',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

describe('log-in page', () => {
  test('sign-in form is displayed on page', () => {
    const page = render(<LoginForm />);
    const signInForm = page.container.querySelector('#login-form');

    expect(signInForm).toBeInTheDocument();
  });
});
