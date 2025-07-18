let boxes = document.querySelectorAll(".box");
let turnText = document.querySelector("#turn");
let newGame = document.querySelector("#newGame");
let turnO = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  enableboxes();
  turnText.textContent = "Player O's turn";
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnText.innerText = "Player X's turn";
      turnO = false;
    } else {
      turnText.innerText = "Player O's turn";
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;

    checkWinner();
  });
});

const enableboxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
const disableboxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const showWinner = (winner) => {
  turnText.innerText = `Congratulations! Winner is ${winner}`;
  disableboxes();
};
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
      }
    }
  }
  let filledBoxes = 0;
  for (let box of boxes) {
    if (box.innerText !== "") {
      filledBoxes++;
    }
  }

  if (filledBoxes === 9) {
    turnText.innerText = "It's a Draw!";
    disableboxes();
  }
};
newGame.addEventListener("click", resetGame);

function toggleInstructions() {
  const instructions = document.getElementById("instructions");
  instructions.style.display =
    instructions.style.display === "none" ? "block" : "none";
}
