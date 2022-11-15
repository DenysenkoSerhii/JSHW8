import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');

const checkLocalstorage = key => {
  return !!localStorage.getItem(key);
};

const fillTheFieldsFromLocalStorage = (el, localStorageKey) => {
  if (!checkLocalstorage(localStorageKey)) return;

  const objFromStorage = JSON.parse(localStorage.getItem(localStorageKey));

  for (const key in objFromStorage) {
    if (Object.hasOwnProperty.call(objFromStorage, key)) {
      el.elements[key].value = objFromStorage[key];
    }
  }
};

const onInput = (e, objFromStorage = {}) => {
  const key = 'feedback-form-state';

  if (checkLocalstorage(key))
    objFromStorage = JSON.parse(localStorage.getItem(key));

  objFromStorage[e.target.name] = e.target.value;
  localStorage.setItem(key, JSON.stringify(objFromStorage));
};

const onSubmit = e => {
  const key = 'feedback-form-state';

  const resultToConsole = checkLocalstorage(key)
    ? JSON.parse(localStorage.getItem(key))
    : { email: '', message: '' }; 

  console.log(resultToConsole);

  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(key);
};

fillTheFieldsFromLocalStorage(formEl, 'feedback-form-state');
formEl.addEventListener('input', throttle(onInput, 500));
formEl.addEventListener('submit', onSubmit);