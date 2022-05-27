// Import lodash.throttle library
const _ = require('lodash');

const feedbackForm = document.querySelector('.feedback-form');

feedbackForm.addEventListener('input', _.throttle(updateLocalStorage, 3000, {'trailing': false}));

feedbackForm.addEventListener("submit", submitForm)

loadFormValues()

function currentFormValues(e) {
  e.preventDefault();
  const formValues = {}
  const {
    elements: { email, message },
  } = e.currentTarget;
  // console.log(
  //   `Email: ${email.value}, 
  //   Message: ${message.value}`,
  // );
  formValues.email = email.value;
  formValues.message = message.value

  return formValues
  // console.log(formValues)
}

function loadFormValues(){
  if (JSON.parse(localStorage.getItem("feedback-form-state")) === null) {
    return;
  }

  let jsonValues = localStorage.getItem("feedback-form-state");
  let loadValues = JSON.parse(jsonValues);
  feedbackForm.elements.email.value = loadValues.email;
  feedbackForm.elements.message.value = loadValues.message;
  }

function submitForm(e){
  e.preventDefault();
  console.log(currentFormValues(e)); 
  localStorage.removeItem("feedback-form-state")
  feedbackForm.reset();
}

function updateLocalStorage(e){
  localStorage.setItem("feedback-form-state", JSON.stringify(currentFormValues(e)));
  console.log("upgrade storage")
}