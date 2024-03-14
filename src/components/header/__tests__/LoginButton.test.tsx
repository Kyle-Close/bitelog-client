import '@testing-library/jest-dom';
import { getAuth } from 'firebase/auth';
import LoggedOutButtons from '../LoggedOutButtons';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import Header from '..';
import { UserContext } from '../../../context';

jest.mock('firebase/auth');

describe('Header login button', () => {
  (getAuth as jest.Mock).mockResolvedValueOnce(true);
  const mockedUsedNavigate = useNavigate();

  const user = { username: 'test', email: 'test@gmail.com' };
  const LoginUser = jest.fn();
  const ClearUserContext = jest.fn();

  it('Clicking login button navigates to login page', async () => {
    render(<LoggedOutButtons />, { wrapper: BrowserRouter });
    const loginBtn = screen.getByText(/login/i);
    expect(loginBtn).toBeInTheDocument();

    await fireEvent.click(loginBtn); // when the click happens the error is thrown
    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/login');
    });
  });

  it('Clicking register button navigates to register page', async () => {
    render(<LoggedOutButtons />, { wrapper: BrowserRouter });
    const registerBtn = screen.getByText(/register/i);
    fireEvent.click(registerBtn);

    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/register');
    });
  });

  it('Bitelog title button is rendered to header & navigates to homepage', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const titleBtn = screen.getByRole('button', {
      name: /bitelog home page title button/i,
    });

    fireEvent.click(titleBtn);
    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenLastCalledWith('/');
    });
  });

  it('Login & Register buttons are on the header when user is logged out', () => {
    render(
      <UserContext.Provider value={{ user: null, LoginUser, ClearUserContext }}>
        <Header />
      </UserContext.Provider>
    );

    const loginBtn = screen.getByText(/login/i);
    const registerBtn = screen.getByText(/register/i);

    expect(loginBtn).toBeInTheDocument();
    expect(registerBtn).toBeInTheDocument();
  });

  it('Logout button is in the header when user is logged in', () => {
    render(
      <UserContext.Provider value={{ user, LoginUser, ClearUserContext }}>
        <Header />
      </UserContext.Provider>
    );

    const logoutBtn = screen.getByText(/logout/i);
    expect(logoutBtn).toBeInTheDocument();
  });
});
