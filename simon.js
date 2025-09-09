let gameseq = [];
let userseq = [];
let btns = ["purple", "pink", "cyan", "blue"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Start game on keypress
document.addEventListener("keypress", function () {
  if (!started) {
    console.log("game started");
    started = true;
    levelup();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelup() {
  userseq = []; // reset user sequence for new level
  level++;
  h2.innerText = `Level ${level}`;

  // choose random button
  let randIdx = Math.floor(Math.random() * 4);
  let randcolor = btns[randIdx];
  let randbtn = document.querySelector(`#${randcolor}`);

  gameseq.push(randcolor);
  console.log("Game sequence:", gameseq);

  // flash the chosen button
  gameFlash(randbtn);
}

function checkans(idx) {
  if (userseq[idx] === gameseq[idx]) {
    // if user completed the whole level sequence
    if (userseq.length === gameseq.length) {
      setTimeout(levelup, 1000);
    }
  } else {
    h2.innerText = `Game Over! Your Score: ${level}\nPress Any Key To Restart`;
    resetGame();
  }
}

function btnpress() {
  let btn = this;
  userFlash(btn);

  let usercolor = btn.getAttribute("id");
  userseq.push(usercolor);
  console.log("User sequence:", userseq);

  checkans(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
  btn.addEventListener("click", btnpress);
}

// Reset game
function resetGame() {
  started = false;
  gameseq = [];
  userseq = [];
  level = 0;
}
