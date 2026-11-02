import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

iziToast.settings({ timeout: 5000, position: 'topRight' });

const form = document.querySelector('.form');
const searchButton = form.querySelector('button');
const loadMoreButton = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
let query = '';
let page = 1;
let loadedImages = 0;
let isLoading = false;

form.addEventListener('submit', async event => {
  event.preventDefault();
  if (isLoading) return;

  const nextQuery = event.currentTarget.elements['search-text'].value.trim();
  if (!nextQuery) {
    iziToast.warning({ message: 'Please enter a search query.' });
    return;
  }

  query = nextQuery;
  page = 1;
  loadedImages = 0;
  clearGallery();
  hideLoadMoreButton();
  await loadImages();
});

loadMoreButton.addEventListener('click', async () => {
  if (isLoading) return;
  await loadImages();
});

async function loadImages() {
  isLoading = true;
  const isNextPage = page > 1;
  hideLoadMoreButton();
  showLoader();
  searchButton.disabled = true;

  try {
    const { hits, totalHits } = await getImagesByQuery(query, page);
    if (hits.length === 0 && !isNextPage) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(hits);
    loadedImages += hits.length;
    page += 1;

    if (loadedImages >= totalHits || hits.length === 0) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }

    if (isNextPage && hits.length > 0) {
      const { height } = gallery.firstElementChild.getBoundingClientRect();
      window.scrollBy({ top: height * 2, behavior: 'smooth' });
    }
  } catch {
    iziToast.error({
      message: 'Unable to load images. Please try again later.',
    });
    if (loadedImages > 0) showLoadMoreButton();
  } finally {
    hideLoader();
    searchButton.disabled = false;
    isLoading = false;
  }
}
