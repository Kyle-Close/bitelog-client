/* import { render, screen, waitFor, fireEvent } from '../../../test-utils';
import GoogleAuthButton from '../GoogleAuthButton';
import { signInWithPopup } from 'firebase/auth';
import { useContext } from 'react';
import 'react-router-dom';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('firebase/auth');
jest.mock('react');

describe('<GoogleAuthButton />', () => {
  it('testing', async () => {
    const user = { email: 'test@gmail.com', displayName: 'test' };
    (signInWithPopup as jest.Mock).mockResolvedValueOnce({ user });
    (useContext as jest.Mock).mockResolvedValueOnce(() => ({
      LoginUser: jest.fn(),
    }));

    render(<GoogleAuthButton isLogin={false} />);
    const button = screen.getByRole('button', {
      name: /login with google|register with google/i,
    });

    await fireEvent.click(button);

    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
    });
  });
});
 */
