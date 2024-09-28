import * as React from "react";
import { render, RenderResult, within } from "@testing-library/react-native";
import { AlbumCopyrights, AlbumCopyrightsPropsType } from "../AlbumCopyrights";
import { COPYRIGHT_SIGN, SOUND_COPYRIGHT_SIGN } from "@config";

describe("AlbumCopyrights", () => {
  const defaultProps: AlbumCopyrightsPropsType = {
    copyrights: [
      {
        text: `${SOUND_COPYRIGHT_SIGN} copyright mock 1`,
        type: "P",
      },
      {
        text: `${COPYRIGHT_SIGN} copyright mock 2`,
        type: "C",
      },
    ],
  };
  let container: RenderResult;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    container = render(<AlbumCopyrights {...defaultProps} />);
    expect(container.getByTestId("copyright-view")).toBeTruthy();
  });

  describe("UI", () => {
    it("displays all copyright texts without changing content", () => {
      container = render(<AlbumCopyrights {...defaultProps} />);

      const firstText = container.getByTestId("copyright-text-0");
      const secondText = container.getByTestId("copyright-text-1");

      expect(
        within(firstText).getByText(defaultProps.copyrights[0].text)
      ).toBeTruthy();
      expect(
        within(secondText).getByText(defaultProps.copyrights[1].text)
      ).toBeTruthy();
    });

    it("displays all copyright texts and adds the missing C type copyright sign", () => {
      const props = {
        copyrights: [
          {
            text: `${SOUND_COPYRIGHT_SIGN} copyright mock 1`,
            type: "P",
          },
          {
            text: "copyright mock 2",
            type: "C",
          },
        ],
      };
      container = render(<AlbumCopyrights {...props} />);

      const firstText = container.getByTestId("copyright-text-0");
      const secondText = container.getByTestId("copyright-text-1");

      expect(
        within(firstText).getByText(props.copyrights[0].text)
      ).toBeTruthy();
      expect(
        within(secondText).queryByText(props.copyrights[1].text)
      ).toBeFalsy();
      expect(
        within(secondText).getByText(
          `${COPYRIGHT_SIGN} ${props.copyrights[1].text}`
        )
      ).toBeTruthy();
    });

    it("displays all copyright texts and adds the missing P type copyright sign", () => {
      const props = {
        copyrights: [
          {
            text: "copyright mock 1",
            type: "P",
          },
          {
            text: `${COPYRIGHT_SIGN} copyright mock 2`,
            type: "C",
          },
        ],
      };
      container = render(<AlbumCopyrights {...props} />);

      const firstText = container.getByTestId("copyright-text-0");
      const secondText = container.getByTestId("copyright-text-1");

      expect(
        within(firstText).getByText(
          `${SOUND_COPYRIGHT_SIGN} ${props.copyrights[0].text}`
        )
      ).toBeTruthy();
      expect(
        within(firstText).queryByText(props.copyrights[0].text)
      ).toBeFalsy();
      expect(
        within(secondText).getByText(props.copyrights[1].text)
      ).toBeTruthy();
    });
  });
});
