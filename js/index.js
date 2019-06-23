/**
 * Tic Tac Toe Game
 **/
var BOARD_SIZE, EMPTY = "&nbsp;", boxes = [], turn = "X", score, moves;

/**
* Start the the game after the player input the board size.
**/
function start() {
  BOARD_SIZE = document.getElementById("size").value;
  if (BOARD_SIZE < 3) {
    return alert("Minimum board size is 3");
  }
  document.getElementById("tictactoe").style.display = "inherit";
  document.getElementById("player").style.display = "block";
  document.getElementById("start").style.display = "none";
  begin();
}

/**
 * Begin the game
 */
function begin() {
  var board = document.createElement("table");
  board.setAttribute("border", 1);
  board.setAttribute("cellspacing", 0);

  var identifier = 1;
  for (var i = 0; i < BOARD_SIZE; i++) {
    var row = document.createElement("tr");
    board.appendChild(row);
    for (var j = 0; j < BOARD_SIZE; j++) {
      var cell = document.createElement("td");
      cell.setAttribute("height", 120);
      cell.setAttribute("width", 120);
      cell.setAttribute("align", "center");
      cell.setAttribute("valign", "center");
      cell.classList.add("col" + j, "row" + i);
      if (i == j) {
        cell.classList.add("diagonal0");
      }
      if (j == BOARD_SIZE - i - 1) {
        cell.classList.add("diagonal1");
      }
      cell.identifier = identifier;
      cell.addEventListener("click", setSpace);
      row.appendChild(cell);
      boxes.push(cell);
      identifier += identifier;
    }
  }

  document.getElementById("tictactoe").appendChild(board);
  newGame();
}

/**
 * Start a new game
 */
function newGame() {
  score = {
    X: 0,
    O: 0
  };
  moves = 0;
  turn = "X";
  document.getElementById("turn").textContent = "Player " + turn;
  boxes.forEach(function(square) {
    square.innerHTML = EMPTY; // Empty all the space
  });
}

/**
 * Check if a win or not
 */
function checkWin(clicked) {
  var memberOf = clicked.className.split(/\s+/); // Get all cell classes
  for (var i = 0; i < memberOf.length; i++) {
    var testClass = "." + memberOf[i];
    var items = contains("#tictactoe " + testClass, turn);
    if (items.length == BOARD_SIZE) return true; // winning condition: turn == BOARD_SIZE
  }
  return false;
}

/**
 * Helper function to check if NodeList from selector has a particular text
 */
function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return [].filter.call(elements, function(element) {
    return RegExp(text).test(element.textContent);
  });
}

/**
 * Sets clicked square and also updates the turn.
 */
function setSpace() {
  if (this.innerHTML !== EMPTY) return;
  this.innerHTML = turn;
  moves += 1;
  score[turn] += this.identifier;
  if (checkWin(this)) {
    alert("Winner: Player " + turn);
    if( confirm('Want to play a new game ?') ) newGame();
  } else if (moves === BOARD_SIZE * BOARD_SIZE) {
    alert("Draw");
    if( confirm('Want to play a new game ?') ) newGame();
  } else {
    turn = turn === "X" ? "O" : "X";
    document.getElementById("turn").textContent = "Player " + turn;
  }
}
