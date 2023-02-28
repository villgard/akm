import '../styles/styles.scss';
import JustValidate from "just-validate";
import { companies } from "./companies.js";

const menu = document.getElementById('menu');
const switcher = document.getElementById('switcher');
const anchors = document.querySelectorAll('a[href^="#"]');

function toggleMenu(e) {
  e.preventDefault();
  switcher.classList.toggle('_active');
  menu.classList.toggle('_active');
  document.body.classList.toggle('_hidden');
}

switcher.addEventListener('click', toggleMenu);

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const anchorId = anchor.getAttribute('href');

    setTimeout(() => {
      document.querySelector(anchorId).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 900);

    switcher.classList.remove('_active');
    menu.classList.remove('_active');
    document.body.classList.remove('_hidden');
  })
}

const { viewport } = zoomer();
const meta = document.head.querySelector('meta[name="viewport"]');
meta.setAttribute('content', `width=${viewport}, user-scalable=no`);

function zoomer() {
  const links = document.querySelectorAll('.nav__link');
  const width = window.innerWidth;
  const result = {
    viewport: null,
  };

  if (width >= 768) {
    result.viewport = 1200;
  } else if (width < 768) {
    for (let link = 0; link < links.length; link++) {
      links[link].classList.add('animated-text');
      links[link].classList.add('gradient-text');
    }
    result.viewport = 375;
  }
  return result;
}

gsap.registerPlugin(ScrollTrigger);
for (let i = 1; i < 6; i++) {
  gsap.to(`.js-gsap-title-bg-${i}`, {
    scrollTrigger: {
      trigger: `.js-gsap-title-bg-${i}`,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      toggleActions: 'restart pause resume pause'
    },
    scale: 2.1,
    ease: 'none',
  });
}

gsap.to('.js-gsap-main-title', {
  scrollTrigger: {
    trigger: '.js-gsap-main-title',
    start: 'top bottom',
    end: 'bottom 400px',
    scrub: true,
    toggleActions: 'restart pause resume pause'
  },
  scale: 1.2,
  ease: 'none',
});

function onEntry(entry) {
  entry.forEach(change => {
    if (change.isIntersecting) {
      if (change.target.classList.contains('js-animated')) {
        change.target.classList.add('_show');
      }
    }
  });
}

let options = { threshold: [0.5] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.js-animated');

for (let elm of elements) {
  observer.observe(elm);
}


const form = document.getElementById('form');
const submitFormBtn = document.getElementById('submit');
const inputName = document.getElementById('name');
const inputPhone = document.getElementById('phone');
const inputEmail = document.getElementById('email');
const formPopup = document.getElementById('formPopup');

let formData = new FormData();

function checkSubmit() {
  if (!inputName.value || !inputPhone.value || !inputEmail.value) {
    submitFormBtn.setAttribute('disabled', '');
    submitFormBtn.classList.add('_disabled');
  } else {
    submitFormBtn.removeAttribute('disabled');
    submitFormBtn.classList.remove('_disabled');
  }
}

const validate = new JustValidate(
  '#form',
  {
    errorFieldCssClass: '_error',
    errorLabelStyle: {
      color: 'red',
    },
    lockForm: true,
    focusInvalidField: true,
  }
);

validate
  .addField('#name', [
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'The name is too short',
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'The name is too long',
    },
    {
      rule: 'required',
      errorMessage: 'Required field',
    }
  ])
  .addField('#phone', [
    {
      rule: 'required',
      errorMessage: 'Required field',
    },
    {
      rule: 'maxLength',
      value: 12,
      errorMessage: 'The number is too long'
    }
  ])
  .addField('#email', [
    {
      rule: 'required',
      errorMessage: 'Required field',
    },
    {
      rule: 'email',
      errorMessage: 'Incorrect E-mail address',
    }
  ]);

function submittingForm() {
  const inputs = form.querySelectorAll('.form-input')

  for (let input of inputs) {
    input.classList.add('disabled');
    input.setAttribute('readonly', '');
  }

  submitFormBtn.classList.add('disabled');
}

function removeReadonlyAttr() {
  const inputs = form.querySelectorAll('.form-input')

  for (let input of inputs) {
    input.classList.remove('disabled');
    input.removeAttribute('readonly');
  }
}

function showPopup() {
  formPopup.classList.add('_active')
  formPopup.innerHTML = `
    <div class="popup-card active">
      <svg width="50" height="50" viewbox="0 0 50 50" fill="#62C584">
        <path d="M25.1 49.28A24.64 24.64 0 0 1 .5 24.68 24.64 24.64 0 0 1 25.1.07a24.64 24.64 0 0 1 24.6 24.6 24.64 24.64 0 0 1-24.6 24.61zm0-47.45A22.87 22.87 0 0 0 2.26 24.68 22.87 22.87 0 0 0 25.1 47.52a22.87 22.87 0 0 0 22.84-22.84A22.87 22.87 0 0 0 25.1 1.83z" />
        <path d="M22.84 30.53l-4.44-4.45a.88.88 0 1 1 1.24-1.24l3.2 3.2 8.89-8.9a.88.88 0 1 1 1.25 1.26L22.84 30.53z" />
      </svg>
      <h4>Thank you! Your data has been submitted.</h4>
      <button class="popup-card__btn"><span></span></button>
    </div>
  `;
  const popupBtn = document.querySelector('.popup-card__btn');

  popupBtn.addEventListener('click', closePopup);

  setTimeout(() => {
    closePopup();
    popupBtn.removeEventListener('click', closePopup);
  }, 4000);
}

function closePopup() {
  formPopup.classList.remove('_active');
  formPopup.innerHTML = '';
  document.body.classList.remove('_hidden');
}

async function sendForm(e) {
  e.preventDefault();

  const inputs = form.querySelectorAll('.form-input')

  for (let [index, input] of inputs.entries()) {
    formData.set(input.name, input.value);
  }

  submittingForm();

  const token = '5767341034:AAE4ec4aoHeWftuiVl9D6cIujEG8dRhOA3s';
  const chatId = '-835301442';

  const asString = new URLSearchParams(formData).toString();
  const headerMessage = 'Request from akm-originals.com %0A';

  const message = headerMessage + asString.replaceAll('=', ': ').replaceAll('&', '%0A');

  const botUrl = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&parse_mode=html&text=${message}`

  const response = await fetch(botUrl, {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    showPopup();
    form.reset();
  } else {
    alert('failed');
  }

  removeReadonlyAttr();
  checkSubmit();
}

checkSubmit();
form.addEventListener('input', checkSubmit);
form.addEventListener('submit', sendForm);

function touchSwipe(wrapper, sw) {
  let touchStartX;
  let touchEndX

  const handleSwipe = () => {
    if (touchEndX - touchStartX < -70) {
      sw.slideNext()
    } else if (touchEndX - touchStartX > 70) {
      sw.slidePrev()
    }
  };

  document.querySelector(wrapper).addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].clientX;
  });

  document.querySelector(wrapper).addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
  });
};

let swiper = new Swiper(".mySwiper", {
  effect: "cards",
  loop: true,
  loopedSlides: 3,
  slidesPerView: 1,
  centeredSlides: true,
  autoplay: true,
  grabCursor: false,
  initialSlide: 2,
  allowTouchMove: false,
  simulateTouch: false,
  noSwipingClass: 'swiper-no-swiping',
  keyboard: {
  enabled: true,
  },
  cardsEffect: {
    rotate: false,
    slideShadows: false,
    perSlideOffset: 8,
  },
  navigation: {
    nextEl: '.mySwiper__prev',
    prevEl: '.mySwiper__next',
  },
  on: {
    afterInit(sw) {
      touchSwipe('.services__content', sw);
    }
  }
});


let swiperSec = new Swiper(".mySwiperSec", {
  effect: "cards",
  loop: true,
  loopedSlides: 3,
  slidesPerView: 1,
  centeredSlides: true,
  autoplay: true,
  grabCursor: false,
  initialSlide: 2,
  allowTouchMove: false,
  simulateTouch: false,
  noSwipingClass: 'swiper-no-swiping',
  keyboard: {
    enabled: true,
  },
  cardsEffect: {
    rotate: false,
    slideShadows: false,
    perSlideOffset: 8,
  },
  navigation: {
    nextEl: '.mySwiperSec__prev',
    prevEl: '.mySwiperSec__next',
  },
  on: {
    afterInit(sw) {
      touchSwipe('.accounts__content', sw);
    }
  }
})

let swiperThird = new Swiper(".mySwiperThird", {
  effect: "cards",
  loop: true,
  loopedSlides: 3,
  slidesPerView: 1,
  centeredSlides: true,
  autoplay: true,
  grabCursor: false,
  initialSlide: 2,
  allowTouchMove: false,
  simulateTouch: false,
  noSwipingClass: 'swiper-no-swiping',
  keyboard: {
    enabled: true,
  },
  cardsEffect: {
    rotate: false,
    slideShadows: false,
    perSlideOffset: 8,
  },
  navigation: {
    nextEl: '.mySwiperThird__prev',
    prevEl: '.mySwiperThird__next',
  },
  on: {
    afterInit(sw) {
      touchSwipe('.work__content', sw);
    }
  }
});

const slides = document.getElementsByClassName('js-slide-btn');

function openModal(id, title, caption) {
  if (id) {
    formPopup.innerHTML = `
    <div class="popup-card active modal">
      <h4>${title}</h4>
      <p>${caption}</p>
      <button class="popup-card__btn"><span></span></button>
    </div>
  `
    document.body.classList.add('_hidden');

    const popupBtn = document.querySelector('.popup-card__btn');

    popupBtn.addEventListener('click', closePopup);
  }
}

for (let i = 0; i < slides.length; i++) {
  slides[i].addEventListener('click', (e) => {
    let dataset = e.target.dataset;
    for (let j = 0; j < companies.length; j++) {
      formPopup.classList.add('_active');
      companies[j].id = dataset.id
      openModal(companies[j].id, companies[j].title, companies[j].caption);
    }
  })
}