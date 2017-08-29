'use strict';

(function () {
  window.picturesPreview = {
    pictureElements: window.preview.similarPictureElement.querySelectorAll('.picture'),
    closeGallery: window.preview.galleryOverlay.querySelector('.gallery-overlay-close'),
    checkCloseGallery: 'gallery-overlay-close',
    showPhoto: function (picture) {
      window.preview.galleryOverlay.querySelector('.gallery-overlay-image').src = picture.url;
      window.preview.galleryOverlay.querySelector('.likes-count').textContent = picture.likes;
      window.preview.galleryOverlay.querySelector('.comments-count').textContent = picture.comments.length;
    },
    closePopup: function () {
      window.preview.galleryOverlay.classList.add(window.collectionDate.CLASS_HIDDEN);
    }
  };
})();
// получам html элементы для работы с формой кадрирования

var uploadImage = document.querySelector('#upload-select-image');

var uploadFile = uploadImage.querySelector('.upload-image');

var uploadOverlay = uploadImage.querySelector('.upload-overlay');

var downloadForm = uploadImage.querySelector('.upload-image');

var cancelFraming = uploadOverlay.querySelector('.upload-form-cancel');

var reduceImageSize = uploadOverlay.querySelector('.upload-resize-controls-button-dec');

var increaseImageSize = uploadOverlay.querySelector('.upload-resize-controls-button-inc ');

var controlSizeImage = uploadOverlay.querySelector('.upload-resize-controls-value');

var sizeImage = uploadOverlay.querySelector('.effect-image-preview');

var parentEffectElement = uploadOverlay.querySelector('.upload-effect-controls');

var hashTags = uploadOverlay.querySelector('.upload-form-hashtags');

var MIN_VALUE = 25;

var MAX_VALUE = 100;

// функция закрытия формы кадрирования

var closeFramingHandler = function () {
  downloadForm.classList.remove(window.collectionDate.CLASS_HIDDEN);
  uploadOverlay.classList.add(window.collectionDate.CLASS_HIDDEN);
};

// функция открытия формы кадрирования

var onInputOpenFramingForm = function () {
  uploadOverlay.classList.remove(window.collectionDate.CLASS_HIDDEN);
  downloadForm.classList.add(window.collectionDate.CLASS_HIDDEN);
};

// функция изменения масштаба изображения

var changeImageSize = function (direction) {
  var newValue = parseInt(controlSizeImage.value, 10) + 25 * direction;
  if (newValue >= MIN_VALUE && newValue <= MAX_VALUE) {
    controlSizeImage.value = newValue + '%';
    sizeImage.style.transform = 'scale(' + newValue / 100 + ')';
  }
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


// функция для изменения эффета у изображения

var changeImageEffectHandler = function (effect) {
  sizeImage.classList.remove(currentEffect);
  currentEffect = 'effect-' + effect.value;
  sizeImage.classList.add(currentEffect);
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
  if (evt.keyCode === window.collectionDate.ESCAPE_KEYCODE) {
    closeFramingHandler();
  }
});

// обработчик собыитя для закрытия формы кадрирования на клавишу ENTER если крестик в фокусе

document.addEventListener('keydown', function (evt) {
  if (evt.target.classList.contains(cancelFraming.className) && evt.keyCode === window.collectionDate.ENTER_KEYCODE) {
    closeFramingHandler();
  }
});

// обработчик события для уменьшения размера фотографии

reduceImageSize.addEventListener('click', function () {
  changeImageSize(-1);
});

// обработчик события для увеличения размера фотографии

increaseImageSize.addEventListener('click', function () {
  changeImageSize(1);
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
