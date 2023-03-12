import { accounts } from "./accounts.js";

export const statSwiperTemplate = (index) => {
  const men = accounts[index].statistic.gender.men;
  const women = accounts[index].statistic.gender.women;

  return `
  <div class="slider__nav">
    <div class="slider__prev swiperStat__prev"><img src="arrowPrev.svg" alt=""></div>
    <div class="slider__next swiperStat__next"><img src="arrowNext.svg" alt=""></div>
  </div>
  <div class="swiper swiperStat">
    <div class="swiper-wrapper">
      <div class="swiper-slide slide-card slide-modal">
        <div class="mask"></div>
        <div class="slide-card__header">
          <h4>Age Range</h4>
          <span>of your followers</span>
          <span class="popup-card__btn close"><span></span></span>
        </div>
        <div class="slide-card__caption">
          <span class="title">All</span>
          <div class="stats">
            <div class="progress">
              <span class="age">13-17</span>
              <div class="stat">
                <div class="bar">
                  <div class="filled" style="transform: translate3d(${accounts[index].statistic.age[0] - 100}%, 0, 0)"></div>
                </div>
                <span class="percent-label">${accounts[index].statistic.age[0] + '%'}</span>
              </div>
            </div>
            <div class="progress">
              <span class="age">18-24</span>
              <div class="stat">
                <div class="bar">
                  <div class="filled" style="transform: translate3d(${accounts[index].statistic.age[1] - 100}%, 0, 0)"></div>
                </div>
                <span class="percent-label">${accounts[index].statistic.age[1] + '%'}</span>
              </div>
            </div>
            <div class="progress">
              <span class="age">25-34</span>
              <div class="stat">
                <div class="bar">
                  <div class="filled" style="transform: translate3d(${accounts[index].statistic.age[2] - 100}%, 0, 0)"></div>
                </div>
                <span class="percent-label">${accounts[index].statistic.age[2] + '%'}</span>
              </div>
            </div>
            <div class="progress">
              <span class="age">35-44</span>
              <div class="stat">
                <div class="bar">
                  <div class="filled" style="transform: translate3d(${accounts[index].statistic.age[3] - 100}%, 0, 0)"></div>
                </div>
                <span class="percent-label">${accounts[index].statistic.age[3] + '%'}</span>
              </div>
            </div>
            <div class="progress">
              <span class="age">45-54</span>
              <div class="stat">
                <div class="bar">
                  <div class="filled" style="transform: translate3d(${accounts[index].statistic.age[4] - 100}%, 0, 0)"></div>
                </div>
                <span class="percent-label">${accounts[index].statistic.age[4] + '%'}</span>
              </div>
            </div>
            <div class="progress">
              <span class="age">55-64</span>
              <div class="stat">
                <div class="bar">
                  <div class="filled" style="transform: translate3d(${accounts[index].statistic.age[5] - 100}%, 0, 0)"></div>
                </div>
                <span class="percent-label">${accounts[index].statistic.age[5] + '%'}</span>
              </div>
            </div>
            <div class="progress">
              <span class="age">65+</span>
              <div class="stat">
                <div class="bar">
                  <div class="filled" style="transform: translate3d(${accounts[index].statistic.age[6] - 100}%, 0, 0)"></div>
                </div>
                <span class="percent-label">${accounts[index].statistic.age[6] + '%'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-slide slide-card slide-modal">
        <div class="mask"></div>
        <div class="slide-card__header">
          <h4>Gender</h4>
          <span>of your followers</span>
          <span class="popup-card__btn close"><span></span></span>
        </div>
        <div class="slide-card__caption">
          <div class="diagram">
            <div class="gender">
              <span class="percent percent-left">${men > women ? men : women}%</span>
              <span class="gender-label left">${men > women ? 'Men' : 'Women'}</span>
            </div>
            <div class="pie" style="--p: ${men < women ? men : women}"></div>
            <div class="gender">
              <span class="percent">${men < women ? men : women}%</span>
              <span class="gender-label right">${men < women ? 'Men' : 'Women'}</span>
            </div>
          </div>
          <div class="label">Most Active Times</div>
          <span class="title">Hours</span>
          <div class="hours">
            <div class="hour">
              <div class="hour-percent" style="--h: ${accounts[index].statistic.hours[0]}%"></div>
              <span class="hour-label">12a</span>
            </div>
            <div class="hour">
              <div class="hour-percent" style="--h: ${accounts[index].statistic.hours[1]}%"></div>
              <span class="hour-label">3a</span>
            </div>
            <div class="hour">
              <div class="hour-percent" style="--h: ${accounts[index].statistic.hours[2]}%"></div>
              <span class="hour-label">6a</span>
            </div>
            <div class="hour">
              <div class="hour-percent" style="--h: ${accounts[index].statistic.hours[3]}%"></div>
              <span class="hour-label">9a</span>
            </div>
            <div class="hour">
              <div class="hour-percent" style="--h: ${accounts[index].statistic.hours[4]}%"></div>
              <span class="hour-label">12p</span>
            </div>
            <div class="hour">
              <div class="hour-percent" style="--h: ${accounts[index].statistic.hours[5]}%"></div>
              <span class="hour-label">3p</span>
            </div>
            <div class="hour">
              <div class="hour-percent" style="--h: ${accounts[index].statistic.hours[6]}%"></div>
              <span class="hour-label">6p</span>
            </div>
            <div class="hour">
              <div class="hour-percent" style="--h: ${accounts[index].statistic.hours[7]}%"></div>
              <span class="hour-label">9p</span>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-slide slide-card slide-modal">
        <div class="mask"></div>
        <div class="slide-card__header">
          <h4>Top Location</h4>
          <span>of your followers</span>
          <span class="popup-card__btn close"><span></span></span>
        </div>
        <div class="slide-card__caption">
          <span class="title">Countries</span>
          <div class="stats">
            <div class="progress">
              <span class="age">${accounts[index].statistic.location[0].name}</span>
              <div class="stat">
                <div class="bar">
                  <div class="filled" style="transform: translate3d(${accounts[index].statistic.location[0].percent - 100}%, 0, 0)"></div>
                </div>
                <span class="percent-label">${accounts[index].statistic.location[0].percent + '%'}</span>
              </div>
            </div>
            <div class="progress">
              <span class="age">${accounts[index].statistic.location[1].name}</span>
              <div class="stat">
                <div class="bar">
                  <div class="filled" style="transform: translate3d(${accounts[index].statistic.location[1].percent - 100}%, 0, 0)"></div>
                </div>
                <span class="percent-label">${accounts[index].statistic.location[1].percent + '%'}</span>
              </div>
            </div>
            <div class="progress">
              <span class="age">${accounts[index].statistic.location[2].name}</span>
              <div class="stat">
                <div class="bar">
                  <div class="filled" style="transform: translate3d(${accounts[index].statistic.location[2].percent - 100}%, 0, 0)"></div>
                </div>
                <span class="percent-label">${accounts[index].statistic.location[2].percent + '%'}</span>
              </div>
            </div>
            <div class="progress">
              <span class="age">${accounts[index].statistic.location[3].name}</span>
              <div class="stat">
                <div class="bar">
                  <div class="filled" style="transform: translate3d(${accounts[index].statistic.location[3].percent - 100}%, 0, 0)"></div>
                </div>
                <span class="percent-label">${accounts[index].statistic.location[3].percent + '%'}</span>
              </div>
            </div>
            <div class="progress">
              <span class="age">${accounts[index].statistic.location[4].name}</span>
              <div class="stat">
                <div class="bar">
                  <div class="filled" style="transform: translate3d(${accounts[index].statistic.location[4].percent - 100}%, 0, 0)"></div>
                </div>
                <span class="percent-label">${accounts[index].statistic.location[4].percent + '%'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}