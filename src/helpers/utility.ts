import { LoginFormData } from '../hooks/useAuthForm';

export function isLoginFormPopulated(formData: LoginFormData) {
  if (formData.email && formData.password) return true;
  else return false;
}
