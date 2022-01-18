const visualSwiper = new Swiper(".visual_swiper", {
    spaceBetween: 30,
    effect: "fade",
    loop: true,
    autoplay: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
});

const eventsSwiper = new Swiper(".events_swiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        320 : {
            slidesPerView : 1
        },
        510 : {
            slidesPerView : 2
        },
        1200 : {
            slidesPerView : 3
        }
    }
});
