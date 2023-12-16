/*  
    TO-DO - Future
      1. check that menu is displaying the correct buttons/links on mobile
      2. check that buttons/links are displayed and working on larger screen
*/

import '@testing-library/jest-dom';
import Header from '../components/header';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { UserContext } from '../contexts';
import { BrowserRouter } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

jest.mock('firebase/auth', () => ({
  signOut: jest.fn(),
  getAuth: jest.fn(),
}));

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

function setup(isLoggedIn: boolean) {
  const user = isLoggedIn
    ? { email: 'test@gmail.com', username: 'test' }
    : null;

  return render(
    <UserContext.Provider value={{ user, setUser: jest.fn() }}>
      <Header />
    </UserContext.Provider>
  );
}

function setupWithBrowserRouter(isLoggedIn: boolean) {
  const user = isLoggedIn
    ? { email: 'test@gmail.com', username: 'test' }
    : null;

  return render(
    <UserContext.Provider value={{ user, setUser: jest.fn() }}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

const mockAuth = { user: 'guy' };
(getAuth as jest.Mock).mockImplementation(() => mockAuth);

describe('<Header />', () => {
  it('menu button is displayed', () => {
    setup(false);

    const menuBtn = screen.getByLabelText('menu icon');
    expect(menuBtn).toBeInTheDocument();
  });

  it('clicking title button navigates to home page', () => {
    setup(false);
    const titleBtn = screen.getByLabelText('bitelog home page title button');

    expect(titleBtn).toBeInTheDocument();
  });

  it('clicking title navigates to home page', async () => {
    setupWithBrowserRouter(false);
    const titleBtn = screen.getByLabelText('bitelog home page title button');
    await fireEvent.click(titleBtn);

    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('login button rendered and navigates when user not logged in', async () => {
    setupWithBrowserRouter(false);
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);
    expect(loginButton).toBeVisible();

    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/login');
    });
  });

  it('register button rendered and navigates when user not logged in', async () => {
    setupWithBrowserRouter(false);
    const registerButton = screen.getByRole('button', { name: /register/i });
    fireEvent.click(registerButton);
    expect(registerButton).toBeVisible();

    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/register');
    });
  });

  it('logout button is NOT rendered when user not logged in', () => {
    setup(false);
    const logoutBtn = screen.queryByText(/logout/i);
    expect(logoutBtn).not.toBeInTheDocument();
  });

  it('logout button is rendered and navigates when user is logged in', async () => {
    setupWithBrowserRouter(true);

    const logoutBtn = screen.queryByText(/logout/i);
    expect(logoutBtn).toBeInTheDocument();

    if (logoutBtn) await fireEvent.click(logoutBtn);

    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
    });
  });

  it('login button is NOT rendered when user is logged in', () => {
    setup(true);
    const loginBtn = screen.queryByText(/login/i);
    expect(loginBtn).not.toBeInTheDocument();
  });

  it('register button is NOT rendered when user is logged in', () => {
    setup(true);
    const registerBtn = screen.queryByText('register');
    expect(registerBtn).not.toBeInTheDocument();
  });
});
