'use strict';

(function () {
  var lastTimeout;
  var cancelFraming = document.querySelector('.upload-form-cancel');
  window.utils = {
    CLASS_HIDDEN: 'hidden',
    ESCAPE_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    DEBOUNCE_INTERVAL: 300,
    FILE_TYPES: ['gif', 'jpg', 'jpeg', 'png'],
    isEscPress: function (evt) {
      if (evt.keyCode === window.utils.ESCAPE_KEYCODE) {
        window.onCloseFramingForm();
      }
    },
    isEnterPress: function (evt) {
      if (evt.target.classList.contains(cancelFraming.className) && evt.keyCode === window.utils.ENTER_KEYCODE) {
        window.onCloseFramingForm();
      }
    },
    withHolding: function (callback) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(callback, this.DEBOUNCE_INTERVAL);
    }
  };
})();
