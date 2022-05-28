// Import lodash.throttle library
const _ = require('lodash');

const feedbackForm = document.querySelector('.feedback-form');
feedbackForm.addEventListener('input', _.throttle(updateLocalStorage, 500, { trailing: false }));
feedbackForm.addEventListener('submit', submitForm);

loadFormValues();

function currentFormValues(e) {
  e.preventDefault();
  const formValues = {};
  const {
    elements: { email, message },
  } = e.currentTarget;
  // console.log(
  //   `Email: ${email.value},
  //   Message: ${message.value}`,
  // );
  formValues.email = email.value;
  formValues.message = message.value;
  return formValues;
  // console.log(formValues)
}

function loadFormValues() {
  if (jsonParse('feedback-form-state') === null) {
    return;
  }
  // let loadValues = JSON.parse(localStorage.getItem("feedback-form-state"));
  let loadValues = jsonParse('feedback-form-state');
  feedbackForm.elements.email.value = loadValues.email;
  feedbackForm.elements.message.value = loadValues.message;
}

function submitForm(e) {
  e.preventDefault();
  console.log(currentFormValues(e));
  localStorage.removeItem('feedback-form-state');
  feedbackForm.reset();
}

function updateLocalStorage(e) {
  jsonStringify('feedback-form-state', currentFormValues(e));
  // localStorage.setItem("feedback-form-state", JSON.stringify(currentFormValues(e)));
  console.log('upgrade storage');
}

function jsonStringify(key, func) {
  try {
    localStorage.setItem(key, JSON.stringify(func));
  } catch (error) {
    console.log(error.name);
  }
}

function jsonParse(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.log(error.name);
  }
}
