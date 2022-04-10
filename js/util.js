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

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (fn, ms) => {
  let timeout;
  return function () {
    const fnCall = () => {
      fn.apply(this, arguments);
    };
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
};

export {getRandomArrayElement, isEscapeKey, debounce};
