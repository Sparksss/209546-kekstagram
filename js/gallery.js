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
      switch (evt.target.value) {
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
          var randomCollection = [];
          for (var l = 0; l < photoCollection.length; l++) {
            randomCollection.push(photoCollection[window.utils.getRandomNumber(0, 26)]);
          }
      }
      similarPictureElement.innerHTML = '';
      if (evt.target.value === 'recommend') {
        similarPictureElement.appendChild(window.pictures.getRenderPhotos(photoCollection));
      } else if (evt.target.value === 'random') {
        similarPictureElement.appendChild(window.pictures.getRenderPhotos(randomCollection));
      } else {
        similarPictureElement.appendChild(window.pictures.getRenderPhotos(copyCollection));
      }
    }
    );
  };
  window.backend.load(loadGallery, window.backend.showError);
})();
