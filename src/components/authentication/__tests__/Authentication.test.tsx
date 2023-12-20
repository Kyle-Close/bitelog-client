import { render } from '../../../test-utils';
import GoogleAuthButton from '../GoogleAuthButton';
import 'firebase/auth';

jest.mock('firebase/auth');

describe('<GoogleAuthButton />', () => {
  it('testing', () => {
    render(<GoogleAuthButton isLogin={false} />);
  });
});
