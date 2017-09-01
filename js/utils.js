'use strict';

(function () {
  window.utils = {
    CLASS_HIDDEN: 'hidden',
    ESCAPE_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    MIN_POSITION: 720,
    MAX_POSITION: 1170,
    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    }
  };
})();
