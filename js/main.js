const body = document.querySelector("body");
const header = document.querySelector("header");
const headerHight = header.offsetHeight;
const btnCall = document.querySelector(".btnCall");
const menuMb = document.querySelector(".menuMb");

header.addEventListener("mouseenter",()=>{
    header.classList.add("on");
    btnCall.classList.add("on");
});

window.onscroll = ()=>{
    let windowTop = window.scrollY;
    
    if(windowTop >= headerHight){
        header.classList.add("on");
        btnCall.classList.add("on");

    }else{
        header.classList.remove("on");
        btnCall.classList.remove("on");
    }
};

btnCall.onclick = function(e){
    e.preventDefault();

    btnCall.classList.toggle("on");
    menuMb.classList.toggle("on");
    body.classList.toggle("hidden");
}

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
    }
});