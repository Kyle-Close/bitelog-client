import '@testing-library/jest-dom';
import ForgotPasswordModal from '../components/ForgotPasswordModal';
import { getAuth } from 'firebase/auth';
import { render, screen } from '@testing-library/react';
import { app } from '../App';

export const auth = getAuth(app);

describe('forgot password modal', () => {
  test('form is displayed', () => {
    const mockFn = jest.fn();
    const modal = render(<ForgotPasswordModal open={true} setOpen={mockFn} />);
    const form = modal.container.querySelector('#forgot-password-modal');
    expect(form).toBeInTheDocument();
  });

  test('form contains input for email', () => {
    const mockFn = jest.fn();
    render(<ForgotPasswordModal open={true} setOpen={mockFn} />);
    const emailInput = screen.getByTestId('forgot-password-email-input');
    expect(emailInput).toBeInTheDocument();
  });
});
