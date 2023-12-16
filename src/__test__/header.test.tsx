/*  
    Either - logged in / logged out
        1. menu button is displayed on mobile
        2. when title is clicked, homepage is rendered
      3. title button navigates to home page 

    Logged out
      1. log in button is rendered
      2. register button is rendered
      3. log out button is not rendered
      4. clicking login button navigates to '/login'
      5. clicking register button navigates to '/register'

    Logged in
      1. log out button is rendered
      2. log in button is not rendered
      3. register button is not rendered

    TO-DO - Future
      1. check that menu is displaying the correct buttons/links on mobile
      2. check that buttons/links are displayed and working on larger screen
*/

import '@testing-library/jest-dom';
import Header from '../components/header';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { UserContext } from '../contexts';
import { BrowserRouter } from 'react-router-dom';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // if you need other parts of react-router-dom
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

    waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
    });
  });
});
