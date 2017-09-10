'use strict';

(function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var closeGallery = galleryOverlay.querySelector('.gallery-overlay-close');
  var checkCloseGallery = 'gallery-overlay-close';
  window.preview = {
    onClickOpenGallery: function (photo) {
      showPhoto(photo);
      galleryOverlay.classList.remove(window.utils.CLASS_HIDDEN);
    }
  };
  var showPhoto = function (pictureElement) {
    galleryOverlay.querySelector('.gallery-overlay-image').src = pictureElement.querySelector('img').src;
    galleryOverlay.querySelector('.likes-count').textContent = pictureElement.querySelector('.picture-likes').textContent;
    galleryOverlay.querySelector('.comments-count').textContent = pictureElement.querySelector('.picture-comments').textContent;
  };
  var closePopup = function () {
    galleryOverlay.classList.add(window.utils.CLASS_HIDDEN);
  };
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ESCAPE_KEYCODE) {
      closePopup();
    }
  });
  galleryOverlay.addEventListener('keydown', function (evt) {
    if (evt.target.classList.contains(checkCloseGallery) && evt.keyCode === window.utils.ENTER_KEYCODE) {
      closePopup();
    }
  });
  closeGallery.addEventListener('click', function () {
    closePopup();
  });
})();
