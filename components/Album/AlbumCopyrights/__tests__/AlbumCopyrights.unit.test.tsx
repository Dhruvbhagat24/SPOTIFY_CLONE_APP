import * as React from 'react';
import { render, RenderResult, within } from '@testing-library/react-native';
import { AlbumCopyrights, AlbumCopyrightsPropsType } from '../AlbumCopyrights';
import { COPYRIGHT_SIGN, SOUND_COPYRIGHT_SIGN } from '@config';

enum TEST_IDS {
  COPYRIGHT_VIEW = 'copyright-view',
  COPYRIGHT_TEXT_0 = 'copyright-text-0',
  COPYRIGHT_TEXT_1 = 'copyright-text-1',
}

describe('AlbumCopyrights', () => {
  let container: RenderResult;
  const defaultProps: AlbumCopyrightsPropsType = {
    copyrights: [
      {
        text: `${SOUND_COPYRIGHT_SIGN} copyright mock 1`,
        type: 'P',
      },
      {
        text: `${COPYRIGHT_SIGN} copyright mock 2`,
        type: 'C',
      },
    ],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    container = render(<AlbumCopyrights {...defaultProps} />);
    expect(container.getByTestId(TEST_IDS.COPYRIGHT_VIEW)).toBeTruthy();
  });

  describe('UI', () => {
    it('displays all copyright texts without changing content', () => {
      container = render(<AlbumCopyrights {...defaultProps} />);

      const firstText = container.getByTestId(TEST_IDS.COPYRIGHT_TEXT_0);
      const secondText = container.getByTestId(TEST_IDS.COPYRIGHT_TEXT_1);

      expect(
        within(firstText).getByText(defaultProps.copyrights[0].text)
      ).toBeTruthy();
      expect(
        within(secondText).getByText(defaultProps.copyrights[1].text)
      ).toBeTruthy();
    });

    it('displays all copyright texts and adds the missing C type copyright sign', () => {
      const props = {
        copyrights: [
          {
            text: `${SOUND_COPYRIGHT_SIGN} copyright mock 1`,
            type: 'P',
          },
          {
            text: 'copyright mock 2',
            type: 'C',
          },
        ],
      };
      container = render(<AlbumCopyrights {...props} />);

      const firstText = container.getByTestId(TEST_IDS.COPYRIGHT_TEXT_0);
      const secondText = container.getByTestId(TEST_IDS.COPYRIGHT_TEXT_1);

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

    it('displays all copyright texts and adds the missing P type copyright sign', () => {
      const props = {
        copyrights: [
          {
            text: 'copyright mock 1',
            type: 'P',
          },
          {
            text: `${COPYRIGHT_SIGN} copyright mock 2`,
            type: 'C',
          },
        ],
      };
      container = render(<AlbumCopyrights {...props} />);

      const firstText = container.getByTestId(TEST_IDS.COPYRIGHT_TEXT_0);
      const secondText = container.getByTestId(TEST_IDS.COPYRIGHT_TEXT_1);

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
