import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
  console.log(`Resume on: ${localStorage.getItem('videoplayer-current-time')} s.`);
});

player.getVideoTitle().then(function (title) {
  console.log('Title:', title);
});

function saveCurrentTime(e) {
  localStorage.setItem('videoplayer-current-time', Math.round(e.seconds));
  console.log(`videoplayer-current-time: ${localStorage.getItem('videoplayer-current-time')}s`);
}

player.on('timeupdate', throttle(saveCurrentTime, 1000));

player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
