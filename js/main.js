function getRandomInteger (min, max) {
  if (max < min) {
    let newMax = min;
    let newMin = max;
    max = newMax;
    min = newMin;
  }

  if (max < 0 || min < 0) {
    return console.log('Аргументы должны быть не меньше нуля');
  }

  return Math.round(min + Math.random() * (max - min));
}

getRandomInteger(0, 10);

function getStrLength (str, length) {
  if (str.length - length > 0) {
    return false;
  }

  return true;
}

getStrLength ('Привет', 10);
