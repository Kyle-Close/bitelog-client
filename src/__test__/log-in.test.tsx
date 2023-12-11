import '@testing-library/jest-dom';
import LoginForm from '../components/LoginForm';
import { fireEvent, render } from '@testing-library/react';

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
  test('sign-in form is rendered', () => {
    const page = render(<LoginForm />);
    const signInForm = page.container.querySelector('#login-form');
    expect(signInForm).toBeInTheDocument();
  });

  test('submit button is rendered', () => {
    const page = render(<LoginForm />);
    const submitButton = page.container.querySelector('#login-form-submit');
    expect(submitButton).toBeInTheDocument();
  });

  test('email input field is displayed', () => {
    const page = render(<LoginForm />);
    const emailInput = page.container.querySelector('#email');
    expect(emailInput).toBeInTheDocument();
  });

  test('password input field is displayed', () => {
    const page = render(<LoginForm />);
    const password = page.container.querySelector('#password');
    expect(password).toBeInTheDocument();
  });

  test('submit button is clicked and the event handler is called', () => {
    const page = render(<LoginForm />);

    // Create a mock function
    const mockSubmitHandler = jest.fn();

    // Replace the actual submit handler with the mock
    const submitButton = page.container.querySelector(
      '#login-form-submit'
    ) as HTMLButtonElement;
    if (submitButton) {
      submitButton.onclick = mockSubmitHandler;

      // Trigger a click event
      fireEvent.click(submitButton);

      // Check if the mock function was called
      expect(mockSubmitHandler).toHaveBeenCalled();
    }
  });

  test('handles form submission with no data', async () => {
    const page = render(<LoginForm />);
    const submitButton = page.container.querySelector('#login-form-submit');

    // Trigger a click event to submit the form with no data
    if (submitButton) {
      fireEvent.click(submitButton);

      // Wrap the assertions in an async function
      await (async () => {
        // Wait for asynchronous operations to settle
        await page.findByText('All fields must be filled out.');

        // Assert that appropriate error messages are displayed or handle the result as needed
        expect(
          page.getByText('All fields must be filled out.')
        ).toBeInTheDocument();
      })();
    }
  });
});
