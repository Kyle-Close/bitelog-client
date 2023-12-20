const mockedNavigate = jest.fn();

import { useNavigate } from 'react-router-dom';
import { render, screen, waitFor } from '../../../test-utils';
import GoogleAuthButton from '../GoogleAuthButton';
import userEvent from '@testing-library/user-event';
import { signInWithPopup } from 'firebase/auth';
import { useContext } from 'react';

jest.mock('react-router-dom', () => ({
  useNavigate: mockedNavigate,
}));
jest.mock('firebase/auth');
jest.mock('react');

describe('<GoogleAuthButton />', () => {
  it('testing', async () => {
    const user = { email: 'test@gmail.com', displayName: 'test' };
    (signInWithPopup as jest.Mock).mockResolvedValueOnce({ user });
    (useContext as jest.Mock).mockImplementationOnce(() => ({
      LoginUser: jest.fn(),
    }));

    render(<GoogleAuthButton isLogin={false} />);
    const button = screen.getByRole('button', {
      name: /login with google|register with google/i,
    });

    await userEvent.click(button);

    await waitFor(() => {
      expect(useNavigate).toHaveBeenCalledWith('/');
    });
  });
});
