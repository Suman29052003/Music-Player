const perfectAudio = new Audio('./music/Ed Sheeran - Perfect (Official Music Video).mp3')
const photographAudio = new Audio('./music/Ed Sheeran - Photograph (Official Music Video).mp3')
const shapeOfYouAudio = new Audio('./music/Ed Sheeran - Shape of You (Official Music Video).mp3')
const progressBar = document.getElementById('progressBar')
const prevbtn = document.getElementById('prev');
const playbtn = document.getElementById('play/pause');
const nextbtn = document.getElementById('next');
const title = document.getElementById('song-name');

const songs = [
    { ele: perfectAudio, audioName: 'Perfect by Ed Sheeran' },
    { ele: photographAudio, audioName: 'Photograph by Ed Sheeran' },
    { ele: shapeOfYouAudio, audioName: 'Shape Of You by Ed Sheeran' }
]

for (const song of songs) {
    song.ele.addEventListener('ended', function () {
        updateSong('next')
        playpauseSong();
    })
}

let songIndex = 0;
let currentSong = songs[songIndex].ele;
title.textContent = songs[songIndex].audioName

function updateProgressBar() {
    const songDuration = currentSong.duration;
    const songCurrentTime = currentSong.currentTime;
    const progress = (songCurrentTime / songDuration) * 100;
    progressBar.value = progress;
}

progressBar.addEventListener('input', function () {
    const seekTime = (progressBar.value / 100) * currentSong.duration
    currentSong.currentTime = seekTime;
})

playbtn.addEventListener('click', function () {
    playpauseSong();
});

prevbtn.addEventListener('click', function () {
    updateSong('prev')
    playpauseSong();
})

nextbtn.addEventListener('click', function () {
    updateSong('next')
    playpauseSong();
})

function updateSong(action) {
    currentSong.pause();
    currentSong.currentTime = 0;
    if (action === 'prev') {
        songIndex--;
        if (songIndex < 0) {
            songIndex = songs.length - 1;
        }
    }
    else if (action === 'next') {
        songIndex++;
        if (songIndex >= songs.length) {
            songIndex = 0;
        }
    }
    currentSong = songs[songIndex].ele;
    title.textContent = songs[songIndex].audioName
}

function playpauseSong() {
    if (currentSong.paused) {
        currentSong.play();
        playbtn.className = 'fa-solid fa-pause';
    }
    else {
        currentSong.pause();
        playbtn.className = 'fa-solid fa-play';
    }
}

currentSong.addEventListener('timeupdate', updateProgressBar);