const DEFAULT_SCALE_VALUE = 100;
const DEFAULT_TRANSFORM_VALUE = 1;
const TRANSFORM_STEP = 0.25;
const SCALE_VALUE_STEP = 25;

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

const scaleUpButton = document.querySelector('.scale__control--bigger');
const scaleDownButton = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview img');
const sliderElement = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.img-upload__effects');
const effectsSliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevel = document.querySelector('.effect-level__value');

scaleValue.removeAttribute('readonly');

let defaultScaleValue = DEFAULT_SCALE_VALUE;
scaleValue.setAttribute('value', `${defaultScaleValue}%`);

let defaultScale = DEFAULT_TRANSFORM_VALUE;
image.style.transform = `scale(${defaultScale})`;

scaleDownButton.addEventListener('click', () => {
  defaultScaleValue -= SCALE_VALUE_STEP;
  defaultScale -= TRANSFORM_STEP;

  if (defaultScaleValue <= SCALE_VALUE_STEP && defaultScale <= TRANSFORM_STEP) {
    defaultScaleValue = SCALE_VALUE_STEP;
    defaultScale = TRANSFORM_STEP;
  }

  scaleValue.setAttribute('value', `${defaultScaleValue}%`);
  image.style.transform = `scale(${defaultScale})`;
});

scaleUpButton.addEventListener('click', () => {
  defaultScaleValue += SCALE_VALUE_STEP;
  defaultScale += TRANSFORM_STEP;

  if (defaultScaleValue >= DEFAULT_SCALE_VALUE && defaultScale >= DEFAULT_TRANSFORM_VALUE) {
    defaultScaleValue = DEFAULT_SCALE_VALUE;
    defaultScale = DEFAULT_TRANSFORM_VALUE;
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

const filterListChangeHandler = (evt) => {
  image.className = `effects__preview--${evt.target.value}`;
  scaleValue.setAttribute('value', `${DEFAULT_SCALE_VALUE}%`);
  image.style.transform = `scale(${DEFAULT_TRANSFORM_VALUE})`;
  defaultScale = DEFAULT_TRANSFORM_VALUE;
  defaultScaleValue = DEFAULT_SCALE_VALUE;

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

      if (evt.target.value === 'none' && image.style.filter) {
        image.style.filter = '';
      }
    });
  }
};

effectsList.addEventListener('click', filterListChangeHandler);

const editorReset = () => {
  effectsSliderContainer.classList.add('hidden');
  scaleValue.setAttribute('value', `${DEFAULT_SCALE_VALUE}%`);
  effectLevel.setAttribute('value', DEFAULT_SCALE_VALUE);
  sliderElement.noUiSlider.updateOptions({start: DEFAULT_SCALE_VALUE});
  image.removeAttribute('style');
  image.className = 'effects__preview--none';
  defaultScale = DEFAULT_TRANSFORM_VALUE;
  defaultScaleValue = DEFAULT_SCALE_VALUE;
  scaleValue.setAttribute('value', `${defaultScaleValue}%`);
};

export {editorReset};
