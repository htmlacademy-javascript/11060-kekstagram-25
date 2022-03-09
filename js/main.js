const SIMILAR_PHOTO_COUNT = 25;
const COMMENTS_MIN_VALUE = 1;
const COMMENTS_MAX_VALUE = 10;
const AVATAR_MIN_VALUE = 1;
const AVATAR_MAX_VALUE = 6;
const LIKES_MIN_VALUE = 15;
const LIKES_MAX_VALUE = 200;

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Арнольд',
  'Василий',
  'Елисей',
  'Мария',
  'Александра'
];

function getRandomInteger (min, max) {
  if (max < min) {
    const newMax = min;
    const newMin = max;
    max = newMax;
    min = newMin;
  }
  if (max < 0 || min < 0) {
    throw new Error('Аргументы должны быть не меньше нуля');
  }
  return Math.round(min + Math.random() * (max - min));
}

function getStrLength (str, length) {
  return str.length < length;
}

getStrLength ('Привет', 10);

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

let lastGeneratedPhotoId = 0;
let lastGeneratedUrlId = 0;

function getPhotoId () {
  return ++lastGeneratedPhotoId;
}

function getPhotoUrl () {
  return ++lastGeneratedUrlId;
}

const getRandomCommentId = () => getRandomInteger(0, Date.now());

const createComment = () => ({
  id: getRandomCommentId(),
  avatar: getRandomInteger(AVATAR_MIN_VALUE, AVATAR_MAX_VALUE),
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES),
});

const createSimilarCommentsArray = () => Array.from({length: getRandomInteger(COMMENTS_MIN_VALUE, COMMENTS_MAX_VALUE)}, createComment);

const createPhotoObject = () => ({
  id : getPhotoId(),
  url: `photos/${getPhotoUrl()}.jpg`,
  description: 'Описание фотографии',
  likes: getRandomInteger(LIKES_MIN_VALUE, LIKES_MAX_VALUE),
  comments: createSimilarCommentsArray(),
});

const createSimilarPhotoObjects = () => Array.from({length: SIMILAR_PHOTO_COUNT}, createPhotoObject);

createSimilarPhotoObjects();

