import { LoginFormData } from '../hooks/useLoginForm';
import { RegisterFormData } from '../hooks/useRegisterForm';

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
