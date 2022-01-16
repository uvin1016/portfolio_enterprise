const vidList = document.querySelector(".vidList");
const playListId = "PLyH7cHtJQfIBAzys6jjWJjvLXUJ9D9kh9";
const key = "AIzaSyC_IlhghVXzhV7iDN3tlZnEOvdgyvyEDy0";
const num = 12;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}&maxResults=${num}`;

fetch(url)
.then(data=>{
    return data.json();
})
.then(json=>{
    let items = json.items;
    let result = "";
    console.log(items);

    items.forEach(item=>{
        let title = item.snippet.title;
        if(title.length > 35) title = title.substr(0,35)+"...";

        let con = item.snippet.description;
        if(con.length > 100) con = con.substr(0,100)+"...";

        let date = item.snippet.publishedAt;
        date = date.split("T")[0];

        result +=`<article>
                    <div class="inner">
                        <a href="${item.snippet.resourceId.videoId}" class="pic">
                            <img src="${item.snippet.thumbnails.standard.url}">
                        </a>
                        <div class="con">
                            <h2>${title}</h2>
                            <p>${con}</p>
                            <span>${date}<span>
                        </div>
                    </div>
                </article>`;
    });

    vidList.innerHTML = result;
});

vidList.addEventListener("click",e=>{
    e.preventDefault();
    if(!e.target.closest("a")) return;

    const vidId = e.target.closest("a").getAttribute("href");
    let pop = document.createElement("figure");
    pop.classList.add("pop");
    pop.innerHTML +=`
                    <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
                    <span class="btnClose"><i class="las la-times"></i></span>`;

    vidList.append(pop);
});

vidList.addEventListener("click",e=>{
    const pop = vidList.querySelector("figure");

    if(pop != null){
        const close = pop.querySelector(".btnClose i");

        if(e.target == close) e.target.closest("figure").remove();
    }
});