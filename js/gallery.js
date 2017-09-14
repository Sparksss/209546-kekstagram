'use strict';

(function () {
  var similarPictureElement = document.querySelector('.pictures');
  var croppingForm = document.querySelector('.upload-overlay');
  croppingForm.classList.add(window.utils.CLASS_HIDDEN);
  var filters = document.querySelector('.filters');

  var loadGallery = function (photos) {
    similarPictureElement.appendChild(window.pictures.getRenderPhotos(photos));
    similarPictureElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (evt.target.parentNode.classList.contains('picture')) {
        window.preview.onClickOpenGallery(evt.target.parentNode);
      }
    });
    filters.classList.remove(window.utils.CLASS_HIDDEN);
    filters.addEventListener('change', function (evt) {
      window.utils.withHolding(function () {
        renderFilters(evt.target.value);
      });
    });
    var renderFilters = function (value) {
      var copiesOfPhotos = photos.slice(0);
      switch (value) {
        case 'popular':
          copiesOfPhotos.sort(function (left, right) {
            if (left.likes < right.likes) {
              return 1;
            } else if (left.likes > right.likes) {
              return -1;
            } else {
              return 0;
            }
          });
          break;
        case 'discussed':
          copiesOfPhotos.sort(function (left, right) {
            if (left.comments.length < right.comments.length) {
              return 1;
            } else if (left.comments.length > right.comments.length) {
              return -1;
            } else {
              return 0;
            }
          });
          break;
        case 'random':
          copiesOfPhotos.sort(function () {
            return 0.5 - Math.random();
          });
          break;
      }
      similarPictureElement.innerHTML = '';
      similarPictureElement.appendChild(window.pictures.getRenderPhotos(copiesOfPhotos));
    };

  };
  window.backend.load(loadGallery, window.backend.showError);
})();
