
class Game{
  constructor(){
    this.gameboard = document.querySelector('.gameboard');
    this.spaces = Array.from(document.querySelectorAll(".space"));
    this.state = [`-`, `-`, `-`, `-`, `-`, `-`, `-`, `-`, `-`];
  }
  init(){
    this.listen();
    this.updateBoard();
  }
  updateBoard(){
    this.spaces.forEach( (space, i) => {
      space.textContent = this.state[i];
    });
  }
  listen(){
    this.gameboard.addEventListener('click', e => {
      console.log(this);
      this.placeMarker(e.target);
    });
  }
  placeMarker(e){
    console.log(e);
    // this needs to update this.state
    // check turn status of players
    // inject "x", or "o" accordingly into this.state
    const spaceID = e.getAttribute('id').slice(-1);
    if(this.isPlayerOne()){
      this.state[spaceID - 1] = "x";
    } else{
      this.state[spaceID - 1] = "o";
    };
    console.log(this.state);
    this.passTurn();
    this.updateBoard();
  }
  isPlayerOne(){
    return (player1.turn ? true : false);
  }
  passTurn(){
    // if isPlayerOne returns true, change player1.turn to false, otherwise turn to true
    return (this.isPlayerOne() ? player1.turn = false : player1.turn = true);
  }
};

class Player {
  constructor(marker, turn){
    this.marker = marker;
    this.turn = turn;
  };
};

const game = new Game();
const player1 = new Player("x", false);
const player2 = new Player("o", false);
game.init();






// player1.placeMarker();
// player2.placeMarker();





// const gameboard = document.querySelector('.gameboard');
// gameboard.addEventListener('click', e => {
//   if(e.target.textContent === "x"){
//     e.target.textContent = "o";
//   } else{
//     e.target.textContent = "x";
//   };
// });

// create game-flow
