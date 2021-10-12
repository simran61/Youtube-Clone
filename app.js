const videoCardContainer = document.querySelector('.video-container');

let api_key= `AIzaSyDkOwffhk9AUfD50_8AaeeP8FQxLyvloQs`;
let video_http= `https://www.googleapis.com/youtube/v3/videos?`;
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";


//using new URLSearchParams to add parameters after the link
fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',    //by setting part param to snippet, we'll get video related data
    chart: 'mostPopular',   //setting chart param to mostPopular, to fetch most popular videos
    maxResults: 50,
    regionCode: 'IN'        //to specify from which region are we fetching the data
}))
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {            //in data we have many things but don't have channel icon, so will fetch it separately
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}

// search bar

const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})