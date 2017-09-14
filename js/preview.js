'use strict';

(function () {
  var CHECK_CLOSE_GALLERY = 'gallery-overlay-close';
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var closeGallery = galleryOverlay.querySelector('.gallery-overlay-close');
  window.preview = {
    onClickOpenGallery: function (photo) {
      showPhoto(photo);
      galleryOverlay.classList.remove(window.utils.CLASS_HIDDEN);
      document.addEventListener('keydown', onEscPress);
    }
  };
  var showPhoto = function (pictureElement) {
    galleryOverlay.querySelector('.gallery-overlay-image').src = pictureElement.querySelector('img').src;
    galleryOverlay.querySelector('.likes-count').textContent = pictureElement.querySelector('.picture-likes').textContent;
    galleryOverlay.querySelector('.comments-count').textContent = pictureElement.querySelector('.picture-comments').textContent;
  };

  var onEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESCAPE_KEYCODE) {
      closePopup();
    }
  };

  var closePopup = function () {
    galleryOverlay.classList.add(window.utils.CLASS_HIDDEN);
    document.removeEventListener('keydown', onEscPress);
  };

  galleryOverlay.addEventListener('keydown', function (evt) {
    if (evt.target.classList.contains(CHECK_CLOSE_GALLERY) && evt.keyCode === window.utils.ENTER_KEYCODE) {
      closePopup();
    }
  });
  closeGallery.addEventListener('click', function () {
    closePopup();
  });
})();
