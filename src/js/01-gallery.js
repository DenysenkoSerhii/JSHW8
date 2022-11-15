// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const galleryContainerEl = document.querySelector('.gallery');

galleryContainerEl.innerHTML = createGalleryMarkup(galleryItems);

addAttributesForSimpleLightbox(galleryContainerEl);
addLazyloadToImg();
const lightbox = new SimpleLightbox('.gallery > a', { captionDelay: 250 });

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<a 
        class="gallery__item" 
      href="${original}">
  <img class="gallery__image" 
  src="${preview}" 
  alt="${description}" />
</a>`;
    })
    .join('');
}

function addAttributesForSimpleLightbox(galleryEl) {
  [...galleryEl.getElementsByTagName('a')].map(el => {
    const imgEl = el.getElementsByTagName('img')[0];
    imgEl.title = imgEl.alt;
  });
}

function addLazyloadToImg() {
  let lazyImages = document.querySelectorAll('.gallery__image');

  if ('loading' in HTMLImageElement.prototype) {
    lazyImages.forEach(imgEl => {
      imgEl.classList.add('lazyload');
      imgEl.dataset.src = imgEl.parentElement.href;
    });
  } else {
    const lazyScript = document.createElement('script');

    lazyScript.src =
      'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    lazyScript.integrity =
      'sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==';
    lazyScript.crossorigin = 'anonymous';
    lazyScript.referrerpolicy = 'no-referrer';
    document.body.appendChild(lazyScript);
  }
}
