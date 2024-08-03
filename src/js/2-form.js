const formData = { email: '', message: '' };

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

const STORAGE_KEY = 'feedback-form-state';

const saveToLocalStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    Object.assign(formData, JSON.parse(savedData));
    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  }
};

document.addEventListener('DOMContentLoaded', loadFromLocalStorage);

form.addEventListener('input', event => {
  formData[event.target.name] = event.target.value;
  saveToLocalStorage();
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted data:', formData);

  form.reset();
  Object.keys(formData).forEach(key => (formData[key] = ''));
  localStorage.removeItem(STORAGE_KEY);
});
