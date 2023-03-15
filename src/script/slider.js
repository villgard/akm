import { statSwiperTemplate } from "./statSwiperTemplate.js";
import { accounts } from "./accounts.js";

const mySwiper = document.querySelector('.mySwiper');
const swiperPaginationEls = ['BRAND STRATEGY', 'SOCIAL MEDIA', 'TARGET', 'MARKETING STRATEGY', 'ANALYTICS', 'APPS', 'MUSIC', 'E-COMMERCE'];

let swiper = new Swiper(mySwiper, {
  effect: "fade",
  loop: true,
  loopedSlides: 1,
  slidesPerView: 1,
  centeredSlides: true,
  grabCursor: false,
  initialSlide: 0,
  allowTouchMove: false,
  simulateTouch: false,
  keyboard: {
    enabled: true,
  },
  navigation: {
    nextEl: '.mySwiper__next',
    prevEl: '.mySwiper__prev',
  },
  pagination: {
    type: 'bullets',
    clickable: true,
    el: '.slider__pagination',
    renderBullet: function (index, className) {
      return `<span class="${className}">${swiperPaginationEls[index]}</span>`;
    },
  },
  on: {
    afterInit(sw) {
      touchSwipe('.services__content', sw);
    }
  }
});


const menuBullets = document.querySelectorAll('.swiper-pagination-bullet');
const closeBtns = document.querySelectorAll('.mySwiper__close');

menuBullets.forEach((b) => {
  b.addEventListener('click', () => {
    if (!mySwiper.classList.contains('_active')) {
      mySwiper.classList.add('_active');
    }
  });
});

closeBtns.forEach((b) => {
  b.addEventListener('click', () => {
    mySwiper.classList.remove('_active');
  });
});

let swiperSec = new Swiper(".mySwiperSec", {
  effect: "cards",
  loop: true,
  slidesPerView: 1,
  centeredSlides: true,
  autoplay: true,
  grabCursor: false,
  initialSlide: 0,
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
    nextEl: '.mySwiperSec__next',
    prevEl: '.mySwiperSec__prev',
  },
  on: {
    afterInit(sw) {
      touchSwipe('.accounts__content', sw);
    }
  }
})



const accTitle = document.querySelector('.js-accounts-title');
const accCaption = document.querySelector('.js-accounts-caption');
const statBtn = document.querySelector('.js-accounts-button');
const statSliderContainer = document.querySelector('.slider-stat');

let accIndex;

statBtn.classList.add('_hidden');

swiperSec.on('realIndexChange', (i) => {
  accTitle.innerHTML = `<a href="https://instagram.com/${accounts[i.realIndex].title}" target="_blank">${accounts[i.realIndex].title}</a>`;
  accCaption.innerHTML = `${accounts[i.realIndex].caption}`;

  accIndex = i.realIndex;

  if (i.realIndex === 0) {
    statBtn.classList.add('_hidden');
  } else {
    statBtn.classList.remove('_hidden');
  }
});

statBtn.addEventListener('click', () => openInfo(accIndex));


function openInfo(index) {
  statSliderContainer.classList.add('_active');

  statSliderContainer.innerHTML = statSwiperTemplate(index);

  let swiperStat = new Swiper('.swiperStat', {
    effect: "fade",
    loop: true,
    loopedSlides: 1,
    slidesPerView: 1,
    centeredSlides: true,
    grabCursor: false,
    initialSlide: 0,
    allowTouchMove: false,
    simulateTouch: false,
    keyboard: {
      enabled: true,
    },
    navigation: {
      nextEl: '.swiperStat__prev',
      prevEl: '.swiperStat__next',
    },
    on: {
      afterInit(sw) {
        touchSwipe('.slider-stat', sw);
      }
    }
  })

  const closeBtns = document.querySelectorAll('.close');

  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => close(statSliderContainer))
  })
}

let swiperThird = new Swiper(".mySwiperThird", {
  effect: "cards",
  loop: true,
  loopedSlides: 3,
  slidesPerView: 1,
  centeredSlides: true,
  autoplay: false,
  grabCursor: false,
  initialSlide: 0,
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
    nextEl: '.mySwiperThird__next',
    prevEl: '.mySwiperThird__prev',
  },
  on: {
    afterInit(sw) {
      touchSwipe('.work__content', sw);
    }
  }
});

const swiperThirdButtons = document.querySelectorAll('.js-slide-btn');
const mockupContainer = document.querySelector('.js-mockup');
let swiperThirdIndex = 0;

swiperThird.on('activeIndexChange', (i) => {
  swiperThirdButtons.forEach((btn) => {
    if (i.realIndex === 1) {
      btn.classList.add('_hidden');
    } else {
      btn.classList.remove('_hidden')
    }
    swiperThirdIndex = i.realIndex;
  })
})

swiperThirdButtons.forEach((btn) => {
  btn.addEventListener('click', () => openMockup(swiperThirdIndex))
})

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
}

function openMockup(index) {
  mockupContainer.innerHTML = `
    <div class="mockup-wrapper">
      <img src="sw0.png" alt="mockup">
      <video src="${index}.mp4" loop autoplay muted></video>
      <span class="popup-card__btn close js-mockup-close"><span></span></span>
    </div>
  `;
  mockupContainer.classList.add('_active');
  document.querySelector('.js-mockup-close').addEventListener('click', () => close(mockupContainer));
}

document.addEventListener('mousedown', (e) => {
  if (mySwiper.classList.contains('_active') && !e.composedPath().includes(mySwiper)) {
    mySwiper.classList.remove('_active');
  }

  if (statSliderContainer.classList.contains('_active') && !e.composedPath().includes(statSliderContainer)) {
    close(statSliderContainer);
  }

  if (mockupContainer.classList.contains('_active') && !e.composedPath().includes(mockupContainer)) {
    close(mockupContainer);
  }
});

function close(str) {
  str.classList.remove('_active');
  str.innerHTML = '';
}