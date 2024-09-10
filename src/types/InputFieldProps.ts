export interface InputFieldProps {
    name: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    "aria-label": string;
    showMessages: boolean;
    validation?: {
      label: string;
      condition: boolean;
    }[];
    submitted: boolean;
  }
  