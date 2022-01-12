const main = document.querySelector(".gallery");
const frame = document.querySelector("#list");
const loading = document.querySelector(".loading");
const search = document.querySelector("#search");
const btnSearch = document.querySelector(".searchBtn");
const btns = document.querySelectorAll(".btns li");
const errTxt = document.querySelector(".errTxt");

const api_key = '04c5ace5347f338643f5a46006aa1910';
const format = 'json';
const path = 'https://www.flickr.com/services/rest/?';
const count = 16;
const method1 = 'flickr.interestingness.getList';
const method2 = 'flickr.people.getPhotos';
const method3 = 'flickr.favorites.getList';
const method4 = 'flickr.photos.search';

// Interest
const url1 = `${path}method=${method1}&api_key=${api_key}&per_page=${count}&format=${format}&nojsoncallback=1&privacy_filter=1`;

// Architecture
const user_id = '194310676@N02';
const url2 = `${path}method=${method2}&api_key=${api_key}&user_id=${user_id}&per_page=${count}&format=${format}&nojsoncallback=1&privacy_filter=1`;

// Landscape
const url3 = `${path}method=${method3}&api_key=${api_key}&user_id=${user_id}&per_page=${count}&format=${format}&nojsoncallback=1&privacy_filter=1`;

callData(url1);

btns[0].addEventListener("click",e=>{
    btnActive(e);
    callData(url1);
});

btns[1].addEventListener("click",e=>{
    btnActive(e);
    callData(url2);
});

btns[2].addEventListener("click",e=>{
    btnActive(e);
    callData(url3);
});

search.addEventListener("keypress",e=>{
    if(e.keyCode == 13){
        let tag = search.value;
        const url4 = `${path}method=${method4}&api_key=${api_key}&per_page=${count}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;

        if(tag != ""){
            callData(url4);
        }else{
            errTxt.innerText = "검색어를 입력하세요."
            errTxt.style.display = "block";
            frame.innerHTML = "";
        }
    }
});

btnSearch.addEventListener("click",()=>{
    let tag = search.value;
    const url4 = `${path}method=${method4}&api_key=${api_key}&per_page=${count}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;

    if(tag != ""){
        callData(url4);
    }else{
        errTxt.innerText = "검색어를 입력하세요."
        errTxt.style.display = "block";
        frame.innerHTML = "";
    }
});

function callData(url){
    frame.innerHTML = "";
    loading.classList.remove("off");
    frame.classList.remove("on");
    errTxt.style.display = "none";

    fetch(url)
    .then(data=>{
        let result = data.json();
        return result;
    })
    .then(json=>{
        let items = json.photos.photo;
        console.log(json);

        if(items.length > 0){
            createList(items);
            delayLoading();
        }else{
            loading.classList.add("on");
            errTxt.innerText = "검색하신 이미지의 데이터가 존재하지 않습니다.";
            errTxt.style.display = "block";
        }
    })
}

function createList(items){
    let htmls = "";

    items.forEach(data => {
        let imgSrcBig = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`;
        let imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_z.jpg`;

        htmls += `<li class="item">
                    <div>
                        <p><i class="las la-user-circle"></i>USER ID <span>${data.owner}</span></p>
                        <h3>${data.title}</h3>
                        <a href="${imgSrcBig}">
                            <img src="${imgSrc}" class="thumb">
                        </a>
                    </div>
                </li>`;
    });

    frame.innerHTML = htmls;
}

function delayLoading(){
    const imgs = frame.querySelectorAll("img");
    const len = imgs.length;
    let num = 0;

    for(let img of imgs){
        let thumb = img.closest(".item").querySelector(".thumb");
        thumb.onerror = e => {
            e.currentTarget.closest(".item").querySelector(".thumb").setAttribute("img","noneimg.jpg");
        }

        img.onload = () => {
            num++;

            if(num === len){
                isoLayout();
            }
        }
    }
}

function btnActive (e){
    for(let el of btns){
        el.classList.remove("on");
    }
    e.currentTarget.classList.add('on');
}

function isoLayout(){
    loading.classList.add("off");
    frame.classList.add("on");
    errTxt.style.display = 'none';

    new Isotope('#list',{
        itemSelector : ".item",
        columnWidth : ".item",
        transitionDuration : "0.5s"
    })
}