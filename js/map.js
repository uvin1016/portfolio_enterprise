var container = document.getElementById("map");
var branch_btns = document.querySelectorAll(".branch li");
const t_on = document.querySelectorAll(".traffic li")[1];
const t_off = document.querySelectorAll(".traffic li")[2];
let zoom = false;
var options = {
	center: new kakao.maps.LatLng(37.255984060183515,127.06404403910398),
	level: 3
};

var map = new kakao.maps.Map(container, options); // 지도를 생성합니다

// -------------------------------------------------------------------------------------------------
var positions = [
    {
        title: '수원본점', 
        latlng: new kakao.maps.LatLng(37.255984060183515,127.06404403910398),
        imgSrc: 'img/marker.png',
        imgSize: new kakao.maps.Size(25,34),
        imgPos: {offset: new kakao.maps.Point(12,34)},
        button: branch_btns[0]
    },
    {
        title: '제주지점', 
        latlng: new kakao.maps.LatLng(33.44800770234571,126.91627057794953),
        imgSrc: 'img/marker.png',
        imgSize: new kakao.maps.Size(25,34),
        imgPos: {offset: new kakao.maps.Point(12,34)},
        button: branch_btns[1]
    },
    {
        title: '부산지점', 
        latlng: new kakao.maps.LatLng(35.101579645953,129.12036718866455),
        imgSrc: 'img/marker.png',
        imgSize: new kakao.maps.Size(25,34),
        imgPos: {offset: new kakao.maps.Point(12,34)},
        button: branch_btns[2]
    }
];

for(let i=0; i<positions.length; i++){
    new kakao.maps.Marker({
        map: map,
        position: positions[i].latlng,
        title: positions[i].title,
        image: new kakao.maps.MarkerImage(positions[i].imgSrc,positions[i].imgSize,positions[i].imgPos)
    });

    positions[i].button.onclick = e=>{
        e.preventDefault();

        setCenter(positions[i].latlng);

        for(let m=0; m<positions.length; m++){
            positions[m].button.classList.remove("on");
        }
        positions[i].button.classList.add("on");
    }
}

window.onresize = ()=>{
    let active_btn = document.querySelector(".branch li.on");
    let active_index = active_btn.getAttribute("data-index");

    setCenter(positions[active_index].latlng);
}

function setCenter(target){
    let moveLatLon = target;

    map.setCenter(moveLatLon);
}

t_on.addEventListener("click",e=>{
    e.preventDefault();

    if(t_on.classList.contains("on")) return;

    map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);

    t_on.classList.add("on");
    t_off.classList.remove("on");
});

t_off.addEventListener("click",e=>{
    e.preventDefault();

    if(t_off.classList.contains("on")) return;

    map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC); 

    t_on.classList.remove("on");
    t_off.classList.add("on");
});

function setZoomable(zoomable) {
    // 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
    map.setZoomable(zoomable);    
}
setZoomable(zoom);