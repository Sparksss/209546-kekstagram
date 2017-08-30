'use strict';

(function () {
  window.preview = {
    galleryOverlay: document.querySelector('.gallery-overlay'),
    similarPictureElement: document.querySelector('.pictures'),
    pictureTemplate: document.querySelector('#picture-template').content,

    getUserPhotos: function (number) {
      return {
        url: 'photos/' + number + '.jpg',
        likes: window.utils.getRandomNumber(15, 200),
        comments: getRandomNumberComments()
      };
    },

    getRenderPhotos: function () {
      var photoLength = photoGallery.length;
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < photoLength; i++) {
        fragment.appendChild(getRenderPictures(photoGallery[i]));
      }
      return fragment;
    }

  };

  var getRandomNumberComments = function () {
    var temporaryComments = [];
    var commentsNumber = window.utils.getRandomNumber(0, 50);
    for (var i = 0; i < commentsNumber; i++) {
      temporaryComments[i] = window.collectionData.COMMENTS[window.utils.getRandomNumber(0, 5)];
    }
    return temporaryComments;
  };
  var getArrayPictures = function () {
    var photoGallery = [];
    for (var i = 0; i <= 25; i++) {
      photoGallery[i] = window.preview.getUserPhotos(i + 1);
    }
    return photoGallery;
  };
  var photoGallery = getArrayPictures();
  var getRenderPictures = function (photo) {
    var photoElement = window.preview.pictureTemplate.cloneNode(true);
    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.picture-comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture-likes').textContent = photo.likes;
    return photoElement;
  };

})();
