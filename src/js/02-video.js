import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const startPlay = ({ seconds }) => {
    localStorage.setItem('videoplayer-current-time', seconds);
};

const vimeoPlayerEl = document.querySelector('#vimeo-player');
const player = new Vimeo(vimeoPlayerEl);

 player.on('timeupdate', throttle(startPlay, 1000));

player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
