import '@testing-library/jest-dom';
import { getAuth } from 'firebase/auth';
import LoggedOutButtons from '../LoggedOutButtons';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual,
  useNavigate: jest.fn(),
}));

jest.mock('firebase/auth');

describe('Header login button', () => {
  (getAuth as jest.Mock).mockResolvedValueOnce(true);
  (useNavigate as jest.Mock).mockImplementation(() => jest.fn());

  it('Button navigates to login page when clicked', async () => {
    render(<LoggedOutButtons />, { wrapper: BrowserRouter });
    const loginBtn = screen.getByText(/login/i);
    expect(loginBtn).toBeInTheDocument();

    await fireEvent.click(loginBtn); // when the click happens the error is thrown
    await waitFor(() => {
      expect(useNavigate).toHaveBeenCalledWith('/login');
    });
  });
});
