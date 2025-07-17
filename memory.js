const symbols = ["😍", "🎈", "🤩", "😂", "🎀", "😘", "😎", "😇", "💗", "😊"];
let cardValues = [];
let flippedCards = [];
let matchedCount = 0;
let startTime, endTime;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startGame() {
  const board = document.getElementById("game-board");
  const result = document.getElementById("result-text");
  board.innerHTML = "";
  result.textContent = "";

  cardValues = [...symbols, ...symbols]; // 10 pairs = 20 cards
  shuffle(cardValues);
  flippedCards = [];
  matchedCount = 0;
  startTime = new Date();

  for (let i = 0; i < 20; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-index", i);

    const front = document.createElement("div");
    front.classList.add("front");

    const back = document.createElement("div");
    back.classList.add("back");
    back.textContent = cardValues[i];

    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener("click", () => flipCard(card, i));

    board.appendChild(card);
  }
}

function flipCard(card, index) {
  if (card.classList.contains("flipped") || flippedCards.length === 2) return;

  card.classList.add("flipped");
  flippedCards.push({ index, card });

  if (flippedCards.length === 2) {
    const [first, second] = flippedCards;
    const firstSymbol = cardValues[first.index];
    const secondSymbol = cardValues[second.index];

    if (firstSymbol === secondSymbol) {
      matchedCount += 1;
      flippedCards = [];

      if (matchedCount === 10) {
        endTime = new Date();
        const totalSeconds = Math.floor((endTime - startTime) / 1000);
        document.getElementById("result-text").textContent =
          `🎉 You completed the challenge in ${totalSeconds} seconds!`;
      }
    } else {
      setTimeout(() => {
        first.card.classList.remove("flipped");
        second.card.classList.remove("flipped");
        flippedCards = [];
      }, 800);
    }
  }
}

// Start on load
window.onload = startGame;