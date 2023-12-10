import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import LoginForm from '../components/auth/LoginForm';

describe('<LoginForm />', () => {
  test('should display a blank login form', async () => {
    const { findByTestId } = renderLoginForm();

    const loginForm = await findByTestId('login-form');

    expect(loginForm).toHaveFormValues({
      username: '',
      password: '',
      remember: true,
    });
  });
});
