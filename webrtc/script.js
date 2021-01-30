const streamVideo = document.querySelector('.stream')
const playVideo = document.querySelector('.play');
let chunk;
const download = document.querySelector('#download');
let recorder;
let mediaStream;
document.querySelector('.start').addEventListener('click', start);
document.querySelector('.end').addEventListener('click', end);
document.querySelector('.play-video').addEventListener('click', play);

// MediaRecorder 测试
const constraints = {
  audio: false,
  video: true,
};

function start() {
  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      mediaStream = stream;
      streamVideo.srcObject = stream;
      streamVideo.play();
      recorder = new MediaRecorder(stream);
      recorder.ondataavailable = e => {
        chunk = e.data;
        download.href = URL.createObjectURL(chunk);
      };
      recorder.start();
    })
}

function end() {
  streamVideo.pause();
  recorder.stop();
  mediaStream.getTracks().forEach(track => {
    track.stop();
  });
}

function play() {
  playVideo.src = URL.createObjectURL(chunk);
  playVideo.play();
}