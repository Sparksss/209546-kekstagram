'use strict';

var similarPictureElement = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content;
var CLASS_HIDDEN = 'hidden';

var croppingForm = document.querySelector('.upload-overlay');
croppingForm.classList.add(CLASS_HIDDEN);

var galleryOverlay = document.querySelector('.gallery-overlay');

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getUserPhotos = function (i) {
  return {
    url: 'photos/' + i + '.jpg',
    likes: getRandomNumber(15, 200),
    comments: comments[getRandomNumber(0, 7)]
  };
};

var getArrayPictures = function () {
  var photoGallery = [];
  for (var i = 0; i < 25; i++) {
    photoGallery[i] = getUserPhotos(i);
  }
  return photoGallery;
};

var photoGallery = getArrayPictures();

var getRenderPhotos = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 25; i++) {
    getRenderPictures(fragment, i, photoGallery[i]);
  }
  return fragment;
};

var getRenderPictures = function (fragment, i, photos) {
  var photoElement = pictureTemplate.cloneNode(true);
  photoElement.childNodes[1].src = photos.url;
  photoElement.querySelector('.picture-comments').textContent = photos.comments;
  photoElement.querySelector('.picture-likes').textContent = photos.likes;
  fragment.appendChild(photoElement);
};

var getRenderPhoto = function (number) {
  galleryOverlay.querySelector('.gallery-overlay-image').src = photoGallery[number].url;
  galleryOverlay.querySelector('.likes-count').textContent = photoGallery[number].likes;
  galleryOverlay.querySelector('.comments-count').textContent = photoGallery[number].comments;
  document.appendChild(galleryOverlay);
};

similarPictureElement.appendChild(getRenderPhotos());
galleryOverlay.classList.remove(CLASS_HIDDEN);
galleryOverlay.appendChild(getRenderPhoto(1));
