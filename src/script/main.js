import '../styles/styles.scss';
import JustValidate from "just-validate";

const preloader = document.querySelector('.preloader');
document.body.classList.add('_hidden');

window.addEventListener('load', () => {
  setTimeout(() => {
    preloader.classList.add('_hidden');
    document.body.classList.remove('_hidden');
  }, 3000);
})


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

    switcher.classList.toggle('_active');
    menu.classList.toggle('_active');
    document.body.classList.remove('_hidden');
  })
}

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
const { viewport } = zoomer();
const meta = document.head.querySelector('meta[name="viewport"]');
meta.setAttribute('content', `width=${viewport}, user-scalable=no`);

function onEntry(entry) {
  entry.forEach(change => {
    if (change.isIntersecting) {
      if (change.target.classList.contains('js-animated')) {
        change.target.classList.add('_show');
      }
      if (change.target.classList.contains('js-animated-title-bg')) {
        window.addEventListener("scroll", () => {
          const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

          const maxScroll = scrollHeight - clientHeight;

          const power = 2;
          const scale = 1 + (scrollTop / maxScroll) * power;

          change.target.style.transform = `scale(${scale})`;
          if (scale >= 2.1) {
            change.target.style.transform = `scale(2.1)`;
          }
        });
      }
      if (change.target.classList.contains('increase')) {
        window.addEventListener("scroll", () => {
          const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

          const maxScroll = scrollHeight - clientHeight;

          const power = 1.2;
          const scale = 1 + (scrollTop / maxScroll) * power;

          change.target.style.transform = `scale(${scale})`;
          if (scale >= 1.2) {
            change.target.style.transform = `scale(1.2)`;
          }
        });
      }
    }
  });
}

let options = { threshold: [0.5] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.js-animated');
let titleBgs = document.querySelectorAll('.js-animated-title-bg');
const increase = document.querySelector('.increase');

for (let elm of elements) {
  observer.observe(elm);
}

for (let titleBg of titleBgs) {
  observer.observe(titleBg);
}

observer.observe(increase);

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
}
async function sendForm(e) {
  e.preventDefault();

  const inputs = form.querySelectorAll('.form-input')

  for (let [index, input] of inputs.entries()) {
    formData.set(input.name, input.value);
  }

  submittingForm();

  const response = await fetch('https://httpbin.org/post', {
    method: 'POST',
    body: formData,
  });

  if (response.status === 200) {
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

class Slider {
  constructor(
    slideWrapper,
    options,
  ) {
    this.slideWrapper = slideWrapper;
    this.navWrapper = options.navWrapper;
    this.arrowRight = options.arrowRight;
    this.arrowLeft = options.arrowLeft;
    this.slideArtboard = options.slideArtboard;
    this.slidesClassName = options.slidesClassName;
    this.slides;
    this.slidesText = options.slidesText;

    this.delay = options.delay;
    this.proxyDelay = options.delay;
    this.scaleYItem = options.scaling;
    this.timeOutAfterSwipe = options.timeOut;

    this.radius = 27;
    this.faraway = 60;
    this.updown = 90;
    this.rotateDisc = 40;
    this.degxItem = 30;

    this.slidesCount = 0;
    this.activeSlide = 0;

    this.rotateDeg = 90;
    this.degDelta = 0;
  }

  compileSelectos() {
    if (this.slideWrapper && document.querySelector(this.slideWrapper)) {
      this.slideWrapper = document.querySelector(this.slideWrapper);
    } else {
      throw new Error('Empty Initiator');
    }

    if (this.navWrapper && document.querySelector(this.navWrapper)) {
      this.navWrapper = document.querySelector(this.navWrapper);
    } else {
      throw new Error('Empty Wrapper Of Navigation');
    }

    if (this.arrowRight && this.navWrapper.querySelector(this.arrowRight)) {
      this.arrowRight = this.navWrapper.querySelector(this.arrowRight);
    } else {
      throw new Error('Empty Arrow Right');
    }

    if (this.arrowLeft && this.navWrapper.querySelector(this.arrowLeft)) {
      this.arrowLeft = this.navWrapper.querySelector(this.arrowLeft);
    } else {
      throw new Error('Empty Arrow Left');
    }

    if (this.slideArtboard && this.slideWrapper.querySelector(this.slideArtboard)) {
      this.slideArtboard = this.slideWrapper.querySelector(this.slideArtboard);
    } else {
      throw new Error('Empty Artboard');
    }

    if (this.slidesText && this.slideWrapper.querySelector(this.slidesText)) {
      this.slidesText = this.slideWrapper.querySelectorAll(this.slidesText);
    } else {
      this.slidesText = null;
    }

    if (this.slidesClassName && this.slideWrapper.querySelector(this.slidesClassName)) {
      this.slides = this.slideWrapper.querySelectorAll(this.slidesClassName);
      this.slidesCount = this.slides.length;
      this.degDelta = 360 / this.slidesCount;
    } else {
      throw new Error('Zero Slides');
    }
  }

  slidesMove(side) {
    for (let i = 0; i < this.slidesCount; i++) {
      const degd = i * this.degDelta;
      const xd = Math.cos(degd * Math.PI / 180) * this.radius;
      const yd = Math.sin(degd * Math.PI / 180) * this.radius * -1;

      this.slides[i].style.transform = `translateX(${xd}vw) translateY(${yd}vw) rotateZ(${-this.rotateDeg}deg) rotateX(${-this.degxItem}deg) scaleY(${this.scaleYItem})`;

      if (this.slidesText) {
        this.slidesText[i].style.opacity = '0';
        this.slidesText[i].style.zIndex = '0';
      }
    }

    if (side) {
      switch(side) {
        case 'left':
          this.activeSlide = this.activeSlide > 0 ? this.activeSlide + 1 : this.activeSlide - 1;
          break;
        case 'right':
          this.activeSlide = this.activeSlide < (this.slidesCount - 1) ? this.activeSlide + 1 : 0;
          break;
      }
    }

    if (this.slidesText) {
      this.slidesText[this.activeSlide].style.opacity = '1';
      this.slidesText[this.activeSlide].style.zIndex = '100';
    }
  }

  build() {
    this.compileSelectos();

    this.navWrapper.classList.add('arrowblockclass');
    this.navWrapper.style.top = '0px';

    this.slideWrapper.classList.add('boardclass', 'slidesblockclass');
    this.slideWrapper.querySelector('div').style.transform = `translateZ(${-this.faraway}vw) translateY(${-this.updown}vw) rotateX(${this.rotateDisc}deg)`;

    if (this.slideArtboard.querySelectorAll('[data-elem-type="text"]')) {
      this.slideArtboard.querySelectorAll('[data-elem-type="text"]').forEach((element) => {
        element.style.transition = 'all 300ms ease';
      });
    }
    this.slideArtboard.style.transform = `rotateZ(${this.rotateDeg}deg)`;

    this.slidesMove();
  }

  toLeft() {
    this.rotateDeg = this.rotateDeg - this.degDelta;
    this.slideArtboard.style.transform = `rotateZ(${this.rotateDeg}deg)`;

    this.slidesMove('left');
  }

  toRight() {
    this.rotateDeg = this.rotateDeg + this.degDelta;
    this.slideArtboard.style.transform = `rotateZ(${this.rotateDeg}deg)`;

    this.slidesMove('right');
  }

  touchSwipe() {
    let touchStartX;
    let touchEndX;
    let timer;

    const timerDelay = () => {
      this.proxyDelay = 0;
      timer = setTimeout(() => {
        this.proxyDelay = this.delay;
      }, this.timeOutAfterSwipe);
    }

    const handleSwipe = () => {
      if (timer) {
        clearTimeout(timer);
      }

      if (touchEndX - touchStartX < -70) {
        this.toRight();
        timerDelay();
      } else if (touchEndX - touchStartX > 70) {
        this.toLeft();
        timerDelay();
      }
    };

    document.body.addEventListener('touchstart', (event) => {
      touchStartX = event.changedTouches[0].clientX;
    });

    document.body.addEventListener('touchend', (event) => {
      touchEndX = event.changedTouches[0].clientX;
      handleSwipe();
    });
  }

  hoverDelay() {
    const cls = this.slideWrapper.parentElement.parentElement;

    cls.addEventListener('mouseover', () => (this.proxyDelay = 0));
    cls.addEventListener('mouseout', () => (this.proxyDelay = this.delay));
  }

  autoPlay() {
    let autoPlay;
    const handleIntersection = (entries) => {
      entries.map((entry) => {
        if (entry.isIntersecting) {
          autoPlay = setInterval(() => {
            if (this.proxyDelay > 0) this.toRight();
          }, this.proxyDelay);
        } else {
          clearInterval(autoPlay);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection);
    observer.observe(this.slideWrapper);
  }

  init() {
    this.build();
    this.touchSwipe();
    this.autoPlay();
    this.hoverDelay();

    this.arrowRight.addEventListener('click', () => this.toRight());
    this.arrowLeft.addEventListener('click', () => this.toLeft());
  }
}

const slider549525146 = new Slider('.slider', {
  navWrapper: '.slider__nav',
  arrowRight: '.slider__next',
  arrowLeft: '.slider__prev',
  slideArtboard: '.slider__artboard',
  slidesClassName: '.slider__item',
  slidesText: '[data-elem-type="text"]',
  delay: 3000,
  scaling: 1.22,
  timeOut: 5000,
}).init();
