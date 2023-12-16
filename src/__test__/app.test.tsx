import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { firebaseConfig } from '../firebaseConfig';
import App from '../App';
import { initializeApp } from 'firebase/app';
import { UserContext } from '../contexts';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-router-dom');

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

const setup = () => {
  return render(
    <UserContext.Provider value={{ user: null, setUser: jest.fn() }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContext.Provider>
  );
};

describe('App Component', () => {
  test('renders component', () => {
    (getAuth as jest.Mock).mockResolvedValue('true');
    (onAuthStateChanged as jest.Mock).mockImplementation(() => jest.fn());

    setup();
  });

  test('runs initialize firebase with config', () => {
    expect(initializeApp).toHaveBeenCalledWith(firebaseConfig);
  });
});
