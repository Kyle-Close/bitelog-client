import '@testing-library/jest-dom';
import LoginForm from '../components/LoginForm';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import userEvent from '@testing-library/user-event';

jest.mock('firebase/auth');

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

  test('email input updates on page as expected', () => {
    const app = render(<LoginForm />);
    const emailInput = app.container.querySelector('#email');

    if (emailInput)
      fireEvent.change(emailInput, { target: { value: 'jest@gmail.com' } });

    const emailState = screen.getByDisplayValue('jest@gmail.com');

    expect(emailState).toBeInTheDocument();
  });

  test('password input updates on page as expected', () => {
    const app = render(<LoginForm />);
    const passwordInput = app.container.querySelector('#password');

    if (passwordInput)
      fireEvent.change(passwordInput, { target: { value: 'password' } });

    const passwordState = screen.getByDisplayValue('password');

    expect(passwordState).toBeInTheDocument();
  });

  test('forgot password button is displayed', () => {
    const page = render(<LoginForm />);
    const forgotPassButton = page.container.querySelector(
      '#forgot-password-button'
    );

    expect(forgotPassButton).toBeInTheDocument();
  });

  test('forgot password opens modal when clicked', () => {
    const page = render(<LoginForm />);
    const forgotPasswordButton = page.container.querySelector(
      '#forgot-password-button'
    );

    if (forgotPasswordButton) fireEvent.click(forgotPasswordButton);

    const modal = page.container.querySelector('#forgot-password-modal');
    expect(modal).toBeInTheDocument();
  });

  test('create new account link in on the page and has correct href', () => {
    render(<LoginForm />);
    const registerLink = screen.getByText('Create one now.');
    expect(registerLink).toHaveAttribute('href', '/register');
  });

  // TO-DO
  test('successful login through form redirects user to homepage', async () => {
    const user = userEvent.setup();
    // Mock dependencies
    const mockSignInWithEmailAndPassword = jest.fn().mockResolvedValue('token');
    (signInWithEmailAndPassword as jest.Mock).mockImplementation(
      mockSignInWithEmailAndPassword
    );

    // Render component
    render(<LoginForm />);
    const emailInput: HTMLInputElement =
      screen.getByPlaceholderText('Email Address');
    const passInput: HTMLInputElement = screen.getByPlaceholderText('Password');

    // Simulate filling out the form
    await user.click(emailInput);
    await user.keyboard('test@gmail.com');

    await user.click(passInput);
    await user.keyboard('123456');

    // Simulate clicking sign in button
    const submitButton = screen.getByText('Login');
    await user.click(submitButton);

    screen.debug();
    // Check for the presence of the text
    const test = screen.queryByText('this is a test');

    await waitFor(() => {
      expect(test).toBeInTheDocument();
    });
  });
});
