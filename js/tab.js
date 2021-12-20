const btns = document.querySelectorAll(".tabBtns > li");
const boxs = document.querySelectorAll(".tabBoxs > div");
const faqTitle = document.querySelectorAll(".faq dl dt");
const faqSub = document.querySelectorAll(".faq dl dd");

btns.forEach((el,index)=>{
    el.addEventListener("click",e=>{
        e.preventDefault();

        let isOn = e.currentTarget.classList.contains("on");
        if(isOn) return;

        activation(btns, index);
        activation(boxs, index);
    });
});

faqTitle.forEach((el,index)=>{
    el.addEventListener("click",e=>{
        e.preventDefault();

        let isOn = e.currentTarget.classList.contains("on");
        if(isOn) return;

        activation(faqTitle, index);
        activation(faqSub, index);
    })
})

function activation(arr,index){
    for(let item of arr){
        item.classList.remove("on");
    }
    arr[index].classList.add("on");
}