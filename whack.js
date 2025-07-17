const cursor = document.querySelector(".cursor");
const holes = [...document.querySelectorAll(".hole")];
const scoreEl = document.getElementById("score");

let score = 0;
let gameRunning = false;
let currentTimer = null;
const buttons = document.querySelectorAll(".buttons button");

// When hovering over buttons, hide the hammer
buttons.forEach((button) => {
  button.addEventListener("mouseenter", () => {
    document.body.classList.add("hide-cursor");
    button.style.cursor = "pointer"; // default pointer
  });
  button.addEventListener("mouseleave", () => {
    document.body.classList.remove("hide-cursor");
  });
});
const board = document.querySelector(".board");

document.addEventListener("mousemove", (e) => {
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";

  // Show hammer only when mouse is over the board
  if (e.target.closest(".board")) {
    document.body.classList.add("board-active");
    document.body.classList.remove("hide-cursor");
  } else if (e.target.closest(".buttons button")) {
    document.body.classList.remove("board-active");
    document.body.classList.add("hide-cursor");
  } else {
    document.body.classList.remove("board-active");
    document.body.classList.remove("hide-cursor");
  }
});

function run() {
  if (!gameRunning) return;

  const i = Math.floor(Math.random() * holes.length);
  const hole = holes[i];
  const img = document.createElement("img");

  const isBomb = Math.random() < 0.35;
  img.classList.add("mole");
  img.src = isBomb ? "bomb.png" : "MOLE.png";

  img.addEventListener("click", () => {
    if (!gameRunning) return;
    if (isBomb) {
      endGame();
    } else {
      score++;
      scoreEl.textContent = score;
      img.src = "whacker.png";
      clearTimeout(currentTimer);
      setTimeout(() => {
        if (hole.contains(img)) hole.removeChild(img);
        run();
      }, 500);
    }
  });

  hole.appendChild(img);

  currentTimer = setTimeout(() => {
    if (hole.contains(img)) hole.removeChild(img);
    run();
  }, 1500);
}

function startGame() {
  if (gameRunning) return; // Prevent multiple starts

  score = 0;
  scoreEl.textContent = score;
  document.querySelector(".scoree").textContent = "WHACK A MOLE";
  gameRunning = true;
  holes.forEach((hole) => {
    hole.innerHTML = "";
  });
  run();
}

function endGame() {
  gameRunning = false;
  document.querySelector(".scoree").textContent = "GAME OVER!";
  clearTimeout(currentTimer);
}

function showInstructions() {
  document.getElementById("overlay").style.display = "flex";
}
function closeInstructions() {
  document.getElementById("overlay").style.display = "none";
}
function goBack() {
  window.location.href = "first.html";
}

window.addEventListener("mousemove", (e) => {
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";
});

window.addEventListener("mousedown", () => {
  cursor.classList.add("active");
});
window.addEventListener("mouseup", () => {
  cursor.classList.remove("active");
});
