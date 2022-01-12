const main = document.querySelector(".gallery");
const frame = main.querySelector("#list");
const loading = frame.querySelector(".loading");
const search = frame.querySelector("#search");
const btnSearch = frame.querySelector(".btnSearch");
const errTxt = frame.querySelector(".errTxt");

const api_key = '04c5ace5347f338643f5a46006aa1910';
const format = 'json';
const path = 'https://www.flickr.com/services/rest/?';
const count = 15;
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
const url3 = `${path}method=${method3}&api_key=${api_key}&per_page=${count}&format=${format}&nojsoncallback=1&privacy_filter=1`;

// Search
const url4 = `${path}method=${method4}&api_key=${api_key}&per_page=${count}&format=${format}&nojsoncallback=1&privacy_filter=1`;

callData(url1);

function callData(url){
    fetch(url)
    .then(data=>{
        let result = data.json();
        return result;
    })
    .then(json=>{
        let items = json.photos.photo;
        console.log(items);

        createList(items);
    })
}

function createList(items){
    let htmls = "";

    items.forEach(data => {
        console.log(data);
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