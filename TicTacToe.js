const Player = (name, sign) => {
    // let health = level * 2;
    // const getLevel = () => level;

    const getName = () => name;
    const getSign = () => sign;
    // let playedPositions = [];
    let gamesWon = 0;

    const getGamesWon = () => {
        return gamesWon;
    };
    const setGamesWon = () => {
        gamesWon++;
    };
    // const playedPosition = x =>{
    //     playedPosition[x] = 1;
    // }

    return { setGamesWon, getGamesWon, getName, getSign };
};

//   const playerX = Player('X');
//   const playerO = Player('O');

//   console.log(playerX.getName());
//   console.log(playerX.getGamesWon());
//   playerX.setGamesWon();
//   console.log(playerX.getGamesWon());

var gameboard = (function () {
    "use strict";
    const table = document.getElementById("gameBoardTable");

    var _boardArray = [];

    let playerOneScore = 0;
    let playerTwoScore = 0;

    let plOneScore = document.getElementById("plOneScore");
    let plTwoScore = document.getElementById("plTwoScore");

    plOneScore.textContent = playerOneScore;
    plTwoScore.textContent = playerTwoScore;

    let plOneArea = document.getElementById("plOne");
    let plTwoArea = document.getElementById("plTwo");

    const plOne = "X";
    const plTwo = "O";
    const draw = "D";

    let currentPlayer;
    let playerX = Player();
    let playerO = Player();

    let winnerOneOrTwo = "I";
    // let restartButton = document.getElementById("restartButton");
    let startButton = document.getElementById("startButton");
    let declareWinner = document.getElementById("declareWinner");
    declareWinner.innerHTML = " ";
    // restartButton.addEventListener('click', restartGame);
    startButton.addEventListener("click", startGame);

    function startGame() {
        console.log("start or restart game");
        if (startButton.innerHTML === "Start game") {
            let playerXname = document.getElementById("plOneName").value;
            let playerOname = document.getElementById("plTwoName").value;
            // console.log(playerXname);

            playerX = Player(playerXname, "X");
            playerO = Player(playerOname, "O");

            drawXO(playerX, playerO);
            startButton.innerHTML = "Restart game";
            return playerX;
        } else {
            plTwoArea.style.backgroundColor = "#d8e5d8";
            console.log("restart game");
            declareWinner.innerHTML = " ";
            drawXO(playerX, playerO);
        }
    }

    // function restartGame(){
    //     console.log('restart game');
    //     declareWinner.innerHTML = ' ';
    //     drawXO();
    //     // setBoard();
    // }

    // function setBoard(){

    //     for (var i=0; i<9; i++){
    //         _boardArray[i] = 0;
    //         document.getElementById(i).bgColor = '#f8f8f8';
    //         document.getElementById(i).innerText = ' ';

    //     }
    //     winnerOneOrTwo = 'unknown';
    //     drawXO();
    // }

    function drawXO(plX, plO) {
        for (var i = 0; i < 9; i++) {
            _boardArray[i] = 0;
            document.getElementById(i).bgColor = "#f8f8f8";
            document.getElementById(i).innerText = " ";
        }

        // console.log(plX.getName());
        // console.log(plX.getGamesWon());
        // // playerX.setGamesWon();
        // console.log(plX.getSign());
        winnerOneOrTwo = "unknown";

        currentPlayer = plOne;
        plOneArea.style.backgroundColor = "#717b7a";

        for (let i = 0; i < 9; i++) {
            effectHoverOverCell(i); // when hovering over cell changes color

            document.getElementById(i).onclick = function () {
                let selectedCell = document.getElementById(i);

                if (
                    selectedCell.textContent === " " &&
                    declareWinner.textContent === " "
                ) {
                    selectedCell.textContent = currentPlayer;
                    _boardArray[i] = currentPlayer;
                    switchPlayerColor(); //changes current player
                    checkIfWin(); // goes through the board and makes a check to see if there is a winner
                    let checkWinner = displayWinner();
                    // console.log(displayWinner());
                    if (checkWinner === 1) {
                        plX.setGamesWon();
                    } else if (checkWinner === 2) {
                        plO.setGamesWon();
                    }
                    console.log(plX.getName(), " score ", plX.getGamesWon());
                    console.log(plO.getName(), " score ", plO.getGamesWon());
                } else {
                    console.log("x should change to empty");
                }
            };
        }
    }
    function effectHoverOverCell(i) {
        document.getElementById(i).addEventListener("mouseover", function () {
            this.style.backgroundColor = "#717b7a";
            this.style.transitionDelay = "0.05s";
        });
        document.getElementById(i).addEventListener("mouseleave", function () {
            this.style.backgroundColor = "#f8f8f8";
            this.style.transitionDelay = "0.05s";
        });
    }

    function switchPlayerColor() {
        if (currentPlayer === plOne) {
            plOneArea.style.backgroundColor = "#d8e5d8";
            plTwoArea.style.backgroundColor = "#717b7a";
            currentPlayer = plTwo;
        } else {
            plTwoArea.style.backgroundColor = "#d8e5d8";
            plOneArea.style.backgroundColor = "#717b7a";
            currentPlayer = plOne;
        }
    }

    function displayWinner() {
        if (winnerOneOrTwo === plOne) {
            playerOneScore++;
            plOneScore.textContent = playerOneScore;
            // alert('would you like to play again');
            declareWinner.textContent = "Winner is " + plOne;
            return 1;
            // setBoard();
        } else if (winnerOneOrTwo === plTwo) {
            playerTwoScore++;
            plTwoScore.textContent = playerTwoScore;
            declareWinner.textContent = "Winner is " + plTwo;
            // alert('would you like to play again');
            // setBoard();
            return 2;
        } else if (winnerOneOrTwo === draw) {
            declareWinner.textContent = "Draw";
            // alert('DRAW, would you like to play again');
            // setBoard();
            return 0;
        }
    }
    function play() {
        let showPlayerOne = document.getElementById("plOne");
        let showPlayerTwo = document.getElementById("plTwo");
        showPlayerOne.style.backgroundColor = "lightblue";
    }

    function getBoardPosStatus(x) {
        console.log(_boardArray[8]);
    }
    function displayAllPositions() {
        for (var i = 0; i < 9; i++) {
            console.log(i, "===", _boardArray[i]);
        }
    }
    function checkAllPositions() {
        let check = 0;
        // console.log('checkPos');
        for (var i = 0; i < 9; i++) {
            // console.log(i,'===',_boardArray[i]);
            if (_boardArray[i] == " ") {
                check++;
            }
        }
        // console.log(check);
        if (check === 0) {
            return 1;
        } else {
            return 0;
        }
    }
    let checking = checkAllPositions();

    function playerOneMove(x) {
        _boardArray[x] = "X";
    }
    function playerTwoMove(x) {
        _boardArray[x] = "O";
    }
    function checkIfPosIsUsed(x) {
        if (_boardArray[x] != 0) {
            console.log("position already played, choose again");
        }
    }
    function checkIfWin() {
        // console.log('checking win pos');
        let checking = checkAllPositions();
        if (
            " " != _boardArray[0] &&
            _boardArray[0] === _boardArray[1] &&
            _boardArray[1] === _boardArray[2]
        ) {
            if (_boardArray[0] === plOne) {
                winnerOneOrTwo = plOne;
            } else {
                winnerOneOrTwo = plTwo;
            }
            console.log("winner is " + winnerOneOrTwo);
        } else if (
            " " != _boardArray[3] &&
            _boardArray[3] === _boardArray[4] &&
            _boardArray[4] === _boardArray[5]
        ) {
            if (_boardArray[3] === plOne) {
                winnerOneOrTwo = plOne;
            } else {
                winnerOneOrTwo = plTwo;
            }
            console.log("winner is " + winnerOneOrTwo);
        } else if (
            " " != _boardArray[6] &&
            _boardArray[6] === _boardArray[7] &&
            _boardArray[7] === _boardArray[8]
        ) {
            if (_boardArray[6] === plOne) {
                winnerOneOrTwo = plOne;
            } else {
                winnerOneOrTwo = plTwo;
            }
            console.log("winner is " + winnerOneOrTwo);
        } else if (
            " " != _boardArray[0] &&
            _boardArray[0] === _boardArray[3] &&
            _boardArray[3] === _boardArray[6]
        ) {
            if (_boardArray[0] === plOne) {
                winnerOneOrTwo = plOne;
            } else {
                winnerOneOrTwo = plTwo;
            }
            console.log("winner is " + winnerOneOrTwo);
        } else if (
            " " != _boardArray[1] &&
            _boardArray[1] === _boardArray[4] &&
            _boardArray[4] === _boardArray[7]
        ) {
            if (_boardArray[1] === plOne) {
                winnerOneOrTwo = plOne;
            } else {
                winnerOneOrTwo = plTwo;
            }
            console.log("winner is " + winnerOneOrTwo);
        } else if (
            " " != _boardArray[2] &&
            _boardArray[2] === _boardArray[5] &&
            _boardArray[5] === _boardArray[8]
        ) {
            if (_boardArray[2] === plOne) {
                winnerOneOrTwo = plOne;
            } else {
                winnerOneOrTwo = plTwo;
            }
            console.log("winner is " + winnerOneOrTwo);
        } else if (
            " " != _boardArray[0] &&
            _boardArray[0] === _boardArray[4] &&
            _boardArray[4] === _boardArray[8]
        ) {
            if (_boardArray[0] === plOne) {
                winnerOneOrTwo = plOne;
            } else {
                winnerOneOrTwo = plTwo;
            }
            console.log("winner is " + winnerOneOrTwo);
        } else if (
            " " != _boardArray[2] &&
            _boardArray[2] === _boardArray[4] &&
            _boardArray[4] === _boardArray[6]
        ) {
            if (_boardArray[2] === plOne) {
                winnerOneOrTwo = plOne;
            } else {
                winnerOneOrTwo = plTwo;
            }
            console.log("winner is " + winnerOneOrTwo);
        } else if (checking === 1) {
            console.log("checkAllPos");
            winnerOneOrTwo = draw;
        }
        // console.log(checking);
    }
    return {
        // setBoard: setBoard,
        drawXO: drawXO,
    };
})();
//   gameboard.setBoard();

// const Player = (name) => {
//         // let health = level * 2;
//         // const getLevel = () => level;

//         const getName  = () => name;

//         // let playedPositions = [];
//         const gamesWon = 0;
//         const addGamesWon = () => {
//             gamesWon ++;
//         }
//         // const playedPosition = x =>{
//         //     playedPosition[x] = 1;
//         // }

//         return {attack, damage, getLevel, getName};
//       };

//   const Player = (name) => {
//     // let health = level * 2;
//     // const getLevel = () => level;
//     const getName  = () => name;
//     let playedPositions = [];

//     const die = () => {
//       // uh oh
//     };
//     const damage = x => {
//       health -= x;
//       if (health <= 0) {
//         die();
//       }
//     };
//     const attack = enemy => {
//       if (level < enemy.getLevel()) {
//         damage(1);
//         console.log(`${enemy.getName()} has damaged ${name}`);
//       }
//       if (level >= enemy.getLevel()) {
//         enemy.damage(1);
//         console.log(`${name} has damaged ${enemy.getName()}`);
//       }
//     };
//     return {attack, damage, getLevel, getName};
//   };
