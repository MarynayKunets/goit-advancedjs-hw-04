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

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;
const PER_PAGE = 15;

form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSubmit(event) {
  event.preventDefault();

  const query = event.currentTarget.elements['search-text'].value.trim();

  if (!query) {
    return;
  }

  currentQuery = query;
  currentPage = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (!data.hits || data.hits.length === 0) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        backgroundColor: '#ef4040',
        messageColor: '#fafafb',
        maxWidth: '432px',
        timeout: 3000,
        close: true,
      });
      return;
    }

    createGallery(data.hits);

    const totalPages = Math.ceil(totalHits / PER_PAGE);

    if (currentPage < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        backgroundColor: '#4e75ff',
        messageColor: '#fafafb',
        maxWidth: '432px',
        timeout: 3000,
        close: true,
      });
    }
  } catch {
    iziToast.show({
      message: 'Something went wrong. Please try again!',
      position: 'topRight',
      backgroundColor: '#ef4040',
      messageColor: '#fafafb',
      maxWidth: '432px',
      timeout: 3000,
      close: true,
    });
  } finally {
    hideLoader();
    form.reset();
  }
}

async function handleLoadMore() {
  currentPage += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    createGallery(data.hits);

    const totalPages = Math.ceil(totalHits / PER_PAGE);

    if (currentPage < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        backgroundColor: '#4e75ff',
        messageColor: '#fafafb',
        maxWidth: '432px',
        timeout: 3000,
        close: true,
      });
    }

    smoothScroll();
  } catch {
    iziToast.show({
      message: 'Something went wrong. Please try again!',
      position: 'topRight',
      backgroundColor: '#ef4040',
      messageColor: '#fafafb',
      maxWidth: '432px',
      timeout: 3000,
      close: true,
    });
  } finally {
    hideLoader();
  }
}

function smoothScroll() {
  const card = document.querySelector('.gallery-item');

  if (!card) return;

  const cardHeight = card.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
