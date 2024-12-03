let canvas;
let world;
let keyboard;

let sounds = {
  win: new Audio('assets/audio/win.wav'),
  lose: new Audio('assets/audio/lose.wav')
};


window.addEventListener('load', init);

function init() {
  canvas = document.getElementById('canvas');
  canvas.addEventListener('gameOver', showEndScreen);

  document.getElementById('btn-start').addEventListener('click', startGame);
  document.getElementById('btn-again').addEventListener('click', startGame);
  document.getElementById('btn-home').addEventListener('click', showHomeScreen);
  document.getElementById('btn-instructions-back').addEventListener('click', showHomeScreen);
  document.getElementById('btn-imprint-back').addEventListener('click', showHomeScreen);
  document.getElementById('btn-instructions').addEventListener('click', function () {
    showSection('instructions');
  });
  document.getElementById('btn-imprint').addEventListener('click', function () {
    showSection('imprint');
  });
  document.getElementById('btn-mute').addEventListener('click', mute);
}

async function startGame() {
  keyboard = new Keyboard();
  if (world) {
    world = null;    
  }
  showLoadingScreen()
  const level1 = await createLevel1();
  world = new World(canvas, keyboard, level1);

  world.isCompleteyLoaded().then(() => {
    document.getElementById('game').classList.remove('d-none');
    document.getElementById('controls').classList.add('d-none');
    document.getElementById('endscreen-controls').classList.add('d-none');
    hideLoadingScreen();
  })

};

function showSection(section) {
  document.getElementById(section).classList.remove('d-none');
  document.getElementById('controls').classList.add('d-none');
  document.getElementById('wrapper').classList.add('bg-grey');
}

function mute() {
  document.getElementById('btn-mute').classList.toggle('muted');
  world.toggleMuteAll();
}


function showHomeScreen() {
  const wrapper = document.getElementById('wrapper');
  wrapper.classList.add('bg-home');
  wrapper.classList.remove('bg-gameWin', 'bg-gameOver', 'bg-grey');
  document.getElementById('instructions').classList.add('d-none');
  document.getElementById('imprint').classList.add('d-none');
  document.getElementById('game').classList.add('d-none');
  document.getElementById('controls').classList.remove('d-none');
  document.getElementById('endscreen-controls').classList.add('d-none');
}

function showEndScreen(event) {
  const wrapper = document.getElementById('wrapper');
  if(event.detail.status == 'lose'){
    wrapper.classList.add('bg-gameOver');
    sounds.lose.play();
  } else if(event.detail.status == 'win'){
    wrapper.classList.add('bg-gameWin');
    sounds.win.play();
  }
  document.getElementById('endscreen-controls').classList.remove('d-none');
  document.getElementById('game').classList.add('d-none');
}

function showLoadingScreen(){
  document.getElementById('loadingScreen').classList.remove('d-none');
}

function hideLoadingScreen(){
  document.getElementById('loadingScreen').classList.add('d-none');
}

document.addEventListener('contextmenu', function (e) {
  if (window.matchMedia('(pointer: coarse)').matches) {
      e.preventDefault();
  }
});