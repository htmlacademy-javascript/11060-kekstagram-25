import {createPopup} from './modal.js';
import {getData} from './api.js';

const thumbnailsList = document.querySelector('.pictures');
const similarThumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsListFragment = document.createDocumentFragment();

const renderThumbnails = (objects) => {
  objects.forEach((thumbnail) => {
    const {url, comments, likes} = thumbnail;
    const thumbnailElement = similarThumbnailTemplate.cloneNode(true);
    thumbnailElement.querySelector('.picture__img').src = url;
    thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
    thumbnailElement.querySelector('.picture__likes').textContent = likes;

    thumbnailElement.addEventListener('click', () => {
      createPopup(thumbnail);
    });

    thumbnailsListFragment.append(thumbnailElement);
  });

  thumbnailsList.append(thumbnailsListFragment);
};

getData(renderThumbnails);
