const scaleUpButton = document.querySelector('.scale__control--bigger');
const scaleDownButton = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview');
const sliderElement = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.img-upload__effects');
const effectsSliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevel = document.querySelector('.effect-level__value');

const filtersMap = {
  none: {
    min: 0,
    max: 1,
    step: 0.1,
    points: '',
  },
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    points: '',
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    points: '',
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    points: '%',
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    points: 'px',
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    points: '',
  },
};

const filtersEffects = {
  none: '',
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness',
};

scaleValue.removeAttribute('readonly');

let defaultScaleValue = 100;
scaleValue.setAttribute('value', `${defaultScaleValue}%`);

let defaultScale = 1;
image.style.transform = `scale(${defaultScale})`;

scaleDownButton.addEventListener('click', () => {
  defaultScaleValue -= 25;
  defaultScale -= 0.25;

  if (defaultScaleValue <= 25 && defaultScale <= 0.25) {
    defaultScaleValue = 25;
    defaultScale = 0.25;
  }

  scaleValue.setAttribute('value', `${defaultScaleValue}%`);
  image.style.transform = `scale(${defaultScale})`;
});

scaleUpButton.addEventListener('click', () => {
  defaultScaleValue += 25;
  defaultScale += 0.25;

  if (defaultScaleValue >= 100 && defaultScale >= 1) {
    defaultScaleValue = 100;
    defaultScale = 1;
  }

  scaleValue.setAttribute('value', `${defaultScaleValue}%`);
  image.style.transform = `scale(${defaultScale})`;
});

effectsSliderContainer.classList.add('hidden');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

function onFilterListClick (evt) {
  image.className = `img-upload__preview effects__preview--${evt.target.value}`;

  if (evt.target.value === 'none') {
    effectsSliderContainer.classList.add('hidden');

  } else {
    effectsSliderContainer.classList.remove('hidden');
  }

  if (evt.target.matches('input[type="radio"]')) {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: filtersMap[evt.target.value].min,
        max: filtersMap[evt.target.value].max,
      },
      start: filtersMap[evt.target.value].max,
      step: filtersMap[evt.target.value].step,
    });

    sliderElement.noUiSlider.on('update', () => {
      const effectValue = +sliderElement.noUiSlider.get();
      effectLevel.setAttribute('value', effectValue);
      image.style.filter = `${filtersEffects[evt.target.value]}(${effectValue}${filtersMap[evt.target.value].points})`;
    });
  }
}

effectsList.addEventListener('click', onFilterListClick);
