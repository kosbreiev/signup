import React from 'react';
import { ChangeEvent, FC, FormEvent, useState } from "react";
import InputField from "../InputField";
import styles from "./styles.module.scss";

type FormValues = { email: string; password: string };

const Signup: FC = () => {
  const [state, setState] = useState<FormValues>({ email: "", password: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validation = {
    email: [
      {
        label: /\S+@\S+\.\S+/.test(state.email) ? "" : "",
        condition: /\S+@\S+\.\S+/.test(state.email),
      },
    ],
    password: [
      { label: "8 characters or more (no spaces)", condition: state.password.length >= 8 },
      {
        label: "Uppercase and lowercase letters",
        condition: /[A-Z]/.test(state.password) && /[a-z]/.test(state.password),
      },
      { label: "At least one digit", condition: /\d/.test(state.password) },
    ],
  };

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    setFormSubmitted(false);
    setState({ ...state, [name]: value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (validation.email.every((el) => el.condition) && validation.password.every((el) => el.condition)) {
      window.alert("Successful sign up");
    }
  };

  return (
    <form noValidate onSubmit={onSubmit} className={styles.container}>
      <div className={styles.form}>
        <h2 className={styles.title}>Sign up</h2>
        <div className={styles.inputs}>
          <InputField
            name="email"
            type="email"
            value={state.email}
            onChange={handleChange}
            placeholder="Enter your email"
            aria-label="Email input"
            validation={validation.email}
            submitted={formSubmitted}
            showMessages={true}
          />
          <InputField
            name="password"
            type="password"
            placeholder="Create your password"
            aria-label="Password input"
            onChange={handleChange}
            value={state.password}
            validation={validation.password}
            submitted={formSubmitted}
            showMessages={true} 
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Sign up
        </button>
      </div>
    </form>
  );
};

export default Signup;
