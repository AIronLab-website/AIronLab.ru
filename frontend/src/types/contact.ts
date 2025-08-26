export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  agreement: boolean;
}

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  agreement?: string;
} 