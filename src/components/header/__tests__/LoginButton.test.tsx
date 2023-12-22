import '@testing-library/jest-dom';
import { getAuth } from 'firebase/auth';
import LoggedOutButtons from '../LoggedOutButtons';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';

jest.mock('firebase/auth');
jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual,
  useNavigate: jest.fn(),
}));

describe('Header login button', () => {
  (getAuth as jest.Mock).mockResolvedValueOnce(true);
  (useNavigate as jest.Mock).mockImplementation(jest.fn());

  it('Button is rendered on the header when not logged in', () => {
    render(
      <BrowserRouter>
        <LoggedOutButtons />
      </BrowserRouter>
    );
    const loginBtn = screen.getByText(/login/i);
    expect(loginBtn).toBeInTheDocument();
  });
});
