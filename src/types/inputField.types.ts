import { InputHTMLAttributes } from "react";

export interface ValidationRule {
  label: string;
  condition: boolean;
}

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  validation?: ValidationRule[];
  showMessages?: boolean;
  submitted: boolean;
}
