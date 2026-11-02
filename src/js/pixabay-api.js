import axios from 'axios';

const apiKey = '58027873-0f60407f98d7447dcb5a9b541';
const baseUrl = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page) {
  const response = await axios.get(baseUrl, {
    params: {
      key: apiKey,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: 15,
    },
  });
  return response.data;
}
