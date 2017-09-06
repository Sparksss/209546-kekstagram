'use strict';

(function () {

  var parentEffectElement = document.querySelector('.upload-effect-controls');

  var pictureElement = document.querySelector('.effect-image-preview');

  var effectLine = document.querySelector('.upload-effect-level');

  var uploadLineVal = effectLine.querySelector('.upload-effect-level-val');

  window.initializeFiltres = {
    currentEffect: null,
    selectedEffect: 'none',
    units: '',
    multiplier: 0
  };

  var checkEffects = function () {
    if (pictureElement.classList.contains('effect-none')) {
      effectLine.classList.add(window.utils.CLASS_HIDDEN);
    } else {
      effectLine.classList.remove(window.utils.CLASS_HIDDEN);
      uploadLineVal.style.width = '0%';
    }
  };

  var uploadPin = effectLine.querySelector('.upload-effect-level-pin');
  effectLine.classList.add(window.utils.CLASS_HIDDEN);

  var switchEffect = function (currentFilter) {
    window.units = '';
    window.multiplier = 1;

    switch (currentFilter) {
      case 'chrome':
        window.selectedEffect = 'grayscale';
        break;
      case 'sepia':
        window.selectedEffect = 'sepia';
        break;
      case 'marvin':
        window.selectedEffect = 'invert';
        break;
      case 'phobos':
        window.selectedEffect = 'blur';
        window.units = 'px';
        window.multiplier = 10;
        break;
      case 'heat':
        window.selectedEffect = 'brightness';
        window.multiplier = 3;
        break;
    }
    pictureElement.style.filter = 'none';
    uploadPin.style.left = 0;
  };

  var changeImageEffectHandler = function (effect) {
    pictureElement.classList.remove(window.currentEffect);
    window.currentEffect = 'effect-' + effect.value;
    pictureElement.classList.add(window.currentEffect);
    checkEffects();
    switchEffect(effect.value);
  };
  parentEffectElement.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.tagName.toLowerCase() === 'input') {
      changeImageEffectHandler(target);
    }
  });
})();
