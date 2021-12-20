const btns = document.querySelectorAll(".tabBtns > li");
const boxs = document.querySelectorAll(".tabBoxs > div");

btns.forEach((el,index)=>{
    el.addEventListener("click",e=>{
        e.preventDefault();

        let isOn = e.currentTarget.classList.contains("on");
        if(isOn) return;

        activation(btns, index);
        activation(boxs, index);
    });
});

function activation(arr,index){
    for(let item of arr){
        item.classList.remove("on");
    }
    arr[index].classList.add("on");
}