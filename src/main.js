import "./style.css";
import Knight from "./knightTravails";

const view = (function () {
  const instructions = document.querySelector("#instructions > b");

  function chooseSquare(square) {
    square.classList.add("chosen");
  }

  function deactivateSquare(square) {
    square.classList.add("inactive");
  }

  function resetSquare(square) {
    const classList = square.classList;
    classList.remove("inactive");
    classList.remove("chosen");
    classList.remove("inPath");
  }

  function addMove(move, i) {
    const correspondingSquare = document.querySelector(
      `.row:nth-child(${move[0] + 1}) > .square:nth-child(${move[1] + 1})`
    );
    correspondingSquare.innerText = `${i + 1}`;
    correspondingSquare.classList.add("inPath");
  }

  function changeInstruction(text) {
    instructions.innerText = text;
  }

  function renderPath(moves) {
    moves.forEach((move, i) => {
      addMove(move, i);
    });
  }

  return {
    chooseSquare,
    deactivateSquare,
    resetSquare,
    renderPath,
    changeInstruction,
  };
})();

const controller = (function () {
  const squares = document.querySelectorAll(".square");
  const resetButton = document.querySelector("button");
  let clickCount = 0;
  let start;

  function squareOnClick(pointer) {
    const chosenSquare = pointer.target;
    view.chooseSquare(chosenSquare);

    if (clickCount === 1) {
      // After second click, stop square selection
      squares.forEach((square) => {
        square.removeEventListener("click", squareOnClick);
        view.deactivateSquare(square);
      });

      // Get coordinates from column and row
      const end = [
        Number(chosenSquare.parentElement.getAttribute("data")),
        Number(chosenSquare.getAttribute("data")),
      ];
      // Get best move
      const moves = Knight.moves(start, end);
      view.renderPath(moves);
    } else {
      start = [
        Number(chosenSquare.parentElement.getAttribute("data")),
        Number(chosenSquare.getAttribute("data")),
      ];
      // Prevent double click
      view.changeInstruction("end");
      chosenSquare.removeEventListener("click", squareOnClick);
      clickCount += 1;
    }
  }

  function restart() {
    squares.forEach((square) => {
      view.resetSquare(square);
      square.addEventListener("click", squareOnClick);
      clickCount = 0;
      start = undefined;
      square.innerText = "";
      view.changeInstruction("start");
    });
  }

  squares.forEach((square) => square.addEventListener("click", squareOnClick));

  resetButton.addEventListener("click", restart);
})();
