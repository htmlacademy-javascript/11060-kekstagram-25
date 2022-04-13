import {createPopup} from './modal.js';
import {getData} from './api.js';
import {getRandomArrayElement, debounce} from './util.js';

const RANDOM_ARRAY_LENGTH = 10;
const RERENDER_DELAY = 500;
const thumbnailsList = document.querySelector('.pictures');
const similarThumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsListFragment = document.createDocumentFragment();
const filters = document.querySelector('.img-filters');
const filtersButtons = document.querySelector('.img-filters__form');

const createThumbnail = (thumbnail) => {
  const {url, comments, likes} = thumbnail;
  const thumbnailElement = similarThumbnailTemplate.cloneNode(true);

  thumbnailElement.querySelector('.picture__img').src = url;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;

  thumbnailElement.addEventListener('click', () => {
    createPopup(thumbnail);
  });

  return thumbnailsListFragment.append(thumbnailElement);
};

const compareComments = (objectA, objectB) => {
  const a = objectA.comments.length;
  const b = objectB.comments.length;

  return b - a;
};

const getRandomThumbnails = (array) => {
  const uniqueThumbnails = [];

  while (uniqueThumbnails.length < RANDOM_ARRAY_LENGTH) {
    const item = getRandomArrayElement(array);

    if (!uniqueThumbnails.includes(item)) {
      uniqueThumbnails.push(item);
    }
  }

  return uniqueThumbnails;
};

filtersButtons.addEventListener('click', (evt) => {
  const children = Array.from(evt.currentTarget.children);
  children.forEach((child) => child.classList.remove('img-filters__button--active'));
  evt.target.classList.add('img-filters__button--active');
});

const renderThumbnails = (objects) => {
  filters.classList.remove('img-filters--inactive');

  objects.forEach(createThumbnail);
  thumbnailsList.append(thumbnailsListFragment);

  const onFiltersButtonsClick = (evt) => {
    thumbnailsList.querySelectorAll('.picture').forEach((picture) => picture.remove());

    if (evt.target.id === 'filter-random') {
      getRandomThumbnails(objects).forEach(createThumbnail);
    }

    if (evt.target.id === 'filter-discussed') {
      objects.slice().sort(compareComments).forEach(createThumbnail);
    }

    if (evt.target.id === 'filter-default') {
      objects.forEach(createThumbnail);
    }

    thumbnailsList.append(thumbnailsListFragment);
  };

  filtersButtons.addEventListener('click', debounce(onFiltersButtonsClick, RERENDER_DELAY));
};

getData(renderThumbnails);
