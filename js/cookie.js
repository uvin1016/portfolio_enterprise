const frame = document.querySelector("body");
const popup = document.querySelector("#popup");
const btnClose = popup.querySelector(".close");
const isCookie = document.cookie.indexOf("popup=done");
let active = true;
let posArr = [];

if(isCookie == -1){
    console.log("쿠키없음");
    popup.style.display = "block";
    frame.style.overflow = "hidden";
}else{
    console.log("쿠키있음");
    popup.style.display = "none";
    frame.style.overflow = "auto";
}

btnClose.addEventListener("click", e=>{
    e.preventDefault();

    let isChecked = popup.querySelector("input[type=checkbox]").checked;
    let idName = popup.getAttribute("id");

    if(isChecked) setCookie(idName, "done", 1);
    popup.style.display = "none";
    frame.style.overflow = "auto";
});

setPos();

function setCookie(cookieName, cookieValue, time){
    const today = new Date();
    const date = today.getDate();
    today.setDate(date + time);

    const duedate = today.toGMTString();

    document.cookie = `${cookieName}=${cookieValue}; path=/; expires=${duedate};`;
}