'use strict';

(function () {
  var croppingForm = document.querySelector('.upload-overlay');
  croppingForm.classList.add(window.collectionData.CLASS_HIDDEN);
  window.preview.similarPictureElement.appendChild(window.preview.getRenderPhotos());
  var pictures = window.preview.similarPictureElement.querySelectorAll('.picture');
  var lengthPictureCollection = pictures.length;
  var onClickOpenGallery = function (index) {
    window.picturesPreview.showPhoto(window.photoGallery[index]);
    window.preview.galleryOverlay.classList.remove(window.collectionData.CLASS_HIDDEN);
  };
  var addClickHandler = function (picture, i) {
    picture.addEventListener('click', function (evt) {
      evt.preventDefault();
      onClickOpenGallery(i);
    });
  };

  for (var i = 0; i < lengthPictureCollection; i++) {
    addClickHandler(pictures[i], i);
  }
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
