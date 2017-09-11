'use strict';

(function () {
  var similarPictureElement = document.querySelector('.pictures');
  var croppingForm = document.querySelector('.upload-overlay');
  croppingForm.classList.add(window.utils.CLASS_HIDDEN);
  var filters = document.querySelector('.filters');

  var loadGallery = function (photoCollection) {
    similarPictureElement.appendChild(window.pictures.getRenderPhotos(photoCollection));
    similarPictureElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (evt.target.parentNode.classList.contains('picture')) {
        window.preview.onClickOpenGallery(evt.target.parentNode);
      }
    });
    filters.classList.remove(window.utils.CLASS_HIDDEN);
    var copyCollection = [];
    copyCollection = photoCollection.slice(0);
    filters.addEventListener('change', function (evt) {
      var lastTimeout = setTimeout(renderFilters(evt.target.value), 300);
      window.utils.debounce(lastTimeout);
    });
    var renderFilters = function (value) {
      var elementPhoto = window.pictures.getRenderPhotos;
      switch (value) {
        case 'popular':
          copyCollection.sort(function (left, right) {
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
          copyCollection.sort(function (left, right) {
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
          copyCollection.sort(function () {
            return 0.5 - Math.random();
          });
      }
      similarPictureElement.innerHTML = '';
      switch (value) {
        case 'recommend':
          similarPictureElement.appendChild(elementPhoto(photoCollection));
          break;
        default:
          similarPictureElement.appendChild(elementPhoto(copyCollection));
          break;
      }

    };

  };
  window.backend.load(loadGallery, window.backend.showError);
})();
