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

        var errorMassage = document.createElement('div');
        errorMassage.style.margin = '50% 50%';
        errorMassage.style.width = '300px';
        errorMassage.style.height = '300px';
        errorMassage.style.backgroundColor = 'red';
        errorMassage.textContent = statusError;

        document.insertBefore('afterbegin', errorMassage);


    }
  };
  window.backend.load(loadGallery, window.showError);
})();
