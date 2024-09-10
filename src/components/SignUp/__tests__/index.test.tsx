import { render, screen, fireEvent } from "@testing-library/react";
import Signup from "@/components/SignUp";
import '@testing-library/jest-dom';

describe("Signup Component", () => {
  beforeAll(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  const setup = () => {
    return render(<Signup />);
  };

  it("renders the signup form correctly", () => {
    setup();
    expect(screen.getByRole("heading", { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Create your password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });

  it("displays validation messages for email and password when submitted without input", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(screen.getByText("8 characters or more (no spaces)")).toBeInTheDocument();
    expect(screen.getByText("Uppercase and lowercase letters")).toBeInTheDocument();
    expect(screen.getByText("At least one digit")).toBeInTheDocument();
  });

  it("shows validation errors when email or password is invalid", () => {
    setup();
    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Create your password");

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.change(passwordInput, { target: { value: "short" } });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(screen.getByText("8 characters or more (no spaces)")).toHaveClass("error");
    expect(screen.getByText("Uppercase and lowercase letters")).toHaveClass("error");
  });

  it("shows success message when both email and password are valid", () => {
    setup();
    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Create your password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "ValidPass1" } });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(screen.getByText("8 characters or more (no spaces)")).toHaveClass("success");
    expect(screen.getByText("Uppercase and lowercase letters")).toHaveClass("success");
  });

  it("triggers window alert when form is successfully submitted", () => {
    setup();

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Create your password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "ValidPass1" } });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(window.alert).toHaveBeenCalledWith("Successful sign up");
  });
});
