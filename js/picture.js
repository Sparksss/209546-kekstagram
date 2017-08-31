'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture-template').content;
  window.pictures = {
    getRenderPhotos: function () {
      var photoLength = window.photoGallery.length;
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < photoLength; i++) {
        fragment.appendChild(getRenderPictures(window.photoGallery[i]));
      }
      return fragment;
    }
  };
  var getArrayPictures = function () {
    var photoGallery = [];
    for (var i = 0; i <= 25; i++) {
      photoGallery[i] = window.collectionData.getUserPhotos(i + 1);
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
