const body = document.querySelector("body");
const header = document.querySelector("header");
const headerHight = header.offsetHeight;
const btnCall = document.querySelector(".btnCall");
const menuMb = document.querySelector(".menuMb");
const secs = document.querySelectorAll("section");
const newsList = document.querySelectorAll("#news .inner ul li");
const counter = document.querySelectorAll(".counter");
const popup = document.querySelector("#popup");
const btnClose = popup.querySelector(".close");
const isCookie = document.cookie.indexOf("popup=done");
let active = true;
let posArr = [];

if(isCookie == -1){
    console.log("쿠키없음");
    popup.style.display = "block";
    body.style.overflow = "hidden";
}else{
    console.log("쿠키있음");
    popup.style.display = "none";
    body.style.overflow = "auto";
}

btnClose.addEventListener("click", e=>{
    e.preventDefault();

    let isChecked = popup.querySelector("input[type=checkbox]").checked;
    let idName = popup.getAttribute("id");

    if(isChecked) setCookie(idName, "done", 1);
    popup.style.display = "none";
    body.style.overflow = "auto";
})

setPos();

header.addEventListener("mouseenter",()=>{
    header.classList.add("on");
    btnCall.classList.add("on");
});

window.onscroll = ()=>{
    let windowTop = window.scrollY || window.pageYOffset;

    if(windowTop >= headerHight){
        header.classList.add("on");
        btnCall.classList.add("on");

    }else{
        header.classList.remove("on");
        btnCall.classList.remove("on");
    }

    if(windowTop >= posArr[0] - 300){
        if( active == true) {
            for(let i=0; i<counter.length; i++) countUp(i);
        }
        active = false;
    }
};

btnCall.onclick = function(e){
    e.preventDefault();

    btnCall.classList.toggle("on");
    menuMb.classList.toggle("on");
    body.classList.toggle("hidden");
}

newsList.forEach((el,index)=>{
    el.addEventListener("click",e=>{
        e.preventDefault();

        let isOn = e.currentTarget.classList.contains("on");
        if(isOn) return;

        activation(newsList, index);
    })
})

function setCookie(cookieName, cookieValue, time){
    const today = new Date();
    const date = today.getDate();
    today.setDate(date + time);

    const duedate = today.toGMTString();

    document.cookie = `${cookieName}=${cookieValue}; path=/; expires=${duedate};`;
}

function activation(arr,index){
    for(let item of arr){
        item.classList.remove("on");
    }
    arr[index].classList.add("on");
}

function setPos(){
    posArr = [];
    for(let el of secs) posArr.push(el.offsetTop);
}

function countUp(index){
    let num = 0;
    let targetNum = counter[index].getAttribute('data-rate');

    let timer = setInterval(()=>{
        ++num;
        counter[index].innerText = num;
        if(num == targetNum) clearInterval(timer);
    },50);
}