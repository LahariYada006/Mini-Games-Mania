let secret = Math.floor(Math.random() * 25) + 1;
let score = 20;
let highscore = 0;

const checkBtn = document.querySelector("#checkBtn");
const guessInput = document.querySelector("#guessInput");
const resultMsg = document.querySelector("#resultMsg");
const scoreDisplay = document.querySelector("#score");
const highScoreDisplay = document.querySelector("#highScore");
const resetBtn = document.querySelector("#resetBtn");
const instructionBtn = document.querySelector("#instructionsBtn");

// Modal
const modal = document.getElementById("instructionModal");
const closeModal = document.getElementById("closeModal");

// Show message with color
function showMessage(message, color = "white") {
  resultMsg.innerText = message;
  resultMsg.style.color = color;
}

// Guess check logic
function checkGuess() {
  const guess = Number(guessInput.value);

  if (!guess) {
    showMessage("⛔ Please enter a number!", "yellow");
    return;
  }

  if (guess < 1 || guess > 25) {
    showMessage("🚫 Number must be between 1 and 25", "white");
    return;
  }

  if (guess === secret) {
    showMessage("🎉 Correct! You guessed it!", "#00FF7F");

    if (score > highscore) {
      highscore = score;
      highScoreDisplay.innerText = highscore;
    }

    checkBtn.innerText = "New Game";
    checkBtn.removeEventListener("click", checkGuess);
    checkBtn.addEventListener("click", resetGame);
  } else {
    if (score > 1) {
      showMessage(guess > secret ? "📈 Too high!" : "📉 Too low!");
      score--;
      scoreDisplay.textContent = score;
    } else {
      showMessage("💥 Game Over!", "red");
      score = 0;
      scoreDisplay.textContent = score;

      checkBtn.innerText = "New Game";
      checkBtn.removeEventListener("click", checkGuess);
      checkBtn.addEventListener("click", resetGame);
    }
  }
}

// Reset game logic
function resetGame() {
  secret = Math.floor(Math.random() * 25) + 1;
  score = 20;
  scoreDisplay.textContent = score;
  guessInput.value = "";
  resultMsg.textContent = "";
  resultMsg.style.color = "white";

  checkBtn.innerText = "Check";
  checkBtn.removeEventListener("click", resetGame);
  checkBtn.addEventListener("click", checkGuess);
}

// Modal popup logic
instructionBtn.addEventListener("click", function () {
  modal.style.display = "block";
  document.body.classList.add("modal-open");
});

closeModal.addEventListener("click", function () {
  modal.style.display = "none";
  document.body.classList.remove("modal-open");
});

window.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  }
});

// Add initial event listeners
checkBtn.addEventListener("click", checkGuess);
resetBtn.addEventListener("click", resetGame);
