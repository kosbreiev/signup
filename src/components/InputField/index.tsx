import React from 'react';
import { FC, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import { InputFieldProps } from "@/types/InputFieldProps";
import eyeIcon from "@/assets/eye.svg";
import eyeSlashIcon from "@/assets/eye-slash.svg";

const InputField: FC<InputFieldProps> = ({
  name,
  type,
  value,
  onChange,
  placeholder,
  "aria-label": ariaLabel,
  validation,
  submitted,
  showMessages,
}) => {
  const [inputType, setInputType] = useState<string>(type);
  const isPassword = name === "password";

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <div className={styles.wrapper}>
      <input
        name={name}
        type={inputType}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className={`${styles.input} ${
          validation?.every((el) => el.condition) && submitted ? styles.success : submitted ? styles.error : ""
        }`}
      />
      {isPassword && (
        <div className={styles.iconWrapper} onClick={togglePasswordVisibility}>
          <Image
            src={inputType === "password" ? eyeIcon : eyeSlashIcon}
            alt={inputType === "password" ? "Show password" : "Hide password"}
            width={24} 
            height={24} /* Adjusting the height / width, but also in the icon wrapper, can be refactored for consistency */
            priority={true}
          />
        </div>
      )}
      {showMessages && validation && (
        <div className={styles.inputFeedback}>
          {validation.map((el, index) => (
            <span
              key={index}
              className={
                el.condition
                  ? styles.success
                  : !submitted
                  ? styles.initial
                  : styles.error
              }
            >
              {el.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputField;
