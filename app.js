
class Game{
  constructor(){
    // define which parts of DOM constitute the game board
    // initialize the "board state" to keep track of x's and o's
    this.gameboard = document.querySelector('.game-table');
    this.spaces = Array.from(document.querySelectorAll(".space"));
    this.state = [null, null, null, null, null, null, null, null, null];
  }

  // commences the entire game
  // listens for players to click a space
  init(){
    this.gameboard.addEventListener('click', e => {
      if (!e.target.innerHTML) {
        this.updateBoard(e.target);
      };
    });
    console.log();
  }

  updateBoard(e){
    // check who's turn it is (is it player 1's turn?), then...
    // update this.state array with "x" or "o" accordingly
    // update UI
    // check this.state for win conditions
    // switch turns
    const spaceID = e.getAttribute('id').slice(-1);
    if(this.isPlayerOne()){
      this.state[spaceID - 1] = "x";
    } else{
      this.state[spaceID - 1] = "o";
    };
    this.updateUI();
    this.checkForWin(this.state);
    this.switchPlayer();
  }

  updateUI(){
    // check this.state array and add corresponding 
    // img for x's and o's to UI
    // update UI to reflect player's current score
    const oMarkerHTML = `<img src='donut.png' class='space-img'>`;
    const xMarkerHTML = `<img src='lug-wrench.png' class='space-img'>`;
    this.spaces.forEach( (space, i) => {
      if (this.state[i] == `x`){
        // place tire iron image in this space
        space.innerHTML = xMarkerHTML;
      } else if (this.state[i] == `o`) {
        // place donut image in this space
        space.innerHTML = oMarkerHTML;
      } else {
        space.innerHTML = ``;
      }
    });
    document.querySelector('#player1-score').textContent = player1.score;
    document.querySelector('#player2-score').textContent = player2.score;
  }

  isPlayerOne(){
    // determine who's turn it is
    return (player1.turn ? true : false);
  }

  switchPlayer(){
    // if isPlayerOne returns true, change player1.turn to false, otherwise turn to true
    return (this.isPlayerOne() ? player1.turn = false : player1.turn = true);
  }

  declareResult(str) {
    // !!need to add congratulations message to DOM before board wipe

    const player1Name = document.querySelector('#player1-name').textContent;
    const player2Name = document.querySelector('#player2-name').textContent;
    
    if (str === "win") {
      if (this.isPlayerOne()){
        document.querySelector('.popup-content').firstElementChild.textContent = `${player1Name} wins!`;
      } else {
        document.querySelector('.popup-content').firstElementChild.textContent = `${player2Name} wins!`;
      };
    } 
    const wrapper = document.querySelector(".popup-wrapper")
    wrapper.style.display = "block";
    document.querySelector('.ok').addEventListener('click', () => wrapper.style.display = "none");
  }

  clearBoard() {
    this.state = [null, null, null, null, null, null, null, null, null];
    this.updateUI();
  }

  updateScore() {
    // counts how many times a given player has won
    return (this.isPlayerOne() ? player1.score++ : player2.score++);
  }

  checkForWin(arr){
    // argument passed into here is this.state array
    //  check game-end conditions
    // if win conditions met, pass that to next function and reset
    // else if the board is full but no win conditions met then 
    // it's a stalemate
    if (
        (areEqual(arr[0],arr[1],arr[2])) ||
        (areEqual(arr[3],arr[4],arr[5])) ||
        (areEqual(arr[6],arr[7],arr[8])) ||
        (areEqual(arr[0],arr[3],arr[6])) ||
        (areEqual(arr[1],arr[4],arr[7])) ||
        (areEqual(arr[2],arr[5],arr[8])) ||
        (areEqual(arr[0],arr[4],arr[8])) ||
        (areEqual(arr[2],arr[4],arr[6])) 
      ) {
      this.updateScore();
      this.declareResult("win")
      this.clearBoard();
      } else if (this.boardFull()) {
        this.declareResult("tie")
        this.clearBoard();
        this.updateScore();        
      } else {
        return false;
      };
    // areEqual defined: checks if arguments passed to it are equal
    function areEqual(){
      var len = arguments.length;
      for (var i = 1; i< len; i++){
         if (arguments[i] === null || arguments[i] !== arguments[i-1])
            return false;
      } 
      return true;
     }      

  };  

  boardFull(){
    // check if every space on the board has been chosen/marked
    return this.state.every(i => i != null);
  };

  resetScores() {
    // Reset player scores to 0
    player1.score = 0;
    player2.score = 0;
    // Clear UI
    this.clearBoard();
  };

  resetNames() {
    // Reset player names to default
    document.querySelector('#player1-name').textContent = "Player 1";
    document.querySelector('#player2-name').textContent = "Player 2";
  };

  resetAll() {
    this.resetScores()
    this.resetNames()
  }

};

class Player {
  constructor(marker, turn, score){
    this.marker = marker;
    this.turn = turn;
    this.score = 0;
  };
};

document.querySelector('a');

const game = new Game();
const player1 = new Player("x", false);
const player2 = new Player("o", false);
game.init();


// Change Player name feature
// First make the <a> tag open a form by changing css display attribute
// query all <a>'s then add event listener to each
// traverse the DOM from <a> to display form in appropriate place
  const aList = Array.from(document.querySelectorAll('a'));
  for (let i = 0; i<aList.length; i++) {
    aList[i].addEventListener('click', function(e) {
      this.parentElement.parentElement.firstElementChild.style.display = "block";
    })
  };
// Make the form input button change the player's name
// Traverse DOM to input appropriate form data
  const nameForm = Array.from(document.querySelectorAll('.name-form'));
  for (let i=0; i<nameForm.length; i++) {
    nameForm[i].addEventListener('submit', function(e) {
      e.preventDefault();
      const formText = this.querySelector(".pname");
      let playerName = this.parentElement.parentElement.querySelector('h5')
      playerName.textContent = formText.value;
      this.parentElement.style.display = "none";
    })
  }
// End of Change Player Name feature

// Add reset feature
const resetScoresButton = document.querySelector('.reset-scores-button')
resetScoresButton.addEventListener('click', function(e) {
  game.resetScores();
})

const resetNamesButton = document.querySelector('.reset-names-button')
resetNamesButton.addEventListener('click', function(e) {
  game.resetNames();
})

const clearBoardButton = document.querySelector('.clear-board-button')
clearBoardButton.addEventListener('click', function(e) {
  game.clearBoard();
})



