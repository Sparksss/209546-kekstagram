'use strict';

(function () {
  var similarPictureElement = document.querySelector('.pictures');
  var croppingForm = document.querySelector('.upload-overlay');
  croppingForm.classList.add(window.collectionData.CLASS_HIDDEN);
  similarPictureElement.appendChild(window.backend.load('https://1510.dump.academy/kekstagram/data', window.pictures.getRenderPhotos));
  var pictures = similarPictureElement.querySelectorAll('.picture');
  var lengthPictureCollection = pictures.length;

  for (var i = 0; i < lengthPictureCollection; i++) {
    window.preview.addClickHandler(pictures[i], i);
  }
})();
