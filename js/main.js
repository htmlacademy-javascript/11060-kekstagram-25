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

function createIdGenerator () {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const SIMILAR_PHOTO_COUNT = 25;

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

const generatePhotoId = createIdGenerator();
const generateCommentId = createIdGenerator();
const generatePhotoURL = createIdGenerator();

const createComment = () => {
  return {
    id: generateCommentId(),
    avatar: getRandomInteger(1, 6),
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES),
  };
};

const similarCommentsArray = () => Array.from({length: getRandomInteger(1, 10)}, createComment);

const createPhotoObject = () => {
  return {
    id : generatePhotoId(),
    url: `photos/${generatePhotoURL()}.jpg`,
    description: 'Описание фотографии',
    likes: getRandomInteger(15, 200),
    comments: similarCommentsArray(),
  };
};

const createSimilarPhotoObjects = () => Array.from({length: SIMILAR_PHOTO_COUNT}, createPhotoObject);

createSimilarPhotoObjects();

