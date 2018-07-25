const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

const playbackRateBox = document.querySelector('.playbackRate__box')
const playbackRateBtn = document.querySelector('.playbackRate__btn')
const playbackRateList = document.querySelector('.playbackRate__list')
const playbackRateItems = playbackRateList.querySelectorAll('.playbackRate__item')

function togglePlay() {
    if (video.paused) {
        video.play()
    } else {
        video.pause()
    }
}

function updateButton() {
    let playing = ''
    if (video.paused) {
        playing = '►'
    } else {
        playing = '❚ ❚'
    }
    toggle.textContent = playing
}

function skip() {
    const val = this.dataset.skip
    video.currentTime += Number(val)
}

function updateRange() {
    video[this.name] = this.value
}

function updateProgress() {
    // console.dir(video);
    const percent = video.currentTime / video.duration * 100
    progressBar.style.flexBasis = `${percent}%`
}

function handleProgress(e) {
    // progressBar.style.flexBasis = `${percent}%`
    video.currentTime = parseFloat(video.duration * (e.offsetX / progress.offsetWidth))
}

function showPlaybackRate() {
    playbackRateList.style.display = 'block'
}
function hidePlaybackRate() {
    playbackRateList.style.display = 'none'
}

video.addEventListener('click', togglePlay)
toggle.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', updateProgress)

skipButtons.forEach(item => item.addEventListener('click', skip))

ranges.forEach(item => item.addEventListener('change', updateRange))
ranges.forEach(item => item.addEventListener('mousemove', updateRange))

let mouseDown = false
progress.addEventListener('click', handleProgress)
progress.addEventListener('mousedown', () => mouseDown = true)
progress.addEventListener('mousemove', (e) => mouseDown && handleProgress(e))
progress.addEventListener('mouseup', () => mouseDown = false)

playbackRateBox.addEventListener('mouseover', hidePlaybackRate)
playbackRateBtn.addEventListener('click', showPlaybackRate)
