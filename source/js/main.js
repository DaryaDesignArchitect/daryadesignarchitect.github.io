// Определите слайдеры и другие переменные
const swiper1 = document.querySelector('.slider-container');
const swiper2 = document.querySelector('.swiper-container');
const burger = document.querySelector('.burger');
const close = document.querySelector('.menu__close');
const menu = document.querySelector('.menu');
const playButtonsFirst = document.querySelectorAll('.main-slider__play ');

// Функция для инициализации первого слайдера
function initSlider1() {
  return new Swiper(swiper1, {
    centeredSlides: true,
    slidesPerView: 'auto', // Используем 'auto' для автоматического определения количества видимых слайдов
    loop: true,
    spaceBetween: 85,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    on: {
      init: function () {
        this.slides.on('mouseenter', function () {
          if (!this.swiper.autoplay.running) {
            this.swiper.autoplay.stop();
          }
        });

        this.slides.on('mouseleave', function () {
          if (!this.swiper.autoplay.running) {
            this.swiper.autoplay.start();
          }
        });
      },
    },
  });
}

// Функция для инициализации второго слайдера
function initSlider2() {
  return new Swiper(swiper2, {
    centeredSlides: true,
    slidesPerView: 1,
    loop: true,
    spaceBetween: 5,
    fadeEffect: {
      crossFade: true,
    },
    effect: 'fade',
    navigation: {
      nextEl: '.btn-right',
      prevEl: '.btn-left',
    },
  });
}

// Инициализируем слайдеры
let swiperSlider1 = initSlider1();
let swiperSlider2 = initSlider2();

// Обработчик события окончания перехода слайдов во втором слайдере
swiperSlider2.on('transitionEnd', function () {
  let videos = document.querySelectorAll('.first__slider video');
  videos.forEach((el) => {
    el.pause();
    el.currentTime = 0;
  });
  playButtonsFirst.forEach((el) => {
    el.style.display = 'block';
  });
});

// Добавляем медиа-запрос для изменения slidesPerView в первом слайдере
window.addEventListener('resize', function () {
  if (window.innerWidth <= 780) {
    swiperSlider1.params.slidesPerView = 1;
  } else {
    swiperSlider1.params.slidesPerView = 2;
  }
  swiperSlider1.update(); // Обновляем слайдер
});

// Инициализируем слайдер с учетом начальной ширины экрана
if (window.innerWidth <= 780) {
  swiperSlider1.params.slidesPerView = auto;
} else {
  swiperSlider1.params.slidesPerView = 2;
}
swiperSlider1.update(); 
// Обновляем слайдер

burger.addEventListener('click', () => {
	menu.classList.add('menu--visible');
});

close.addEventListener('click', () => {
	menu.classList.remove('menu--visible');
});

playButtonsFirst.forEach((el) => {
	el.addEventListener('click', (e) => {
		let video = e.currentTarget.closest('.main-slider__media').querySelector('video');
		video.play();
		e.currentTarget.style.display = 'none';
		setTimeout(() => {
			video.volume = 0.5;
		}, 1000);
	});
});

