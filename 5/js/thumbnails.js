import {createSimilarPhotoObjects} from './data.js';

const thumbnailsList = document.querySelector('.pictures');
const similarThumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarThumbnails = createSimilarPhotoObjects();
const thumbnailsListFragment = document.createDocumentFragment();

similarThumbnails.forEach(({url, comments, likes}) => {
  const thumbnailElement = similarThumbnailTemplate.cloneNode(true);
  thumbnailElement.querySelector('.picture__img').src = url;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;
  thumbnailsListFragment.append(thumbnailElement);
});

thumbnailsList.append(thumbnailsListFragment);

export {similarThumbnails, thumbnailsList};
