import '@testing-library/jest-dom';
import LoginForm from '../components/login';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../contexts';

jest.mock('firebase/auth');
jest.mock('react-router-dom');
// Mock dependencies
const mockResolveData = {
  user: 'Kyle',
};

const mockSignInWithEmailAndPassword = jest
  .fn()
  .mockResolvedValue(mockResolveData);

(signInWithEmailAndPassword as jest.Mock).mockImplementation(
  mockSignInWithEmailAndPassword
);

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

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

  test('submit button is disabled when both fields are not filled out', async () => {
    const page = render(<LoginForm />);
    const submitButton = page.container.querySelector('#login-form-submit');

    expect(submitButton).toBeDisabled();
  });

  test('submit button is disabled when only email is filled out', async () => {
    render(<LoginForm />);
    const emailInput = await screen.findByPlaceholderText('Email Address');
    const submitButton = await screen.findByText('Login');

    await fireEvent.change(emailInput, { target: { value: '123456' } });

    expect(submitButton).toBeDisabled();
  });

  test('submit button is disabled when only password is filled out', async () => {
    render(<LoginForm />);
    const emailInput = await screen.findByPlaceholderText('Email Address');
    const passwordInput = await screen.findByPlaceholderText('Password');
    const submitButton = await screen.findByText('Login');

    await fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    await fireEvent.change(passwordInput, { target: { value: '123456' } });

    expect(submitButton).toBeEnabled();
  });

  test('submit button is enabled when both email and password are filled out', async () => {
    render(<LoginForm />);
    const passwordInput = await screen.findByPlaceholderText('Password');
    const submitButton = await screen.findByText('Login');

    await fireEvent.change(passwordInput, {
      target: { value: 'test@gmail.com' },
    });

    expect(submitButton).toBeDisabled();
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

  test('successful login through form redirects user to homepage', async () => {
    mockSignInWithEmailAndPassword.mockResolvedValue({
      user: { email: 'test@gmail.com', displayName: 'test' },
    });

    render(
      <UserContext.Provider
        value={{
          user: null,
          LoginUser: jest.fn(),
          ClearUserContext: jest.fn(),
        }}
      >
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </UserContext.Provider>
    );

    const emailInput: HTMLInputElement =
      screen.getByPlaceholderText('Email Address');
    const passInput: HTMLInputElement = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Login');

    await fireEvent.change(emailInput, {
      target: { value: 'test@gmail.com' },
    });
    await fireEvent.change(passInput, { target: { value: '123456' } });
    await fireEvent.click(submitButton);

    expect(emailInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('unsuccessful login through form displays error message', async () => {
    const mockRejectData = {
      message: '"Firebase: Error (auth/invalid-credential).',
    };
    mockSignInWithEmailAndPassword.mockRejectedValue(mockRejectData);

    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText('Email Address');
    const passInput = screen.getByPlaceholderText('Password');
    const submitBtn = screen.getByText('Login');

    await fireEvent.change(emailInput, {
      target: { value: 'invalid@email.com' },
    });
    await fireEvent.change(passInput, { target: { value: 'wrong' } });
    await fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('invalid-credential')).toBeInTheDocument();
    });
  });

  test('successful login through google auth redirects to home', async () => {
    const res = { user: { accessToken: 'token' } };
    (signInWithPopup as jest.Mock).mockResolvedValue(res);

    render(
      <UserContext.Provider
        value={{
          user: null,
          LoginUser: jest.fn(),
          ClearUserContext: jest.fn(),
        }}
      >
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </UserContext.Provider>
    );

    const googleSignInBtn = screen.getByRole('button', {
      name: /login with google/i,
    });

    await fireEvent.click(googleSignInBtn);

    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('clicking create account link redirects to the register page', () => {
    render(<LoginForm />);

    const createAccountLink = screen.getByRole('link', {
      name: /create one now\./i,
    });

    expect(createAccountLink).toHaveAttribute('href', '/register');
  });

  test('when user is already logged in, display already logged in message', () => {
    render(
      <UserContext.Provider
        value={{
          user: { username: 'test', email: 'test@gmail.com' },
          LoginUser: jest.fn(),
          ClearUserContext: jest.fn(),
        }}
      >
        <LoginForm />
      </UserContext.Provider>
    );

    expect(screen.getByText('You are already logged in.')).toBeInTheDocument();
  });
});
