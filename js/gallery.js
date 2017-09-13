'use strict';

(function () {
  var similarPictureElement = document.querySelector('.pictures');
  var croppingForm = document.querySelector('.upload-overlay');
  croppingForm.classList.add(window.utils.CLASS_HIDDEN);
  var filters = document.querySelector('.filters');

  var loadGallery = function (photosDataList) {
    similarPictureElement.appendChild(window.pictures.getRenderPhotos(photosDataList));
    similarPictureElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (evt.target.parentNode.classList.contains('picture')) {
        window.preview.onClickOpenGallery(evt.target.parentNode);
      }
    });
    filters.classList.remove(window.utils.CLASS_HIDDEN);
    filters.addEventListener('change', function (evt) {
      window.utils.debounce(function () {
        renderFilters(evt.target.value);
      });
    });
    var renderFilters = function (value) {
      var copiesOfCollections = photosDataList.slice(0);
      switch (value) {
        case 'popular':
          copiesOfCollections.sort(function (left, right) {
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
          copiesOfCollections.sort(function (left, right) {
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
          copiesOfCollections.sort(function () {
            return 0.5 - Math.random();
          });
          break;
      }
      similarPictureElement.innerHTML = '';
      similarPictureElement.appendChild(window.pictures.getRenderPhotos(copiesOfCollections));
    };

  };
  window.backend.load(loadGallery, window.backend.showError);
})();
