import { LoginFormData } from '../hooks/useLoginForm';
import { RegisterFormData } from '../hooks/useRegisterForm';
import { getAuth } from 'firebase/auth';

export function isLoginFormPopulated(formData: LoginFormData) {
  if (formData.email && formData.password) return true;
  else return false;
}

export function isRegisterFormPopulated(formData: RegisterFormData) {
  if (
    formData.username &&
    formData.email &&
    formData.password &&
    formData.confirmPassword
  )
    return true;
  else return false;
}

export function passwordsMatch(pass1: string, pass2: string): boolean {
  if (pass1 === pass2) return true;
  else return false;
}

export async function fetchDataFromBackend(url: string) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error('User is not logged in');
    }

    // Get the user's ID token
    const idToken = await user.getIdToken();

    // Make the fetch request to the backend
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
