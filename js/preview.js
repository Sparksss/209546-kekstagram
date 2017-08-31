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
    addClickHandler: function (picture, i) {
      picture.addEventListener('click', function (evt) {
        evt.preventDefault();
        window.onClickOpenGallery(i);
      });
    },
    closePopup: function () {
      window.preview.galleryOverlay.classList.add(window.collectionData.CLASS_HIDDEN);
    }
  };
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.collectionData.ESCAPE_KEYCODE) {
      window.picturesPreview.closePopup();
    }
  });
  window.preview.galleryOverlay.addEventListener('keydown', function (evt) {
    if (evt.target.classList.contains(window.picturesPreview.checkCloseGallery) && evt.keyCode === window.collectionData.ENTER_KEYCODE) {
      window.picturesPreview.closePopup();
    }
  });
  window.picturesPreview.closeGallery.addEventListener('click', function () {
    window.picturesPreview.closePopup();
  });
})();
