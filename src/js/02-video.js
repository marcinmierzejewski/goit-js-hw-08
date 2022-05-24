import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function() {
    console.log('played the video!');
});

player.getVideoTitle().then(function(title) {
    console.log('title:', title);
});

let getCurrentTime = localStorage.getItem("videoplayer-current-time")
const onPlay = function({seconds}) {
  localStorage.setItem("videoplayer-current-time", seconds);
  getCurrentTime = localStorage.getItem("videoplayer-current-time")
  console.log(`videoplayer-current-time: ${getCurrentTime}`)
};

player.on('timeupdate', onPlay);


player.setCurrentTime(getCurrentTime).then(function() {
  console.log(`Resume on: ${getCurrentTime} s.`)
}).catch(function(error) {
  switch (error.name) {
      case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

      default:
          // some other error occurred
          break;
  }
});