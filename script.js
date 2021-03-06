var player1 = {name: "Player 1", sym: "×"};
var player2 = {name: "Player 2", sym: "⭕"};

var gridSize = 3;
var winLength = 3;

var currentPlayer = player1;

var emptyGame = function () {
  var game = [];
  for (var row = 0; row < gridSize; row++) {
    game.push([]);
    for (var col = 0; col < gridSize; col++) {
      game[row][col] = null;
    }
  }
  return game;
}

var makeColummns = function () {
  var gameColumn = document.createElement("div");
  gameColumn.classList.add("column");
  gameColumn.id = "game-col";

  var controlsColumn = document.createElement("div");
  controlsColumn.classList.add("column");
  controlsColumn.id = "control-col";

  var body = document.querySelector("body");
  body.append(gameColumn);
  body.append(controlsColumn);
}

var makeBoard = function () {
  var column = document.querySelector("#game-col");
  var gameBoard = document.createElement("div")
  gameBoard.setAttribute("id", "gameboard");

  for (var row = 0; row < gridSize; row++) {
    for (var col = 0; col < gridSize; col++) {
      var gameCell = document.createElement("div");
      gameCell.classList.add("gamecell");
      gameCell.setAttribute("data-row", row);
      gameCell.setAttribute("data-col", col);
      gameCell.style.width = `${650/gridSize - 2}px`;
      gameCell.style.height = `${650/gridSize - 2}px`;
      gameBoard.appendChild(gameCell);
   }
  }

  column.appendChild(gameBoard);

  var lCells = document.querySelectorAll("[data-col='0']");
  for (var i = 0; i < lCells.length; i++) {
    lCells[i].style.marginLeft = "-5px";
  }
  var rCells = document.querySelectorAll(`[data-col='${gridSize-1}']`);
  for (var i = 0; i < rCells.length; i++) {
    rCells[i].style.marginRight = "-5px";
  }
  var tCells = document.querySelectorAll("[data-row='0']");
  for (var i = 0; i < tCells.length; i++) {
    tCells[i].style.marginTop = "-5px";
  }
  var bCells = document.querySelectorAll(`[data-row='${gridSize-1}']`);
  for (var i = 0; i < bCells.length; i++) {
    bCells[i].style.marginBottom = "-5px";
  }

  addCellListeners();
}

var addCellListeners = function () {
  var cells = document.querySelectorAll(".gamecell");

  for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', updateGame);
  }
}

var removeCellListeners = function () {
  var cells = document.querySelectorAll(".gamecell");

  for (var i = 0; i < cells.length; i++) {
    cells[i].removeEventListener('click', updateGame);
  }
}

var buildPrompts = function() {
  var displayColumn = document.querySelector("#control-col");
  var form = document.createElement("div");
  form.id = "player-form";

  var info = ["p1-name", "p1-sym", "p2-name", "p2-sym"];
  for (var i = 0; i< info.length; i++) {
    var inputField = document.createElement("input");
    inputField.classList.add("input");
    inputField.setAttribute("type", "text");
    inputField.id = info[i];
    var inputLabel = document.createElement("label");
    inputLabel.classList.add("label");
    inputLabel.setAttribute("for", info[i]);
    form.appendChild(inputLabel);
    form.appendChild(inputField);
  }
  displayColumn.appendChild(form);

  document.querySelector("[for='p1-name']").innerText = "Player 1 name";
  document.querySelector("[for='p1-sym']").innerText = "Player 1 symbol";
  document.querySelector("[for='p2-name']").innerText = "Player 2 name";
  document.querySelector("[for='p2-sym']").innerText = "Player 2 symbol";
  document.querySelector("#p1-name").placeholder = player1.name;
  document.querySelector("#p1-sym").placeholder = player1.sym;
  document.querySelector("#p2-name").placeholder = player2.name;
  document.querySelector("#p2-sym").placeholder = player2.sym;

  var gridLabel = document.createElement("label");
  gridLabel.classList.add("label");
  gridLabel.setAttribute("for", "grid-input");
  gridLabel.id = "grid-label";
  gridLabel.innerText = "Grid size (more than 6 looks silly)";
  document.querySelector("#player-form").appendChild(gridLabel);
  var gridInput = document.createElement("input");
  gridInput.classList.add("input");
  gridInput.id = "grid-input";
  gridInput.placeholder = gridSize;
  document.querySelector("#player-form").appendChild(gridInput);
}

var startButton = function (action) {
  if (action === "create") {
    var startButton = document.createElement("button");
    startButton.id = "start-button";
    startButton.innerText = "Start Game";
    startButton.addEventListener("click", clickStart);
    var column = document.querySelector("#control-col");
    column.insertBefore(startButton, document.querySelector("#player-form"));
  } else if (action === "show") {
    var startButton = document.querySelector("#start-button");
    startButton.innerText = "Restart Game";
    startButton.style.visibility = "visible";
  } else {
    var startButton = document.querySelector("#start-button");
    startButton.style.visibility = "hidden";
  }
}

var clickStart = function () {
  var p1NameIn = document.querySelector("#p1-name");
  var p1SymIn = document.querySelector("#p1-sym");
  var p2NameIn = document.querySelector("#p2-name");
  var p2SymIn = document.querySelector("#p2-sym");
  var gridIn = document.querySelector("#grid-input");

  player1.name = p1NameIn.value === "" ? player1.name : p1NameIn.value;
  player1.sym = p1SymIn.value === "" ? player1.sym : p1SymIn.value;
  player2.name = p2NameIn.value === "" ? player2.name : p2NameIn.value;
  player2.sym = p2SymIn.value === "" ? player2.sym : p2SymIn.value;
  gridSize = gridIn.value === "" ? gridSize : gridIn.value;

  currentPlayer = player1;
  var board = document.querySelector("#gameboard");
  document.body.innerHTML = "";

  makeColummns();
  makeBoard();
  startButton("create");
  buildPrompts();
  gameState = emptyGame();
}

var makeMark = function (sym) {
  var divHeight = document.querySelector(".gamecell").style.height;
  divHeight = Number(divHeight.slice(0, -2));

  var mark = document.createElement("div");
  mark.classList.add("mark");
  mark.style.height = `${divHeight}px`;
  mark.style.width = `${divHeight}px`;
  mark.style.fontSize = `${divHeight}px`;
  mark.style.lineHeight = `${divHeight}px`;

  switch (sym) {
  case player1.sym:
    mark.innerText = player1.sym;
    break;
  case player2.sym:
    mark.innerText = player2.sym;
    break;
  }
  return mark;
}

var checkRows = function (game2DArr) {
  var game = game2DArr;
  var rowWin = null;

  for (var i = 0; i < game.length; i++) {
    if (game[i][0] !== null && arrMatch(game[i])) {
      rowWin = currentPlayer.name;
      break;
    }
  }
  return rowWin;
}

var checkCols = function (game2DArr) {
  var game = game2DArr;
  var colWin = null;

  for (var i = 0; i < game[0].length; i++) {
    var col = [];

    for (var j = 0; j < game.length; j++) {
      col.push(game[j][i]);
    }
    if (col[0] !== null && arrMatch(col)) {
      colWin = currentPlayer.name;
      break;
    }
  }
  return colWin;
}

var checkDias = function (game2DArr) {
  var game = game2DArr;
  var diaWin = null;
  var dia1 = [];
  var dia2 = [];

  for (var i = 0; i < game[0].length; i++) {
    dia1.push(game[i][i]);
    dia2.push(game[i][game.length - 1 - i]);
  }

  var dia = [dia1, dia2];

  for (var i = 0; i < dia.length; i++) {
    if (dia[i][0] !== null && arrMatch(dia[i])) {
      diaWin = currentPlayer.name;
      break;
    }
  }
  return diaWin;
}

var arrMatch = function (arr) {
  var arrMatch = true;
  var ele = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] !== ele) {
      arrMatch = false;
      break;
    }
  }
  return arrMatch;
}

var fullGame = function (game) {
  var end = true;

  for (var i = 0; i < game.length; i++) {
    for (var j = 0; j < game[0].length; j++) {
      if (game[i][j] === null) {
        end = false;
        return end;
      }
    }
  }
  return end;
}

var displayText = function (str, color) {
  if (document.querySelector("#announce") === null) {
    var announce = document.createElement("h1");
    announce.id = "announce";
    announce.innerText = str;
    announce.style.color = color;

    var displayColumn = document.querySelector("#control-col");
    displayColumn.appendChild(announce);
  } else {
    var announce = document.querySelector("#announce");
    announce.innerText = str;
    announce.style.color = color;
  }
}

var updateGame = function () {

  startButton("hide");
  var row = this.dataset.row;
  var col = this.dataset.col;
  if (gameState[row][col] !== null) {
    displayText("Cell already played!");
    return;
  }
  displayText(`${currentPlayer.name} just played`);
  gameState[row][col] = currentPlayer.sym;

  var symbol = makeMark(currentPlayer.sym);
  this.appendChild(symbol);

  if (fullGame(gameState)) {
    displayText("Game over; neither side won.", "purple");
    startButton("show");
  }

  var rowWin = checkRows(gameState);
  var colWin = checkCols(gameState);
  var diaWin = checkDias(gameState);

  if (rowWin) {
    displayText(`Row win: ${currentPlayer.name}'s ${currentPlayer.sym}s`, "#0ca204");
    removeCellListeners();
    startButton("show");
  } else if (colWin) {
    displayText(`Column win: ${currentPlayer.name}'s ${currentPlayer.sym}s`, "#0ca204");
    removeCellListeners();
    startButton("show");
  } else if (diaWin) {
    displayText(`Diagonal win: ${currentPlayer.name}'s ${currentPlayer.sym}s`, "#0ca204");
    removeCellListeners();
    startButton("show");
  }

  if (currentPlayer === player1) {
    currentPlayer = player2;
  } else {
    currentPlayer = player1;
  }
}

makeColummns();
makeBoard();
startButton("create");
buildPrompts();
var gameState = emptyGame();
