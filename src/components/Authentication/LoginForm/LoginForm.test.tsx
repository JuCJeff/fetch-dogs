import { render, fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom";

import LoginForm from "./LoginForm";
import { useAuth } from "../../../hooks/useAuth";

jest.mock("../../../hooks/useAuth", () => ({
  useAuth: jest.fn(() => ({ login: jest.fn() })),
}));

describe("LoginForm", () => {
  test("redners correctly", () => {
    render(<LoginForm />);

    expect(screen.getByText("Fetch Dogs")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });
});

test("allows the user to type into input fields", () => {
  render(<LoginForm />);

  const nameInput = screen.getByLabelText<HTMLInputElement>("Name");
  const emailInput = screen.getByLabelText<HTMLInputElement>("Email");

  fireEvent.change(nameInput, { target: { value: "John Doe" } });
  fireEvent.change(emailInput, { target: { value: "john@example.com" } });

  expect(nameInput.value).toBe("John Doe");
  expect(emailInput.value).toBe("john@example.com");
});

test("calls login function with correct values when submitted", () => {
  const mockLogin = jest.fn();
  (useAuth as jest.Mock).mockReturnValue({ login: mockLogin });

  render(<LoginForm />);

  const nameInput = screen.getByLabelText("Name");
  const emailInput = screen.getByLabelText("Email");
  const submitButton = screen.getByRole("button", { name: "Login" });

  fireEvent.change(nameInput, { target: { value: "John Doe" } });
  fireEvent.change(emailInput, { target: { value: "john@example.com" } });
  fireEvent.click(submitButton);

  expect(mockLogin).toHaveBeenCalledWith("John Doe", "john@example.com");
  expect(mockLogin).toHaveBeenCalledTimes(1);
});
