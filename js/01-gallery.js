import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');
gallery.innerHTML= galleryItems.map(({ preview, original, description }) => {
        return `<div class="gallery__item">
                    <a class="gallery__link" href="${original}">
                    <img
                        class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                    />
                    </a>
                </div>`;
      })
      .join('');
gallery.addEventListener('click', openInstanceModal);

let galleryIndex;

function openInstanceModal(e) {
    e.preventDefault();

    console.log(e)
    const selected = (element) => element.description == e.target.alt;
    galleryIndex=galleryItems.findIndex(selected);

    instance.element().querySelector('img').src = e.target.dataset.source;
    instance.show();
}

const instance = basicLightbox.create(
  `
      <img src="" />
  `,
  {
    onShow: () => {

      document.addEventListener('keydown', escBtnHandler);
    },
    onClose: () => {

      document.removeEventListener('keydown', escBtnHandler);
    },
  }
);

function escBtnHandler(e) {
  if (e.key === 'Escape') {

    instance.close();
  }
  else if (e.keyCode === 37 || e.keyCode === 38) {
    if(galleryIndex>0){

        instance.element().querySelector('img').src = galleryItems[galleryIndex].original;
    }
  }
  else if (e.keyCode === 39 || e.keyCode === 40) {

    if(galleryIndex<galleryItems.length-1){

        instance.element().querySelector('img').src = galleryItems[galleryIndex].original;
    }
  }
//   else if (e.keyCode === '39') {
//     instance.close();
//   }
}

