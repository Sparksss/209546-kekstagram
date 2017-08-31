'use strict';

(function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  window.picturesPreview = {
    closeGallery: galleryOverlay.querySelector('.gallery-overlay-close'),
    checkCloseGallery: 'gallery-overlay-close',
    showPhoto: function (pictureElement) {
      galleryOverlay.querySelector('.gallery-overlay-image').src = pictureElement.url;
      galleryOverlay.querySelector('.likes-count').textContent = pictureElement.likes;
      galleryOverlay.querySelector('.comments-count').textContent = pictureElement.comments.length;
    },
    addClickHandler: function (picture, i) {
      picture.addEventListener('click', function (evt) {
        evt.preventDefault();
        window.onClickOpenGallery(i);
      });
    },
    closePopup: function () {
      galleryOverlay.classList.add(window.collectionData.CLASS_HIDDEN);
    }
  };
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.collectionData.ESCAPE_KEYCODE) {
      window.picturesPreview.closePopup();
    }
  });
  galleryOverlay.addEventListener('keydown', function (evt) {
    if (evt.target.classList.contains(window.picturesPreview.checkCloseGallery) && evt.keyCode === window.collectionData.ENTER_KEYCODE) {
      window.picturesPreview.closePopup();
    }
  });
  window.picturesPreview.closeGallery.addEventListener('click', function () {
    window.picturesPreview.closePopup();
  });
})();
