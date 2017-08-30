'use strict';

(function () {
  window.picturesPreview = {
    closeGallery: window.preview.galleryOverlay.querySelector('.gallery-overlay-close'),
    checkCloseGallery: 'gallery-overlay-close',
    showPhoto: function (picture) {
      window.preview.galleryOverlay.querySelector('.gallery-overlay-image').src = picture.querySelector('img').src;
      window.preview.galleryOverlay.querySelector('.likes-count').textContent = picture.querySelector('.picture-likes').textContent;
      window.preview.galleryOverlay.querySelector('.comments-count').textContent = picture.querySelector('.picture-comments').textContent;
    },
    closePopup: function () {
      window.preview.galleryOverlay.classList.add(window.collectionData.CLASS_HIDDEN);
      document.removeEventListener('keydown', window.utils.onPopupEscPress);
    }
  };
})();
