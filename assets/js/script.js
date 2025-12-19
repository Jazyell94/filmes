const video = document.getElementById("video");
const playBtn = document.getElementById("play");
const rewindBtn = document.getElementById("rewind");
const forwardBtn = document.getElementById("forward");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const time = document.getElementById("time");
const fullscreen = document.getElementById("fullscreen");
const quality = document.getElementById("quality");

// Play / Pause
playBtn.onclick = () => {
  if (video.paused) {
    video.play();
    playBtn.textContent = "⏸";
  } else {
    video.pause();
    playBtn.textContent = "▶";
  }
};

// Avançar / Voltar
rewindBtn.onclick = () => video.currentTime -= 10;
forwardBtn.onclick = () => video.currentTime += 10;

// Barra de progresso
video.addEventListener("timeupdate", () => {
  progress.value = (video.currentTime / video.duration) * 100;
  time.textContent = formatTime(video.currentTime) + " / " + formatTime(video.duration);
});

progress.oninput = () => {
  video.currentTime = (progress.value / 100) * video.duration;
};

// Volume
volume.oninput = () => video.volume = volume.value;

// Tela cheia
fullscreen.onclick = () => {
  if (!document.fullscreenElement) {
    video.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

// Qualidade
quality.onchange = () => {
  const currentTime = video.currentTime;
  const sources = video.querySelectorAll("source");

  sources.forEach(source => {
    if (source.dataset.quality === quality.value) {
      video.src = source.src;
    }
  });

  video.load();
  video.currentTime = currentTime;
  video.play();
};

// Formatar tempo
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}
