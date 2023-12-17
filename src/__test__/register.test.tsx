import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../contexts';
import Register from '../components/register';
import useRegisterForm from '../hooks/useRegisterForm';
import { signInWithPopup } from 'firebase/auth';

jest.mock('firebase/auth');
jest.mock('../hooks/useRegisterForm');

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

beforeEach(() => {
  (useRegisterForm as jest.Mock).mockReturnValue({
    formData: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    handleUpdate: jest.fn(),
    handleRegisterSubmit: jest.fn(),
    errors: null,
    addError: jest.fn(),
    clearErrors: jest.fn(),
    isSubmitEnabled: false,
  });
});

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
});
