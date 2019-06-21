// Слайдер преимуществ
var slideIndex = 1;
showSlides(slideIndex);

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var buttons = document.querySelectorAll('.advantages__button');
  var slides = document.querySelectorAll('.advantages__item');

  if (n > slides.length) {
    slideIndex = 1;
  }

  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < buttons.length; i++) {
    buttons[i].className = buttons[i].className.replace("advantages__button--active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  buttons[slideIndex - 1].className += " advantages__button--active";
}

// Всплывающие окна
var modalMapLink = document.querySelector('.contacts__map-link');
var modalMap = document.querySelector('.modal--map');
var modalMapClose = document.querySelector('.modal--map .modal__close');

var modalFeedbackLink = document.querySelector('.button--feedback');
var modalFeedback = document.querySelector('.modal--feedback');
var modalFeedbackClose = document.querySelector('.modal--feedback .modal__close');
var modalFeedbackForm = modalFeedback.querySelector('.modal__form');
var modalFeedbackName = modalFeedback.querySelector('[name=name]');
var modalFeedbackEmail = modalFeedback.querySelector('[name=email]');
var modalFeedbackMail = modalFeedback.querySelector('[name=mail]');

var modalOverlay = document.querySelector('.modal__overlay');

var isStorageSupport = true;
var storageName = "";
var storageEmail = "";

try {
  storageName = localStorage.getItem('name');
  storageEmail = localStorage.getItem('email');
} catch (err) {
  isStorageSupport = false;
}

modalMapLink.addEventListener('click', function(e) {
  e.preventDefault();
  modalMap.classList.add('modal--show');
  modalOverlay.classList.add('modal--show');
});

modalMapClose.addEventListener('click', function(e) {
  e.preventDefault();
  modalMap.classList.remove('modal--show');
  modalOverlay.classList.remove('modal--show');
});

modalFeedbackLink.addEventListener('click', function (e) {
  e.preventDefault();
  modalOverlay.classList.add('modal--show');
  modalFeedback.classList.add('modal--show');

  if (storageName && storageEmail) {
    modalFeedbackName.value = storageName;
    modalFeedbackEmail.value = storageEmail;
    modalFeedbackMail.focus();
  } else {
    modalFeedbackName.focus();
  }
});

modalFeedbackClose.addEventListener('click', function (e) {
  e.preventDefault();
  modalFeedback.classList.remove('modal--show');
  modalFeedback.classList.remove('modal--error');
  modalOverlay.classList.remove('modal--show');
});

modalOverlay.addEventListener('click', function(e) {
  e.preventDefault();
  if (modalMap.classList.contains('modal--show')) {
    modalMap.classList.remove('modal--show');
  }
  if (modalFeedback.classList.contains('modal--show')) {
    modalFeedback.classList.remove('modal--show');
    modalFeedback.classList.remove('modal--error');
  }
  modalOverlay.classList.remove('modal--show');
});

window.addEventListener("keydown", function (e) {
  if (e.keyCode === 27) {
    e.preventDefault();
    if (modalFeedback.classList.contains('modal--show')) {
      modalFeedback.classList.remove('modal--show');
      modalOverlay.classList.remove('modal--show');
      modalFeedback.classList.remove('modal--error');
    }
    if (modalMap.classList.contains('modal--show')) {
      modalMap.classList.remove('modal--show');
      modalOverlay.classList.remove('modal--show');
    }
  }
});

modalFeedbackForm.addEventListener('submit', function (e) {
  if (!modalFeedbackName.value || !modalFeedbackEmail.value || !modalFeedbackMail.value) {
    e.preventDefault();
    modalFeedback.classList.remove("modal--error");
    modalFeedback.offsetWidth = modalFeedback.offsetWidth;
    modalFeedback.classList.add('modal--error');
  } else {
    if (isStorageSupport) {
      localStorage.setItem('name', modalFeedbackName.value);
      localStorage.setItem('email', modalFeedbackEmail.value);
    }
  }
})
