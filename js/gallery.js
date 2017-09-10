'use strict';

(function () {
  var similarPictureElement = document.querySelector('.pictures');
  var croppingForm = document.querySelector('.upload-overlay');
  croppingForm.classList.add(window.utils.CLASS_HIDDEN);
  var filters = document.querySelector('.filters');
  filters.classList.remove(window.utils.CLASS_HIDDEN);

  var loadGallery = function (photoCollection) {
    similarPictureElement.appendChild(window.pictures.getRenderPhotos(photoCollection));
    similarPictureElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (evt.target.parentNode.classList.contains('picture')) {
        window.preview.onClickOpenGallery(evt.target.parentNode);
      }
    });
    filters.querySelector('#filter-popular').addEventListener('click', function () {
      photoCollection.sort(function (left, right) {
        if (left.likes < right.likes) {
          return 1;
        } else if (left.likes > right.likes) {
          return -1;
        } else {
          return 0;
        }
      });
      similarPictureElement.innerHTML = '';
      similarPictureElement.appendChild(window.pictures.getRenderPhotos(photoCollection));
    });
    filters.querySelector('#filter-discussed').addEventListener('click', function () {
      photoCollection.sort(function (left, right) {
        if (left.comments.length < right.comments.length) {
          return 1;
        } else if (left.comments.length > right.comments.length) {
          return -1;
        } else {
          return 0;
        }
      });
      similarPictureElement.innerHTML = '';
      similarPictureElement.appendChild(window.pictures.getRenderPhotos(photoCollection));
    });
  };
  window.backend.load(loadGallery, window.backend.showError);
})();
