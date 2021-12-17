const header = document.querySelector("header");
const headerHight = header.offsetHeight;

window.onscroll = ()=>{
    let windowTop = window.scrollY;

    if(windowTop >= headerHight){
        header.classList.add("scrollOn");
    }else{
        header.classList.remove("scrollOn");
    }
};