import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '55309008-edb7c4bb1c6dba6c84cf593ac';

export async function getImagesByQuery(query, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 15,
  });

  const response = await axios.get(`${BASE_URL}?${params}`);
  return response.data;
}
