import '@testing-library/jest-dom';
import { render, screen } from '../../../test-utils';
import LoggedInButtons from '../LoggedInButtons';

describe('Header login button', () => {
  it('Button is rendered on the header when not logged in', () => {
    render(<LoggedInButtons />);
    const loginBtn = screen.getByText(/login/i);
    expect(loginBtn);
  });
});
