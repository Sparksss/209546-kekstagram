'use strict';

(function () {
  window.preview.croppingForm.classList.add(window.collectionDate.CLASS_HIDDEN);
  window.preview.similarPictureElement.appendChild(window.preview.getRenderPhotos());
  var onClickOpenGallery = function (indexPicture) {
    window.picturesPreview.showPhoto(window.photoGallery[indexPicture]);
    window.preview.galleryOverlay.classList.remove(window.collectionDate.CLASS_HIDDEN);

  };
  var addClickHandler = function (index) {
    window.picturesPreview.pictureElements[index].addEventListener('click', function (evt) {
      evt.preventDefault();
      onClickOpenGallery(index);
    });
  };
  var lengthPictureCollection = window.picturesPreview.pictureElements.length;
  for (var i = 0; i < lengthPictureCollection; i++) {
    addClickHandler(i);
  }

  document.addEventListener('keydown', function (evt) {
    if (evt.target.classList.contains(window.picturesPreview.checkCloseGallery) && evt.keyCode === window.collectionDate.ENTER_KEYCODE) {
      window.preview.closePopup();
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.collectionDate.ESCAPE_KEYCODE) {
      window.preview.closePopup();
    }
  });
  window.picturesPreview.closeGallery.addEventListener('click', function () {
    window.preview.closePopup();
  });
})();
