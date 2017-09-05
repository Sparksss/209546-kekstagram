'use strict';

(function () {

  var MIN_VALUE = 25;

  var MAX_VALUE = 100;

  var reduceImageSize = 'upload-resize-controls-button-dec';

  var increaseImageSize = 'upload-resize-controls-button-inc';

  var resizeControls = document.querySelector('.upload-resize-controls');

  var scaleElement = resizeControls.querySelector('.upload-resize-controls-value');

  var pictureElement = document.querySelector('.effect-image-preview');

  // функция изменения масштаба изображения

  var adjustScale = function (newValue) {
    pictureElement.style.transform = 'scale(' + newValue / 100 + ')';
  };
  window.initializeScale = function (controlSizeImage, callback, direction) {
    var newValue = parseInt(controlSizeImage.value, 10) + 25 * direction;
    if (newValue >= MIN_VALUE && newValue <= MAX_VALUE) {
      controlSizeImage.value = newValue + '%';
      callback(newValue);
    }
  };
  // обработчик события для изменения размера фотографии
  resizeControls.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.classList.contains(reduceImageSize)) {
      window.initializeScale(scaleElement, adjustScale, -1);
    } else if (target.classList.contains(increaseImageSize)) {
      window.initializeScale(scaleElement, adjustScale, 1);
    }
  });
})();
