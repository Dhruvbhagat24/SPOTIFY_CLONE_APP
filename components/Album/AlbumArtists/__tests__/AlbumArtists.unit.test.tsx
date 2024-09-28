import * as React from "react";
import { useRouter } from "expo-router";
import {
  render,
  fireEvent,
  RenderResult,
  within,
} from "@testing-library/react-native";
import { AlbumArtists, AlbumArtistsPropsType } from "../AlbumArtists";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("AlbumArtists", () => {
  const mockRouter = jest.fn();
  const defaultProps: AlbumArtistsPropsType = {
    artists: [
      {
        type: "artist",
        id: "_id_1",
        name: "Artist Name 2 mock",
        followers: { href: "Url mock", total: 12 },
        genres: ["genre1", "genre2"],
        images: [
          {
            url: "imageUrl mock",
            height: 100,
            width: 100,
          },
          {
            url: "imageUrl mock",
            height: 100,
            width: 100,
          },
          {
            url: "imageUrl mock",
            height: 100,
            width: 100,
          },
        ],
        popularity: 78,
      },
      {
        type: "artist",
        id: "_id_2",
        name: "Artist Name 2 mock",
        followers: { href: "Url mock", total: 25 },
        genres: ["genre1", "genre2"],
        images: [
          {
            url: "imageUrl mock",
            height: 100,
            width: 100,
          },
          {
            url: "imageUrl mock",
            height: 100,
            width: 100,
          },
          {
            url: "imageUrl mock",
            height: 100,
            width: 100,
          },
        ],
        popularity: 24,
      },
    ],
  };
  let container: RenderResult;

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouter });
    container = render(<AlbumArtists {...defaultProps} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    expect(
      container.getByTestId(`artist-link-${defaultProps.artists[0].id}`)
    ).toBeTruthy();
    expect(
      container.getByTestId(`artist-link-${defaultProps.artists[1].id}`)
    ).toBeTruthy();
  });

  describe("Navigation - Press logic", () => {
    it("navigates to the first artist page with given ID", () => {
      const artist1Id = defaultProps.artists[0].id;
      const artist1 = container.getByTestId(`artist-link-${artist1Id}`);

      fireEvent.press(artist1);
      expect(mockRouter).toHaveBeenCalledWith(`/artists/${artist1Id}`);
    });

    it("navigates to the first artist page with given ID", () => {
      const artist2Id = defaultProps.artists[1].id;
      const artist2 = container.getByTestId(`artist-link-${artist2Id}`);

      fireEvent.press(artist2);
      expect(mockRouter).toHaveBeenCalledWith(`/artists/${artist2Id}`);
    });
  });

  describe("UI", () => {
    it("passes properly props to Image component for first artist", () => {
      const Images = container.getAllByTestId("artist-image");

      Images.forEach((Image, i) => {
        const currentImageProp = defaultProps.artists[i].images[1];
        expect(Image.props.source.uri).toEqual(currentImageProp.url);
      });
    });

    it("displays artist name(s) inside Text components", () => {
      const Texts = container.getAllByTestId("artist-name");

      Texts.forEach((Text, i) => {
        expect(
          within(Text).queryByText(defaultProps.artists[i].name)
        ).toBeTruthy();
      });
    });
  });
});
