'use strict';

(function () {

  var getRenderPictures = function (photo) {
    var photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.picture-comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture-likes').textContent = photo.likes;
    return photoElement;
  };

  var pictureTemplate = document.querySelector('#picture-template').content;
  window.pictures = {
    getRenderPhotos: function (photoCollection) {
      var photoLength = photoCollection.length;
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < photoLength; i++) {
        fragment.appendChild(getRenderPictures(photoCollection[i]));
      }
      return fragment;
    }
  };
})();
