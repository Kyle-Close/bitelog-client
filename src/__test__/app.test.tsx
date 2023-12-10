jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { firebaseConfig } from '../firebaseConfig';
import App from '../App';
import { initializeApp } from 'firebase/app';

describe('App Component', () => {
  test('renders component', () => {
    render(<App />);
  });

  test('runs initialize firebase with config', () => {
    expect(initializeApp).toHaveBeenCalledWith(firebaseConfig);
  });
});
