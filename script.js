const player = document.querySelector('.player')
const video = document.querySelector('video')
const progressRange = document.querySelector('.progress-range')
const progressBar = document.querySelector('.progress-bar')
const playBtn = document.getElementById('playBtn')

const volumeIcon = document.getElementById('volume-icon')
const volumeRange = document.querySelector('.volume-range')
const volumeBar = document.querySelector('.volume-bar')

const currentTime = document.querySelector('.time-elapsed')
const duration = document.querySelector('.time-duration')

const speed = document.querySelector('.select-player-speed')
const fullscreenBtn = document.querySelector('.fullscreen')

// Play & Pause ----------------------------------- //

function displayPlayIcon() {
  playBtn.classList.replace('fa-pause', 'fa-play')
  playBtn.setAttribute('title', 'Play')
}

function togglePlay() {
  if (video.paused) {
    video.play()
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
  } else {
    video.pause()
    displayPlayIcon()
  }
}

// When video is ended, show play button icon Again
video.addEventListener('ended', displayPlayIcon)

// Progress Bar ---------------------------------- //

//Calculating time format of video

function displayTime(time) {
  const minutes = Math.floor(time / 60)
  let seconds = Math.floor(time % 60)

  seconds = seconds > 9 ? seconds : `0${seconds}`

  //   console.log(minutes, seconds)

  return `${minutes}:${seconds}`
}

//Update progress bar as video plays

function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`

  currentTime.textContent = `${displayTime(video.currentTime)} / `

  duration.textContent = `${displayTime(video.duration)}`
}

//Click to seek within the video

function setProgress(e) {
  //Detect the position in the progressBar range and the time dedicated

  const newTime = e.offsetX / progressRange.offsetWidth

  progressBar.style.width = `${newTime * 100}%`

  video.currentTime = newTime * video.duration

  //   console.log(newTime)
}

// Volume Controls ----------Check Volume Property//

let lastVolume = 1

// Volume bar handling;

function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth

  //Rounded volume up or down

  if (volume < 0.1) {
    volume = 0
  }

  if (volume > 0.9) {
    volume = 1
  }

  //   Change volume and width of rangeVolume
  volumeBar.style.width = `${volume * 100}%`
  video.volume = volume
  //   console.log(volume)

  //   Change volume icons depending on volume level

  volumeIcon.className = ''

  if (volume > 0.7) {
    volumeIcon.classList.add('fa-solid', 'fa-volume-up')
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add('fa-solid', 'fa-volume-down')
  } else if (volume === 0) {
    volumeIcon.classList.add('fa-solid', 'fa-volume-off')
  }

  lastVolume = volume
}

//Mute and unmute volume, Check Volume Property

function toggleMute() {
  volumeIcon.className = ''
  if (video.volume) {
    lastVolume = video.volume
    video.volume = 0
    volumeBar.style.width = 0
    volumeIcon.classList.add('fa-solid', 'fa-volume-off')
    volumeIcon.setAttribute('title', 'Unmute')
  } else {
    video.volume = lastVolume
    volumeBar.style.width = `${lastVolume * 100}%`
    volumeIcon.classList.add('fa-solid', 'fa-volume-up')
    volumeIcon.setAttribute('title', 'Mute')
  }
}

// Change Playback Speed -----Check Video playback property //

function changeVideoSpeed() {
  //   console.log('Video speed', video.playbackRate)
  //   console.log('selected value', speed.value)

  video.playbackRate = speed.value
}

// Fullscreen --------- Check fullscreen Video//

/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen()
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen()
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen()
  }

  video.classList.add('video-fullscreen')
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen()
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen()
  }

  video.classList.remove('video-fullscreen')
}

let fullscreen = false

//Toggling the fullScreen

function toggleFullScreen() {
  !fullscreen ? openFullscreen(player) : closeFullscreen()

  fullscreen = !fullscreen
}

// Event Listeners

playBtn.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)
video.addEventListener('timeupdate', updateProgress)
video.addEventListener('canplay', updateProgress)
progressRange.addEventListener('click', setProgress)
volumeRange.addEventListener('click', changeVolume)
volumeIcon.addEventListener('click', toggleMute)
speed.addEventListener('change', changeVideoSpeed)
fullscreenBtn.addEventListener('click', toggleFullScreen)
