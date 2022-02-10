const secs = document.querySelectorAll("section");
const newsList = document.querySelectorAll("#news .inner ul li");
const counter = document.querySelectorAll(".counter");

window.onscroll = ()=>{
    let windowTop = window.scrollY || window.pageYOffset;

    if(windowTop >= posArr[0] - 300){
        if( active == true) {
            for(let i=0; i<counter.length; i++) countUp(i);
        }
        active = false;
    }
};

newsList.forEach((el,index)=>{
    el.addEventListener("click",e=>{
        e.preventDefault();

        let isOn = e.currentTarget.classList.contains("on");
        if(isOn) return;

        activation(newsList, index);
    })
})

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