import * as React from "react";
import { useNavigation, useSegments } from "expo-router";
import { render, fireEvent } from "@testing-library/react-native";
import { BottomNavigation } from "../BottomNavigation";

jest.mock("expo-router", () => ({
  useNavigation: jest.fn(),
  useSegments: jest.fn(),
}));

describe("BottomNavigation", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
    (useSegments as jest.Mock).mockReturnValue(["", "home"]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText } = render(<BottomNavigation />);
    expect(getByText("Home")).toBeTruthy();
    expect(getByText("Search")).toBeTruthy();
    expect(getByText("Your Library")).toBeTruthy();
  });

  it("navigates to the home page when the home button is pressed", () => {
    const { getByText } = render(<BottomNavigation />);
    const homeButton = getByText("Home").parent;
    fireEvent.press(homeButton);
    expect(mockNavigate).toHaveBeenCalledWith("home");
  });

  it("navigates to the search page when the search button is pressed", () => {
    const { getByText } = render(<BottomNavigation />);
    const searchButton = getByText("Search").parent;
    fireEvent.press(searchButton);
    expect(mockNavigate).toHaveBeenCalledWith("search");
  });

  it("navigates to the library page when the library button is pressed", () => {
    const { getByText } = render(<BottomNavigation />);
    const libraryButton = getByText("Your Library").parent;
    fireEvent.press(libraryButton);
    expect(mockNavigate).toHaveBeenCalledWith("library");
  });

  it("sets the active state for the current page", () => {
    (useSegments as jest.Mock).mockReturnValue(["", "search"]);
    const { getByText } = render(<BottomNavigation />);
    const styles = getByText("Search").parent.props.style;

    expect(styles[1]).not.toEqual(undefined);
    expect(styles[0].color).not.toEqual(styles[1].color);
  });
});
