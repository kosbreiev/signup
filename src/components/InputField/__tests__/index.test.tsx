import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "@/components/InputField";
import { InputFieldProps } from "@/types/InputFieldProps";
import '@testing-library/jest-dom';

describe("InputField Component", () => {
  const setup = (props: Partial<InputFieldProps> = {}) => {
    const defaultProps: InputFieldProps = {
      name: "email",
      type: "text",
      value: "",
      onChange: jest.fn(),
      placeholder: "Enter your email",
      "aria-label": "Email input",
      validation: [{ label: "Valid email", condition: false }],
      submitted: false,
      showMessages: false,
      ...props,
    };
    return render(<InputField {...defaultProps} />);
  };

  it("renders input field correctly", () => {
    setup();
    const input = screen.getByPlaceholderText("Enter your email");
    expect(input).toBeInTheDocument();
  });

  it("displays the correct initial input type for email", () => {
    setup();
    const input = screen.getByPlaceholderText("Enter your email");
    expect(input).toHaveAttribute("type", "text");
  });

  it("renders password field with visibility toggle", () => {
    setup({ name: "password", type: "password", placeholder: "Create your password" });
    const input = screen.getByPlaceholderText("Create your password");
    const icon = screen.getByAltText("Show password");
    expect(input).toHaveAttribute("type", "password");
    expect(icon).toBeInTheDocument();
  });

  it("toggles password visibility when eye icon is clicked", () => {
    setup({ name: "password", type: "password", placeholder: "Create your password" });
    const input = screen.getByPlaceholderText("Create your password");
    const icon = screen.getByAltText("Show password");

    fireEvent.click(icon);
    expect(input).toHaveAttribute("type", "text");

    const hideIcon = screen.getByAltText("Hide password");
    fireEvent.click(hideIcon);
    expect(input).toHaveAttribute("type", "password");
  });

  it("displays validation messages when showMessages is true", () => {
    setup({
      showMessages: true,
      validation: [{ label: "Valid email", condition: false }],
    });

    const validationMessage = screen.getByText("Valid email");
    expect(validationMessage).toBeInTheDocument();
    expect(validationMessage).toHaveClass("initial");
  });

  it("shows success message when validation passes", () => {
    setup({
      showMessages: true,
      validation: [{ label: "Valid email", condition: true }],
      submitted: true,
    });

    const validationMessage = screen.getByText("Valid email");
    expect(validationMessage).toBeInTheDocument();
    expect(validationMessage).toHaveClass("success");
  });

  it("shows error message when validation fails after submission", () => {
    setup({
      showMessages: true,
      validation: [{ label: "Invalid email", condition: false }],
      submitted: true,
    });

    const validationMessage = screen.getByText("Invalid email");
    expect(validationMessage).toBeInTheDocument();
    expect(validationMessage).toHaveClass("error");
  });

  it("triggers the onChange handler when input value changes", () => {
    const onChange = jest.fn();
    setup({ onChange });
    
    const input = screen.getByPlaceholderText("Enter your email");
    fireEvent.change(input, { target: { value: "test@example.com" } });
    expect(onChange).toHaveBeenCalledWith(expect.anything());
  });
});
