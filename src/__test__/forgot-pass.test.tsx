import '@testing-library/jest-dom';
import ForgotPasswordModal from '../components/login/ForgotPasswordModal';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { app } from '../App';

export const auth = getAuth(app);
jest.mock('firebase/auth');

const mockSetOpen = jest.fn();

describe('forgot password modal', () => {
  test('form is displayed', () => {
    const modal = render(
      <ForgotPasswordModal open={true} setOpen={mockSetOpen} />
    );
    const form = modal.container.querySelector('#forgot-password-modal');
    expect(form).toBeInTheDocument();
  });

  test('form contains input for email', () => {
    render(<ForgotPasswordModal open={true} setOpen={mockSetOpen} />);
    const emailInput = screen.getByTestId('forgot-password-email-input');
    expect(emailInput).toBeInTheDocument();
  });

  test('form contains submit button', () => {
    render(<ForgotPasswordModal open={true} setOpen={mockSetOpen} />);
    const submitBtn = screen.getByRole('button', { name: /send email/i });
    expect(submitBtn).toBeInTheDocument();
  });

  test('initial load displays text indicating how to reset password', async () => {
    render(<ForgotPasswordModal open={true} setOpen={mockSetOpen} />);

    await waitFor(() => {
      expect(
        screen.getByText(
          'To reset your password, enter the email address associated with your account.'
        )
      ).toBeInTheDocument();
    });
  });

  test('submitting a valid email displays a message indicating to check email', async () => {
    (sendPasswordResetEmail as jest.Mock).mockResolvedValue(true);

    render(<ForgotPasswordModal open={true} setOpen={mockSetOpen} />);
    const emailInput = screen.getByTestId('forgot-password-email-input');
    const submitBtn = screen.getByRole('button', { name: /send email/i });

    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(
        screen.getByText(
          /a recovery email has been sent to the email provided\. please check your email and follow the instructions to reset your password\./i
        )
      ).toBeInTheDocument();
    });
  });
});
