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

getRandomInteger(0, 10);

function getStrLength (str, length) {
  return str.length < length;
}

getStrLength ('Привет', 10);
