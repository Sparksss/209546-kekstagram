'use strict';

(function () {
  var loadGallery = function (photoCollection) {
    window.photoGallery = photoCollection;
    var similarPictureElement = document.querySelector('.pictures');
    var croppingForm = document.querySelector('.upload-overlay');
    croppingForm.classList.add(window.utils.CLASS_HIDDEN);
    similarPictureElement.appendChild(window.pictures.getRenderPhotos(window.photoGallery));
    var pictures = similarPictureElement.querySelectorAll('.picture');
    var lengthPictureCollection = pictures.length;

    for (var i = 0; i < lengthPictureCollection; i++) {
      window.preview.addClickHandler(pictures[i], i);
    }
  };

  window.showError = function (status, text) {
    var statusError = '';
    switch (status) {
      case 400:
        statusError = 'Неверный запрос';
        break;
      case 401:
        statusError = 'Пользователь не авторизован';
        break;
      case 404:
        statusError = 'Ничего не найдено';
        break;

      default:
        statusError = 'Неизвестный статус: ' + status + ' ' + text;
    }
    var massage = document.querySelector('.upload-message');
    massage.querySelector('.upload-message-container').textContent = statusError;
    massage.classList.remove(window.utils.CLASS_HIDDEN);
  };
  window.backend.load(loadGallery, window.showError);
})();
