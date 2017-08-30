'use strict';

(function () {
  window.picturesPreview = {
    closeGallery: window.preview.galleryOverlay.querySelector('.gallery-overlay-close'),
    checkCloseGallery: 'gallery-overlay-close',
    showPhoto: function (pictureElement) {
      window.preview.galleryOverlay.querySelector('.gallery-overlay-image').src = pictureElement.url;
      window.preview.galleryOverlay.querySelector('.likes-count').textContent = pictureElement.likes;
      window.preview.galleryOverlay.querySelector('.comments-count').textContent = pictureElement.comments.length;
    },
    closePopup: function () {
      window.preview.galleryOverlay.classList.add(window.collectionData.CLASS_HIDDEN);
    }
  };
})();
