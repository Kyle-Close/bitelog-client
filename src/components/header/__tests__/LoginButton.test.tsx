import '@testing-library/jest-dom';
import { getAuth } from 'firebase/auth';
import LoggedOutButtons from '../LoggedOutButtons';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('firebase/auth');

describe('Header login button', () => {
  (getAuth as jest.Mock).mockResolvedValueOnce(true);
  (mockedUsedNavigate as jest.Mock).mockImplementation(() => jest.fn());

  it('Button navigates to login page when clicked', async () => {
    render(<LoggedOutButtons />, { wrapper: BrowserRouter });
    const loginBtn = screen.getByText(/login/i);
    expect(loginBtn).toBeInTheDocument();

    await fireEvent.click(loginBtn); // when the click happens the error is thrown
    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/loginn');
    });
  });
});
