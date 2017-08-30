'use strict';

(function () {
  window.preview = {
    galleryOverlay: document.querySelector('.gallery-overlay'),
    similarPictureElement: document.querySelector('.pictures'),
    getRenderPhotos: function () {
      var photoLength = window.photoGallery.length;
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < photoLength; i++) {
        fragment.appendChild(getRenderPictures(window.photoGallery[i]));
      }
      return fragment;
    }
  };
  var pictureTemplate = document.querySelector('#picture-template').content;
  var getUserPhotos = function (number) {
    return {
      url: 'photos/' + number + '.jpg',
      likes: window.utils.getRandomNumber(15, 200),
      comments: getRandomNumberComments()
    };
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
      photoGallery[i] = getUserPhotos(i + 1);
    }
    return photoGallery;
  };
  window.photoGallery = getArrayPictures();
  var getRenderPictures = function (photo) {
    var photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.picture-comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture-likes').textContent = photo.likes;
    return photoElement;
  };

})();
