'use strict';

(function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  window.preview = {
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
        onClickOpenGallery(i);
      });
    },
    closePopup: function () {
      galleryOverlay.classList.add(window.collectionData.CLASS_HIDDEN);
    }
  };
  var onClickOpenGallery = function (index) {
    window.preview.showPhoto(window.photoGallery[index]);
    galleryOverlay.classList.remove(window.collectionData.CLASS_HIDDEN);
  };
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.collectionData.ESCAPE_KEYCODE) {
      window.preview.closePopup();
    }
  });
  galleryOverlay.addEventListener('keydown', function (evt) {
    if (evt.target.classList.contains(window.preview.checkCloseGallery) && evt.keyCode === window.collectionData.ENTER_KEYCODE) {
      window.preview.closePopup();
    }
  });
  window.preview.closeGallery.addEventListener('click', function () {
    window.preview.closePopup();
  });
})();
