'use strict';

(function () {
  window.utils = {
    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    onPopupEscPress: function (evt) {
      if (evt.keyCode === window.collectionData.ESCAPE_KEYCODE) {
        window.picturesPreview.closePopup();
      }
    }
  };
})();
