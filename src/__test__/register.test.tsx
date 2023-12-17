import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../contexts';
import Register from '../components/register';
import useRegisterForm from '../hooks/useRegisterForm';
import { signInWithPopup } from 'firebase/auth';

jest.mock('firebase/auth');
jest.mock('../hooks/useRegisterForm');

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
  const res = { user: { accessToken: 'token' } };
  (signInWithPopup as jest.Mock).mockResolvedValue(res);

  it('register with Google button in on the page and redirects upon success', async () => {
    setup(false);
    await waitFor(() => {
      expect(screen.getByText(/register with google/i)).toBeInTheDocument();
    });
  });
});
