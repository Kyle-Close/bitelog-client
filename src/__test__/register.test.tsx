import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../contexts';
import Register from '../components/register';

import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';

jest.mock('firebase/auth');

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

const setup = (isLoggedIn: boolean) => {
  const user = isLoggedIn
    ? { username: 'test', email: 'test@gmail.com' }
    : null;
  const provider = { user, LoginUser: jest.fn(), ClearUserContext: jest.fn() };

  return render(
    <UserContext.Provider value={provider}>
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    </UserContext.Provider>
  );
};

describe('<Register />', () => {
  it('register with Google button in on the page and redirects upon success', async () => {
    (signInWithPopup as jest.Mock).mockResolvedValue({
      user: { email: 'test@gmail.com', displayName: 'test' },
    });

    setup(false);

    const googleBtn = screen.getByRole('button', {
      name: /register with google/i,
    });
    await fireEvent.click(googleBtn);

    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('username input is rendered and functional', async () => {
    setup(false);
    const usernameInput = screen.getByPlaceholderText(/username/i);
    await fireEvent.change(usernameInput, { target: { value: 'update' } });

    await waitFor(() => {
      expect(screen.getByDisplayValue(/update/i)).toBeInTheDocument;
    });
  });

  it('email input is rendered and functional', async () => {
    setup(false);
    const emailInput = screen.getByPlaceholderText(/email address/i);
    await fireEvent.change(emailInput, { target: { value: 'update' } });

    await waitFor(() => {
      expect(screen.getByDisplayValue(/update/i)).toBeInTheDocument;
    });
  });

  it('password input is rendered and functional', async () => {
    setup(false);
    const passwordInput = screen.getByPlaceholderText('Password');
    await fireEvent.change(passwordInput, { target: { value: 'update' } });

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Password')).toHaveValue('update');
    });
  });

  it('confirm password input is rendered and functional', async () => {
    setup(false);
    const confirmInput = screen.getByPlaceholderText('Confirm Password');
    await fireEvent.change(confirmInput, { target: { value: 'update' } });

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Confirm Password')).toHaveValue(
        'update'
      );
    });
  });

  it('register button is disabled on component load', () => {
    setup(false);
    const registerBtn = screen.getByText('Register');
    expect(registerBtn).toBeDisabled();
  });

  it('Register button is disabled when not all fields are populated', async () => {
    setup(false);
    const usernameInput = screen.getByPlaceholderText(/username/i);
    const emailInput = screen.getByPlaceholderText(/email address/i);
    const passwordInput = screen.getByPlaceholderText('Password');

    await fireEvent.change(usernameInput, { target: { value: 'update' } });
    await fireEvent.change(emailInput, { target: { value: 'update' } });
    await fireEvent.change(passwordInput, { target: { value: 'update' } });

    await waitFor(() => {
      expect(screen.getByText('Register')).toBeDisabled();
    });
  });

  it('Register button is enabled when all fields are populated', async () => {
    setup(false);
    const usernameInput = screen.getByPlaceholderText(/username/i);
    const emailInput = screen.getByPlaceholderText(/email address/i);
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmInput = screen.getByPlaceholderText('Confirm Password');

    await fireEvent.change(usernameInput, { target: { value: 'update' } });
    await fireEvent.change(emailInput, { target: { value: 'update' } });
    await fireEvent.change(passwordInput, { target: { value: 'update' } });
    await fireEvent.change(confirmInput, { target: { value: 'update' } });

    await waitFor(() => {
      expect(screen.getByText('Register')).not.toBeDisabled();
    });
  });

  it('Attempting to register with invalid email displays error message', async () => {
    const rejectValue = {
      message: 'Firebase: Error (auth/invalid-email).',
    };
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(
      rejectValue
    );

    setup(false);
    const usernameInput = screen.getByPlaceholderText(/username/i);
    const emailInput = screen.getByPlaceholderText(/email address/i);
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmInput = screen.getByPlaceholderText('Confirm Password');

    await fireEvent.change(usernameInput, { target: { value: 'update' } });
    await fireEvent.change(emailInput, { target: { value: 'update' } });
    await fireEvent.change(passwordInput, { target: { value: 'update' } });
    await fireEvent.change(confirmInput, { target: { value: 'update' } });

    const registerBtn = screen.getByText('Register');
    await fireEvent.click(registerBtn);

    await waitFor(() => {
      expect(screen.getByText('invalid-email')).toBeInTheDocument();
    });
  });

  it('Attempting to register with mismatched passwords displays error message', async () => {
    setup(false);
    const usernameInput = screen.getByPlaceholderText(/username/i);
    const emailInput = screen.getByPlaceholderText(/email address/i);
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmInput = screen.getByPlaceholderText('Confirm Password');

    await fireEvent.change(usernameInput, { target: { value: 'update' } });
    await fireEvent.change(emailInput, { target: { value: 'update' } });
    await fireEvent.change(passwordInput, { target: { value: 'update' } });
    await fireEvent.change(confirmInput, { target: { value: 'mismatch' } });

    const registerBtn = screen.getByText('Register');
    await fireEvent.click(registerBtn);

    await waitFor(() => {
      expect(screen.getByText('Passwords must match')).toBeInTheDocument();
    });
  });

  it('Successful registration displays modal', async () => {
    const resolveValue = {
      user: { displayName: 'test', email: 'test@gmail.com' },
    };
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(
      resolveValue
    );

    (sendEmailVerification as jest.Mock).mockResolvedValue(true);

    setup(false);
    const usernameInput = screen.getByPlaceholderText(/username/i);
    const emailInput = screen.getByPlaceholderText(/email address/i);
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmInput = screen.getByPlaceholderText('Confirm Password');

    await fireEvent.change(usernameInput, { target: { value: 'update' } });
    await fireEvent.change(emailInput, { target: { value: 'update' } });
    await fireEvent.change(passwordInput, { target: { value: 'update' } });
    await fireEvent.change(confirmInput, { target: { value: 'update' } });

    const registerBtn = screen.getByText('Register');
    await fireEvent.click(registerBtn);

    await waitFor(() => {
      expect(
        screen.getByText('Account Successfully Created!')
      ).toBeInTheDocument();
    });
  });
});
