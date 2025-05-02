let player1Wins = 0;
let player2Wins = 0;
let timer = 0; 
let timerInterval = null; 

const boardSize = 15;
const board = [];
for (let i = 0; i < boardSize; i++) {
    board[i] = [];
    for (let j = 0; j < boardSize; j++) {
        board[i][j] = null;
    }
}

let currentPlayer = "player1";

const gameBoard = document.getElementById("game-board");
const player1WinsDisplay = document.getElementById("player-wins");
const player2WinsDisplay = document.getElementById("player2-wins");
const currentPlayerDisplay = document.getElementById("current-player");
const playButton = document.getElementById("play-button");
const timerDisplay = document.getElementById("timer"); 


gameBoard.style.display = "grid";
gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, 30px)`; 
gameBoard.style.gridTemplateRows = `repeat(${boardSize}, 30px)`; 
gameBoard.style.gap = "5px";  

playButton.addEventListener('click', startGame);


function startGame() {
    player1Wins = 0;
    player2Wins = 0;
    updateScore();


    playButton.textContent = "Restart Game";
    resetTimer();


    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            board[i][j] = null;
        }
    }

    document.querySelectorAll(".cell").forEach(cell => {
        cell.className = "cell";
    });

    currentPlayer = "player1"; 
    updateCurrentPlayerDisplay(); 
    startTimer();
}


function startTimer() {
    timerInterval = setInterval(() => {
        timer++; 
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        timerDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
    }, 1000); 
}


function resetTimer() {
    clearInterval(timerInterval); 
    timer = 0; 
    timerDisplay.textContent = "00:00"; 
}


function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}



for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.row = i;
        cell.dataset.col = j;
        gameBoard.appendChild(cell);

        
        cell.addEventListener("mouseenter", function () {
            if (currentPlayer === "player1") {
                cell.classList.add("hover-player1");
                cell.classList.remove("hover-player2");
            } else {
                cell.classList.add("hover-player2");
                cell.classList.remove("hover-player1");
            }
        });

        
        cell.addEventListener("click", function () {
            if (board[i][j] === null) {
                makeMove(i, j, currentPlayer);

                if (checkWin(i, j, currentPlayer)) {
                    if (currentPlayer === "player1") {
                        player1Wins++;
                        alert("Player 1 wins!");
                    } else {
                        player2Wins++;
                        alert("Player 2 wins!");
                    }
                    updateScore();
                    resetGame();
                    return;
                }

                
                currentPlayer = currentPlayer === "player1" ? "player2" : "player1";
                updateCurrentPlayerDisplay();
            }
        });
    }
}


function makeMove(row, col, player) {
    board[row][col] = player;
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

    if (player === "player1") {
        cell.classList.add("circle-player");
    } else if (player === "player2") {
        cell.classList.add("circle-player2");
    }
}

function checkWin(row, col, player) {
    const directions = [
        [0, 1], 
        [1, 0], 
        [1, 1], 
        [1, -1] 
    ];

    for (let [dx, dy] of directions) {
        let count = 1;
        
        count += countInDirection(row, col, dx, dy, player);
        count += countInDirection(row, col, -dx, -dy, player);

        if (count >= 5) return true;
    }

    return false;
}

function countInDirection(row, col, dx, dy, player) {
    let count = 0;
    for (let step = 1; step <= 4; step++) {
        const x = row + dx * step;
        const y = col + dy * step;
        if (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y] === player) {
            count++;
        } else {
            break;
        }
    }
    return count;
}

function updateScore() {
    player1WinsDisplay.textContent = player1Wins;
    player2WinsDisplay.textContent = player2Wins;
}

function updateCurrentPlayerDisplay() {
    currentPlayerDisplay.textContent = currentPlayer === "player1" ? "Player 1" : "Player 2";
    currentPlayerDisplay.className = currentPlayer;
}

function resetGame() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            board[i][j] = null;
        }
    }

    document.querySelectorAll(".cell").forEach(cell => {
        cell.className = "cell";
    });

    currentPlayer = "player1"; 
    updateCurrentPlayerDisplay(); 
    playButton.textContent = "Start Game";
    resetTimer();
}
