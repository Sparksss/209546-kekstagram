'use strict';

(function () {

  var MIN_VALUE = 25;

  var MAX_VALUE = 100;

  window.initializeScale = function (controlSizeImage, adjustScale, direction) {
    var newValue = parseInt(controlSizeImage.value, 10) + 25 * direction;
    if (newValue >= MIN_VALUE && newValue <= MAX_VALUE) {
      controlSizeImage.value = newValue + '%';
      adjustScale(newValue);
    }
  };
})();
