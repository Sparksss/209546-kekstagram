'use strict';

(function () {
  var similarPictureElement = document.querySelector('.pictures');
  var croppingForm = document.querySelector('.upload-overlay');
  croppingForm.classList.add(window.collectionData.CLASS_HIDDEN);
  similarPictureElement.appendChild(window.preview.getRenderPhotos());
  var pictures = similarPictureElement.querySelectorAll('.picture');
  var lengthPictureCollection = pictures.length;
  window.onClickOpenGallery = function (index) {
    window.picturesPreview.showPhoto(window.photoGallery[index]);
    window.preview.galleryOverlay.classList.remove(window.collectionData.CLASS_HIDDEN);
  };
  for (var i = 0; i < lengthPictureCollection; i++) {
    window.picturesPreview.addClickHandler(pictures[i], i);
  }

})();
