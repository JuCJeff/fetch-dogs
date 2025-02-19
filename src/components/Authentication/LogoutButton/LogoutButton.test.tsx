import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useAuth } from "../../../hooks/useAuth";
import LogoutButton from "./LogoutButton";

jest.mock("../../../hooks/useAuth", () => ({
  useAuth: jest.fn(() => ({ logout: jest.fn() })),
}));

describe("LogoutButton", () => {
  test("renders the logout button", () => {
    (useAuth as jest.Mock).mockReturnValue({ logout: jest.fn() });

    render(<LogoutButton />);

    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
  });

  test("calls logout function when clicked", async () => {
    const mockLogout = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({ logout: mockLogout });

    render(<LogoutButton />);

    const button = screen.getByRole("button", { name: "Logout" });
    fireEvent.click(button);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  test("handles logout failure gracefully", async () => {
    const mockLogout = jest.fn().mockRejectedValue(new Error("Logout failed"));
    (useAuth as jest.Mock).mockReturnValue({ logout: mockLogout });

    render(<LogoutButton />);

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {}); // Silence console.error
    const button = screen.getByRole("button", { name: "Logout" });

    fireEvent.click(button);

    expect(mockLogout).toHaveBeenCalledTimes(1);
    await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for async operation

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Logout failed:",
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore(); // Restore original console.error behavior
  });
});
