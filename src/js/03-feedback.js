// Import lodash.throttle library
const { lastIndexOf } = require('lodash');
let throttle = require('lodash.throttle')

const feedbackForm = document.querySelector('.feedback-form');

feedbackForm.addEventListener('input', currentFormValues);

feedbackForm.addEventListener("submit", submitForm)

loadFormValues()

function currentFormValues(e) {
  e.preventDefault();
  const formValues = {}
  const {
    elements: { email, message },
  } = e.currentTarget;
  console.log(
    `Emailform: ${email.value}, 
    Messageform: ${message.value}`,
  );
  // localStorage.setItem("feedback-form-state", "JSONsss");
  // console.log(localStorage.getItem("feedback-form-state"))
  formValues.email = email.value;
  formValues.message = message.value
  // console.log(formValues)
  localStorage.setItem("feedback-form-state", JSON.stringify(formValues));
  // console.log(localStorage.getItem("feedback-form-state"))   
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
  console.log(JSON.parse(localStorage.getItem("feedback-form-state"))); 
  localStorage.removeItem("feedback-form-state")
  feedbackForm.reset();
}

