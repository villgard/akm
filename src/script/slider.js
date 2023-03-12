import { statSwiperTemplate } from "./statSwiperTemplate.js";
import { accounts } from "./accounts.js";

let swiperPaginationEls = ['BRAND STRATEGY', 'SOCIAL MEDIA', 'TARGET', 'MARKETING STRATEGY', 'ANALYTICS', 'APPS', 'MUSIC', 'E-COMMERCE'];

let swiper = new Swiper(".mySwiper", {
  effect: "fade",
  loop: true,
  loopedSlides: 1,
  slidesPerView: 1,
  centeredSlides: true,
  grabCursor: false,
  initialSlide: 0,
  allowTouchMove: false,
  simulateTouch: false,
  // noSwipingClass: 'swiper-no-swiping',
  keyboard: {
    enabled: true,
  },
  // cardsEffect: {
  //   rotate: false,
  //   slideShadows: false,
  //   perSlideOffset: 8,
  // },
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

swiper.on('init', (i) => {
  console.log(i);
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
    effect: "cards",
    loop: true,
    slidesPerView: 1,
    centeredSlides: true,
    grabCursor: true,
    loopedSlides: 3,
    initialSlide: 0,
    allowTouchMove: false,
    simulateTouch: false,
    noSwipingClass: 'swiper-no-swiping',
    setWrapperSize: true,
    keyboard: {
      enabled: true,
    },
    cardsEffect: {
      rotate: false,
      slideShadows: false,
      perSlideOffset: 1,
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
    btn.addEventListener('click', () => {
      statSliderContainer.classList.remove('_active');
      statSliderContainer.innerHTML = '';
    })
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
  mockupContainer.classList.add('_active');
  mockupContainer.innerHTML = `
    <div class="mockup-wrapper">
      <img src="sw0.png" alt="mockup">
      <video src="${index+1}.mp4" loop autoplay muted></video>
      <span class="popup-card__btn close"><span></span></span>
    </div>
`;

}