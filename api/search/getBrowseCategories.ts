import axios from 'axios';

import { BrowseCategoryModel } from '@models';
import { BrowseCategoriesResponseType } from '@config';
import { parseToBrowseCategories } from '@utils';

import { getSessionlessToken } from '../getSessionlessToken';

export const getBrowseCategories = async (
  limit: number = 50,
  offset: number = 0
): Promise<BrowseCategoryModel[]> => {
  try {
    const { token } = await getSessionlessToken();

    const response = (await axios.get(
      'https://api.spotify.com/v1/browse/categories',
      {
        params: { limit, offset },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )) as { data: { categories: BrowseCategoriesResponseType } };

    return parseToBrowseCategories(response.data.categories.items);
  } catch (error) {
    console.error('Error fetching browse categories', error);
    throw error;
  }
};
