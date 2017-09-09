'use strict';

(function () {
  var loadGallery = function (photoCollection) {
    var similarPictureElement = document.querySelector('.pictures');
    var croppingForm = document.querySelector('.upload-overlay');
    croppingForm.classList.add(window.utils.CLASS_HIDDEN);
    similarPictureElement.appendChild(window.pictures.getRenderPhotos(photoCollection));
    var pictures = similarPictureElement.querySelectorAll('.picture');
    var lengthPictureCollection = pictures.length;

    for (var i = 0; i < lengthPictureCollection; i++) {
      window.preview.addClickHandler(pictures[i], photoCollection[i]);
    }
    var filters = document.querySelector('.filters');
    filters.classList.remove(window.utils.CLASS_HIDDEN);
  };
  window.backend.load(loadGallery, window.backend.showError);
})();
