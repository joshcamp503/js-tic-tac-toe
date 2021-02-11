
// set up game environment
const board = {
  state: [`x`, `o`, `x`, `o`, `x`, `o`, `x`, `o`, `x`]
};  

class Player {
  constructor(marker, turn){
    this.marker = marker;
    this.turn = turn;
  };
};

const player1 = new Player("x", true);
const player2 = new Player("o", false);
player1.placeMarker();
player2.placeMarker();

// create UI
const spaces = Array.from(
  document.querySelectorAll(".space")
  );

spaces.forEach( (space, i) => {
  space.textContent = board.state[i];
});

const gameboard = document.querySelector('.gameboard');
gameboard.addEventListener('click', e => {
  if(e.target.textContent === "x"){
    e.target.textContent = "o";
  } else{
    e.target.textContent = "x";
  };
});

// create game-flow
