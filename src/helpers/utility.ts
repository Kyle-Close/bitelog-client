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

export async function mutateDataOnBackend(
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
      let errorList: string[] = [];

      if (Array.isArray(errorBody.err)) {
        errorBody.err.forEach((err: any) => {
          errorList.push(err.msg);
        });

        const errorResponse = errorList.join('||');
        throw new Error(errorResponse);
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

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export type Method = 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE';

export type RequestBody =
  | Record<string, unknown>
  | Blob
  | FormData
  | URLSearchParams
  | string
  | null;

export interface RequestToBackend {
  url: string;
  method?: Method;
  headers?: object;
  body?: RequestBody | null;
  authRequired?: boolean;
}

export async function makeRequestToBackend({
  url,
  method = 'GET',
  headers = {},
  body = null,
  authRequired = true,
}: RequestToBackend) {
  try {
    let idToken = null;

    if (authRequired) {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User is not logged in');
      }
      idToken = await user.getIdToken();
    }

    const finalHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      ...headers,
    };

    if (idToken) {
      finalHeaders['Authorization'] = `Bearer ${idToken}`;
    }

    const requestOptions: RequestInit = {
      method,
      headers: finalHeaders,
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error making request:', error);
    throw error;
  }
}

export function getFullMonthText(monthNumber: number) {
  const monthList = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return monthList[monthNumber];
}

export function getDaySuffix(day: number) {
  if (day < 1 || day > 31) {
    return 'Invalid day'; // Basic validation for day of the month
  }

  const specialCases = [11, 12, 13];
  const lastDigit = day % 10;
  const lastTwoDigits = day % 100;

  if (specialCases.includes(lastTwoDigits)) {
    return 'th';
  }

  switch (lastDigit) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}
export function buildDateStringForQueryParam(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let monthString = month.toString();
  let dayString = day.toString();

  if (month < 10) {
    monthString = '0' + month;
  }
  if (day < 10) {
    dayString = '0' + day;
  }

  return `${year}-${monthString}-${dayString}`;
}
