import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { firebaseConfig } from '../firebaseConfig';
import App from '../App';
import { initializeApp } from 'firebase/app';
import { UserContext } from '../contexts';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

describe('App Component', () => {
  test('renders component', () => {
    (getAuth as jest.Mock).mockResolvedValue('true');
    (onAuthStateChanged as jest.Mock).mockImplementation(() => jest.fn());

    render(
      <UserContext.Provider value={{ user: null, setUser: jest.fn() }}>
        <App />
      </UserContext.Provider>
    );
  });

  test('runs initialize firebase with config', () => {
    expect(initializeApp).toHaveBeenCalledWith(firebaseConfig);
  });
});
