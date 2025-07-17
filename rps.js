"use strict";

const choices = document.querySelectorAll(".choice");
const userText = document.getElementById("user-choice");
const computerText = document.getElementById("computer-choice");
const winnerText = document.getElementById("winner-text");

const modal = document.getElementById("instructions-modal");
const openModalBtn = document.querySelector(".btn--instructions");
const closeModalBtn = document.querySelector(".close");  // corrected selector
const backBtn = document.querySelector(".btn--back");

const computerOptions = ["rock", "paper", "scissors"];

// Game logic
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.dataset.choice;
    const computerChoice =
      computerOptions[Math.floor(Math.random() * computerOptions.length)];

    userText.textContent = `You chose: ${userChoice}`;
    computerText.textContent = `Computer chose: ${computerChoice}`;

    const result = getWinner(userChoice, computerChoice);
    winnerText.textContent = `Result: ${result}`;
  });
});

function getWinner(user, comp) {
  if (user === comp) return "It's a Draw!";
  if (
    (user === "rock" && comp === "scissors") ||
    (user === "paper" && comp === "rock") ||
    (user === "scissors" && comp === "paper")
  ) {
    return "You Win!";
  } else {
    return "You Lose!";
  }
}

// Modal logic
openModalBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Back button logic
backBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});
