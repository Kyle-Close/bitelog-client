import { BASE_URL } from '../config/axiosConfig';
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
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    // Read and parse the response body as JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching data:', error);
    throw error; // Rethrow the error if you need to handle it in the calling code
  }
}

export function convertToLocalDate(isoDateString: string) {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export async function deleteDataFromBackend(url: string) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error('User is not logged in');
    }

    // Get the user's ID token
    const idToken = await user.getIdToken();

    // Make the delete request to the backend
    const response = await fetch(url, {
      method: 'DELETE',
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
    console.error('Error deleting data:', error);
  }
}

export async function getUserJournalId(userId: string) {
  try {
    const url = BASE_URL + `/user/${userId}/journal`;
    const data = await fetchDataFromBackend(url);
    return data.journals[0].id;
  } catch (err) {
    console.log(err);
  }
}

export async function updateDataFromBackend(url: string, name: string) {
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
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    // Read and parse the response body as JSON
    return await response.json();
  } catch (error) {
    console.log('Error fetching data:', error);
    throw error; // Rethrow the error if you need to handle it in the calling code
  }
}

export async function createDataOnBackend(
  url: string,
  data: Record<string, any>
) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error('User is not logged in');
    }

    // Get the user's ID token
    const idToken = await user.getIdToken();

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorBody = await response.json(); // Assuming the server sends a JSON response
      console.log('HERE: ', errorBody);
      let err = '';
      if (errorBody.length > 0) {
      }
      throw new Error(
        errorBody.err || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error in createDataOnBackend:', error);
    throw error;
  }
}
