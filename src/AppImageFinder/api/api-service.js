import axios from 'axios';
const BASE_URL = `https://pixabay.com/api/`;
const KEY_PIXABAY = `15400175-8ce22b8808542891276b8dfa1`;

export const per_page = 12;

export default function apiService(searchQuery, page) {
  return axios
    .get(
      `${BASE_URL}?q=${searchQuery}&page=${page}&key=${KEY_PIXABAY}&image_type=photo&orientation=horizontal&per_page=${per_page}`
    )

    .then(response => {
      return response.data;
    })
    .catch(err => console.log(err));
}
