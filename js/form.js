'use strict';

(function () {
  // получам html элементы для работы с формой кадрирования

  var uploadImage = document.querySelector('#upload-select-image');

  var uploadFile = uploadImage.querySelector('.upload-image');

  var uploadOverlay = uploadImage.querySelector('.upload-overlay');

  var downloadForm = uploadImage.querySelector('.upload-image');

  var cancelFraming = uploadOverlay.querySelector('.upload-form-cancel');

  var resizeControls = document.querySelector('.upload-resize-controls');

  var scaleElement = uploadOverlay.querySelector('.upload-resize-controls-value');

  var pictureElement = uploadOverlay.querySelector('.effect-image-preview');

  var parentEffectElement = uploadOverlay.querySelector('.upload-effect-controls');

  var hashTags = uploadOverlay.querySelector('.upload-form-hashtags');

  var reduceImageSize = 'upload-resize-controls-button-dec';

  var increaseImageSize = 'upload-resize-controls-button-inc';

// функция закрытия формы кадрирования

  var closeFramingHandler = function () {
    downloadForm.classList.remove(window.utils.CLASS_HIDDEN);
    uploadOverlay.classList.add(window.utils.CLASS_HIDDEN);
  };

// функция открытия формы кадрирования

  var onInputOpenFramingForm = function () {
    uploadOverlay.classList.remove(window.utils.CLASS_HIDDEN);
    downloadForm.classList.add(window.utils.CLASS_HIDDEN);
  };

// функция изменения масштаба изображения

  var adjustScale = function (newValue) {
    pictureElement.style.transform = 'scale(' + newValue / 100 + ')';
  };

// функция проверки хеш-тегов на идентичность

  var checkForTheSameWord = function (listTags, index) {
    var lengthListTags = listTags.length;
    for (var j = 1; j < lengthListTags; j++) {
      if (listTags[j] === listTags[index] && j !== index) {
        hashTags.setCustomValidity('Теги не должны повторяться!');
        break;
      }
    }
  };

  /* функция проверки хеш-тегов
  * проверка поля хеш-тега на пустоту
  *  Проверка 1 символа хеш-тега (обязательно #)
  *  Проверка хеш-тегов на количество, не больше 5
  *  проверка каждого хеш-тега чтобы длинна не превышала 20 символов
  */

  var checkHashTagsHandler = function () {
    var maxHashTags = 5;
    var maxLengthTag = 21;
    var tagsFieldValue = hashTags.value;
    var listHashTag = tagsFieldValue.match(/\#[a-zA-Zа-яА-Я0-9\-]+/g);

    hashTags.setCustomValidity('');

    if (tagsFieldValue.length === 0) {
      return;
    }

    if (listHashTag === null) {
      hashTags.setCustomValidity('Первый символ должен быть решеткой');
    } else {
      var lengthListHashTags = listHashTag.length;
      if (lengthListHashTags > maxHashTags) {
        hashTags.setCustomValidity('Нелья добавить больше 5 хеш-тегов');
      }

      for (var l = 0; l < lengthListHashTags; l++) {
        if (listHashTag[l].length > maxLengthTag) {
          hashTags.setCustomValidity('Длина 1 тега не должна превышать 20 символов!');
          break;
        }
        if (lengthListHashTags > 1) {
          checkForTheSameWord(listHashTag, l);
        }
      }
    }
  };


  // переменная для записи классов

  var currentEffect = null;

  var selectedEffect = 'none';

  var units = '';

  var multiplier = 0;


// функция для изменения эффета у изображения
  var checkEffects = function () {
    if (pictureElement.classList.contains('effect-none')) {
      effectLine.classList.add(window.utils.CLASS_HIDDEN);
    } else {
      effectLine.classList.remove(window.utils.CLASS_HIDDEN);
      uploadLineVal.style.width = '0%';
    }
  };
  var switchEffect = function (currentFilter) {
    units = '';
    multiplier = 1;

    switch (currentFilter) {
      case 'chrome':
        selectedEffect = 'grayscale';
        break;
      case 'sepia':
        selectedEffect = 'sepia';
        break;
      case 'marvin':
        selectedEffect = 'invert';
        break;
      case 'phobos':
        selectedEffect = 'blur';
        units = 'px';
        multiplier = 10;
        break;
      case 'heat':
        selectedEffect = 'brightness';
        multiplier = 3;
        break;
    }
    pictureElement.style.filter = 'none';
    uploadPin.style.left = 0;
  };

  var changeImageEffectHandler = function (effect) {
    pictureElement.classList.remove(currentEffect);
    currentEffect = 'effect-' + effect.value;
    pictureElement.classList.add(currentEffect);
    checkEffects();
    switchEffect(effect.value);
  };

// обработчик событий для открытия формы кадрирования

  uploadFile.addEventListener('change', function () {
    onInputOpenFramingForm();
  });

// обрабоитчик события для закрытия формы кадрирования

  cancelFraming.addEventListener('click', function () {
    closeFramingHandler();
  });

// обработчик события для закрытия формы кадрирования на клавишу ESC

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ESCAPE_KEYCODE) {
      closeFramingHandler();
    }
  });

// обработчик собыитя для закрытия формы кадрирования на клавишу ENTER если крестик в фокусе

  document.addEventListener('keydown', function (evt) {
    if (evt.target.classList.contains(cancelFraming.className) && evt.keyCode === window.utils.ENTER_KEYCODE) {
      closeFramingHandler();
    }
  });

// обработчик события для уменьшения размера фотографии

// обработчик события для изменения размера фотографии
  resizeControls.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.classList.contains(reduceImageSize)) {
      window.initializeScale(scaleElement, adjustScale, -1);
    } else if (target.classList.contains(increaseImageSize)) {
      window.initializeScale(scaleElement, adjustScale, 1);
    }
  });

  // обработчик события для изменения эффектов изображению по клику
  parentEffectElement.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.tagName.toLowerCase() === 'input') {
      changeImageEffectHandler(target);
    }
  });

// обработчик события  для  запуска проверки хеш-тегов если изменяетя значение в input

  hashTags.addEventListener('input', function () {
    checkHashTagsHandler();
  });

  // делаем настройки фильтра по движению ползунка

  var effectLine = document.querySelector('.upload-effect-level');

  var uploadLineVal = effectLine.querySelector('.upload-effect-level-val');

  var uploadLevelLine = effectLine.querySelector('.upload-effect-level-line');

  var uploadPin = effectLine.querySelector('.upload-effect-level-pin');
  effectLine.classList.add(window.utils.CLASS_HIDDEN);

  uploadPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startX = evt.clientX;
    var sliderWidth = uploadLevelLine.offsetWidth;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shiftX = startX - moveEvt.clientX;

      startX = moveEvt.clientX;

      var left = uploadPin.offsetLeft - shiftX;

      if (left < 0) {
        left = 0;
      } else if (left > sliderWidth) {
        left = sliderWidth;
      }

      var filterValue = Math.round(left / sliderWidth * multiplier * 100) / 100;

      if (selectedEffect === 'brightness') {
        filterValue += 1;
      }

      pictureElement.style.filter = selectedEffect + '(' + filterValue + units + ')';

      uploadPin.style.left = left + 'px';
      uploadLineVal.style.width = left + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
