'use strict';

(function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var closeGallery = galleryOverlay.querySelector('.gallery-overlay-close');
  var checkCloseGallery = 'gallery-overlay-close';
  window.preview = {
    addClickHandler: function (picture, i) {
      picture.addEventListener('click', function (evt) {
        evt.preventDefault();
        onClickOpenGallery(i);
      });
    }
  };
  var showPhoto = function (pictureElement) {
    galleryOverlay.querySelector('.gallery-overlay-image').src = pictureElement.url;
    galleryOverlay.querySelector('.likes-count').textContent = pictureElement.likes;
    galleryOverlay.querySelector('.comments-count').textContent = pictureElement.comments.length;
  };
  var closePopup = function () {
    galleryOverlay.classList.add(window.collectionData.CLASS_HIDDEN);
  };
  var onClickOpenGallery = function (index) {
    showPhoto(window.photoGallery[index]);
    galleryOverlay.classList.remove(window.collectionData.CLASS_HIDDEN);
  };
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.collectionData.ESCAPE_KEYCODE) {
      closePopup();
    }
  });
  galleryOverlay.addEventListener('keydown', function (evt) {
    if (evt.target.classList.contains(checkCloseGallery) && evt.keyCode === window.collectionData.ENTER_KEYCODE) {
      closePopup();
    }
  });
  closeGallery.addEventListener('click', function () {
    closePopup();
  });
})();
