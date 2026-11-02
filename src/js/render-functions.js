import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loading');
const loadMoreButton = document.querySelector('.load-more');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const escapeAttribute = value =>
  String(value).replace(
    /[&<>"']/g,
    character =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[character]
  );

const createGalleryCardTemplate = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => `
  <li class="gallery-card">
    <a class="gallery-link" href="${escapeAttribute(largeImageURL)}">
      <img class="gallery-image" src="${escapeAttribute(webformatURL)}"
        alt="${escapeAttribute(tags)}" width="360" height="200" />
    </a>
    <ul class="additional-info">
      <li><p>Likes</p><span>${Number(likes)}</span></li>
      <li><p>Views</p><span>${Number(views)}</span></li>
      <li><p>Comments</p><span>${Number(comments)}</span></li>
      <li><p>Downloads</p><span>${Number(downloads)}</span></li>
    </ul>
  </li>
`;

export function createGallery(images) {
  gallery.insertAdjacentHTML(
    'beforeend',
    images.map(createGalleryCardTemplate).join('')
  );
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
  lightbox.refresh();
}

export function showLoader() {
  loader.classList.add('is-visible');
  gallery.setAttribute('aria-busy', 'true');
}

export function hideLoader() {
  loader.classList.remove('is-visible');
  gallery.setAttribute('aria-busy', 'false');
}

export function showLoadMoreButton() {
  loadMoreButton.classList.add('is-visible');
}

export function hideLoadMoreButton() {
  loadMoreButton.classList.remove('is-visible');
}
