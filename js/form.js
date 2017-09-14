'use strict';

(function () {
  // получам html элементы для работы с формой кадрирования

  var MIN_VALUE = 25;

  var MAX_VALUE = 100;

  var uploadForm = document.querySelector('#upload-select-image');

  var uploadFile = uploadForm.querySelector('.upload-image');

  var uploadOverlay = uploadForm.querySelector('.upload-overlay');

  var downloadForm = uploadForm.querySelector('.upload-image');

  var cancelFraming = uploadOverlay.querySelector('.upload-form-cancel');

  var hashTags = uploadOverlay.querySelector('.upload-form-hashtags');

  var pictureElement = uploadOverlay.querySelector('.effect-image-preview');

  var scaleElement = uploadOverlay.querySelector('.upload-resize-controls-value');

  var effectLine = document.querySelector('.upload-effect-level');

  var uploadLineVal = effectLine.querySelector('.upload-effect-level-val');

  var uploadPin = effectLine.querySelector('.upload-effect-level-pin');

  var fileChooser = uploadForm.querySelector('#upload-file');

  var submitButton = uploadForm.querySelector('#upload-submit');

  var options = {
    currentEffect: null,
    selectedEffect: 'none',
    units: '',
    multiplier: 0
  };

  var adjustScale = function (processedElement, direction) {
    var newValue = parseInt(processedElement.value, 10) + 25 * direction;
    if (newValue >= MIN_VALUE && newValue <= MAX_VALUE) {
      processedElement.value = newValue + '%';
      pictureElement.style.transform = 'scale(' + newValue / 100 + ')';
    }
  };

  window.initializeScale(scaleElement, adjustScale);
  effectLine.classList.add(window.utils.CLASS_HIDDEN);

  var onChangeImageEffect = function (effect) {
    pictureElement.classList.remove(options.currentEffect);
    options.currentEffect = 'effect-' + effect;
    pictureElement.classList.add(options.currentEffect);
    if (pictureElement.classList.contains('effect-none')) {
      effectLine.classList.add(window.utils.CLASS_HIDDEN);
    } else {
      effectLine.classList.remove(window.utils.CLASS_HIDDEN);
      uploadLineVal.style.width = '0%';
    }
    options.units = '';
    options.multiplier = 1;

    switch (effect) {
      case 'chrome':
        options.selectedEffect = 'grayscale';
        break;
      case 'sepia':
        options.selectedEffect = 'sepia';
        break;
      case 'marvin':
        options.selectedEffect = 'invert';
        break;
      case 'phobos':
        options.selectedEffect = 'blur';
        options.units = 'px';
        options.multiplier = 10;
        break;
      case 'heat':
        options.selectedEffect = 'brightness';
        options.multiplier = 3;
        break;
    }
    pictureElement.style.filter = 'none';
    uploadPin.style.left = 0;
  };

  window.initializeFilters(onChangeImageEffect);

  var onEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESCAPE_KEYCODE) {
      onCloseFramingForm();
    }
  };

  var onEnterPress = function (evt) {
    if (evt.target.classList.contains(cancelFraming.className) && evt.keyCode === window.utils.ENTER_KEYCODE) {
      onCloseFramingForm();
    }
  };
  // функция закрытия формы кадрирования
  var onCloseFramingForm = function () {
    uploadOverlay.classList.add(window.utils.CLASS_HIDDEN);
    downloadForm.classList.remove(window.utils.CLASS_HIDDEN);
    pictureElement.style.filter = 'none';
    effectLine.classList.add(window.utils.CLASS_HIDDEN);
    uploadPin.style.left = 0;
    uploadLineVal.style.width = 0;
    uploadForm.reset();
    submitButton.disabled = false;
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('keydown', onEnterPress);
  };

// функция открытия формы кадрирования

  var onInputOpenFramingForm = function () {
    uploadOverlay.classList.remove(window.utils.CLASS_HIDDEN);
    downloadForm.classList.add(window.utils.CLASS_HIDDEN);
    document.addEventListener('keydown', onEscPress);
    document.addEventListener('keydown', onEnterPress);

  };

// функция проверки хеш-тегов на идентичность

  var checkForTheSameWord = function (tags, index) {
    var lengthListTags = tags.length;
    for (var j = 1; j < lengthListTags; j++) {
      if (tags[j] === tags[index] && j !== index) {
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

  var onCheckHashTags = function () {
    var maxHashTags = 5;
    var maxLengthTag = 20;
    var tagsFieldValue = hashTags.value;
    var listHashTags = tagsFieldValue.match(/\#[\S]+/g);

    hashTags.setCustomValidity('');

    if (tagsFieldValue.length === 0) {
      return;
    }

    if (listHashTags === null) {
      hashTags.setCustomValidity('Первый символ должен быть решеткой');
    } else {
      var lengthListHashTags = listHashTags.length;
      if (lengthListHashTags > maxHashTags) {
        hashTags.setCustomValidity('Нелья добавить больше 5 хеш-тегов');
      }

      for (var l = 0; l < lengthListHashTags; l++) {
        if (listHashTags[l].length > maxLengthTag) {
          hashTags.setCustomValidity('Длина 1 тега не должна превышать 20 символов!');
          break;
        }

        if (lengthListHashTags > 1) {
          checkForTheSameWord(listHashTags, l);
        }
      }
    }
  };

// обработчик событий для открытия формы кадрирования

  uploadFile.addEventListener('change', onInputOpenFramingForm);

// обработчик события для закрытия формы кадрирования
  cancelFraming.addEventListener('click', onCloseFramingForm);

// обработчик события  для  запуска проверки хеш-тегов если изменяетя значение в input

  hashTags.addEventListener('input', function () {
    onCheckHashTags();
  });

  // делаем настройки фильтра по движению ползунка

  var uploadLevelLine = effectLine.querySelector('.upload-effect-level-line');
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

      var filterValue = Math.round(left / sliderWidth * options.multiplier * 100) / 100;

      if (options.selectedEffect === 'brightness') {
        filterValue += 1;
      }

      pictureElement.style.filter = options.selectedEffect + '(' + filterValue + options.units + ')';

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

  uploadForm.addEventListener('submit', function (evt) {
    hashTags.value = hashTags.value.trim();
    submitButton.disabled = true;
    window.backend.save(new FormData(uploadForm), onCloseFramingForm, window.backend.showError);
    evt.preventDefault();
  });

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.utils.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        pictureElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

})();
