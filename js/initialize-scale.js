'use strict';

(function () {

  var reduceImageSize = 'upload-resize-controls-button-dec';

  var increaseImageSize = 'upload-resize-controls-button-inc';

  var resizeControls = document.querySelector('.upload-resize-controls');

  window.initializeScale = function (processedElement, callback) {
    resizeControls.addEventListener('click', function (evt) {
      var target = evt.target;
      if (target.classList.contains(reduceImageSize)) {
        callback(processedElement, -1);
      } else if (target.classList.contains(increaseImageSize)) {
        callback(processedElement, 1);
      }
    });
  };
})();
