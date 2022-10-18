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

    return { setGamesWon, getGamesWon, getName, getSign };
};
const drawWinnerLine = (rowOrCol, rowColNr) => {
    var c = document.getElementById("myCanvas");

    var ctx = c.getContext("2d");
    ctx.lineWidth = 5;

    const clearCanvas = () => {
        ctx.clearRect(0, 0, 320, 320);
        return ctx;
    };

    const drawLine = (rowOrCol, rowColNr) => {
        const lineHor02 = () => {
            ctx.beginPath();
            ctx.moveTo(0, 53);
            ctx.lineTo(320, 53);
            ctx.stroke();

            return ctx;
        };
        const lineHor35 = () => {
            ctx.beginPath();
            ctx.moveTo(0, 159);
            ctx.lineTo(320, 159);
            ctx.stroke();

            return ctx;
        };
        const lineHor68 = () => {
            ctx.beginPath();
            ctx.moveTo(0, 267);
            ctx.lineTo(320, 267);
            ctx.stroke();

            return ctx;
        };
        const lineVer06 = () => {
            ctx.beginPath();
            ctx.moveTo(53, 0);
            ctx.lineTo(52, 320);
            ctx.stroke();

            return ctx;
        };
        const lineVer17 = () => {
            ctx.beginPath();
            ctx.moveTo(159, 0);
            ctx.lineTo(159, 320);
            ctx.stroke();

            return ctx;
        };
        const lineVer28 = () => {
            ctx.beginPath();
            ctx.moveTo(267, 0);
            ctx.lineTo(267, 320);
            ctx.stroke();

            return ctx;
        };
        const lineX08 = () => {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(320, 320);
            ctx.stroke();

            return ctx;
        };
        const lineX26 = () => {
            ctx.beginPath();
            ctx.moveTo(320, 0);
            ctx.lineTo(0, 320);
            ctx.stroke();

            return ctx;
        };
        if (rowOrCol == "row" && rowColNr == 0) {
            return lineHor02();
        }
        if (rowOrCol == "row" && rowColNr == 1) {
            return lineHor35();
        }
        if (rowOrCol == "row" && rowColNr == 2) {
            return lineHor68();
        }
        if (rowOrCol == "col" && rowColNr == 0) {
            return lineVer06();
        }
        if (rowOrCol == "col" && rowColNr == 1) {
            return lineVer17();
        }
        if (rowOrCol == "col" && rowColNr == 2) {
            return lineVer28();
        }
        if (rowOrCol == "X" && rowColNr == 1) {
            return lineX08();
        }
        if (rowOrCol == "X" && rowColNr == 2) {
            return lineX26();
        }
    };

    return { drawLine, clearCanvas };
};

var gameboard = (function () {
    "use strict";
    var board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
    ];
    // let board = [
    //     ["X", "X", "X"],
    //     ["X", "X", "X"],
    //     ["X", "X", "X"],
    // ];

    const table = document.getElementById("gameBoardTable");
    let lines = drawWinnerLine();
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

    let pcPlayer;

    let winnerOneOrTwo = "I";
    // let restartButton = document.getElementById("restartButton");
    let startButton = document.getElementById("startButton");
    let declareWinner = document.getElementById("declareWinner");
    declareWinner.innerHTML = " ";
    // restartButton.addEventListener('click', restartGame);
    startButton.addEventListener("click", startGame);

    checkIfWin2();

    function startGame() {
        table.style.backgroundColor = "#d8e5d8";
        lines.clearCanvas();
        if (startButton.innerHTML === "Start game") {
            let playerXname = document.getElementById("plOneName").value;
            let playerOname = document.getElementById("plTwoName").value;
            pcPlayer = playerOname;
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
    function displayAllPositions() {
        for (let row = 0; row < 3; row++) {
            if (
                board[row][0] == board[row][1] &&
                board[row][1] == board[row][2]
            ) {
                if (board[row][0] == "X") {
                    console.log("winner is X");
                } else if (board[row][0] == "O") {
                    {
                        console.log("winner is O");
                    }
                }
            }
        }
    }
    function checkIfAllPosAreUsed() {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] === " ") {
                    return false;
                } else {
                    return true;
                }
            }
        }
    }
    function checkIfWin2() {
        let winX = 0;
        let winO = 0;
        for (let row = 0; row < 3; row++) {
            if (
                board[row][0] == board[row][1] &&
                board[row][1] == board[row][2]
            ) {
                if (board[row][0] == "X") {
                    console.log("winner is X");
                    lines.drawLine("row", row);
                } else if (board[row][0] == "O") {
                    {
                        console.log("winner is O");
                        lines.drawLine("row", row);
                    }
                }
                console.log("row = ", row);
                // console.log("col = ", col);
                // lines.drawLine("row", row);
                // lines.lineHor02();
            }
        }
        for (let col = 0; col < 3; col++) {
            if (
                board[0][col] == board[1][col] &&
                board[1][col] == board[2][col]
            ) {
                if (board[0][col] == "X") {
                    console.log("winner is X");
                    lines.drawLine("col", col);
                } else if (board[0][col] == "O") {
                    {
                        console.log("winner is O");
                        lines.drawLine("col", col);
                    }
                }
                // lines.drawLine("col", col);
            }
        }
        if (board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
            if (board[0][0] == "X") {
                console.log("winner is X");
                lines.drawLine("X", 1);
            }
            if (board[0][0] == "O") {
                console.log("winner is O");
                lines.drawLine("X", 1);
            }
            // lines.drawLine("X", 1);
        }
        if (board[0][2] == board[1][1] && board[1][1] && board[2][0]) {
            if (board[0][2] == "X") {
                console.log("winner is X");
                lines.drawLine("X", 2);
            }
            if (board[0][2] == "O") {
                console.log("winner is O");
                lines.drawLine("X", 2);
            }
        }
        let allPosUsed = checkIfAllPosAreUsed();
        console.log(allPosUsed);
        if (allPosUsed === true) {
            console.log("draw");
        }
        // lines.drawLine("X", 2);
    }

    function drawXO(plX, plO) {
        for (var i = 0; i < 9; i++) {
            _boardArray[i] = 0;
            document.getElementById(i).bgColor = "#f8f8f8";
            document.getElementById(i).innerText = " ";
        }
        var checkWinner;
        winnerOneOrTwo = "unknown";
        currentPlayer = plOne;
        plOneArea.style.backgroundColor = "#717b7a";

        for (let i = 0; i < 9; i++) {
            let playerUser = 0;
            effectHoverOverCell(i); // when hovering over cell changes color
            document.getElementById(i).onmousedown = function () {
                console.log("on click");
                let selectedCell = document.getElementById(i);

                if (
                    selectedCell.textContent === " " &&
                    declareWinner.textContent === " "
                ) {
                    selectedCell.textContent = currentPlayer;
                    _boardArray[i] = currentPlayer;
                    // displayAllPositions();
                    switchPlayerColorAndCurrentPlayer(); //changes current player
                    checkIfWin(); // goes through the board and makes a check to see if there is a winner
                    checkWinner = displayWinner();
                    // console.log(displayWinner());
                    if (checkWinner === 1) {
                        plX.setGamesWon();
                    } else if (checkWinner === 2) {
                        plO.setGamesWon();
                    }
                    // console.log(plX.getName(), " score ", plX.getGamesWon());
                    // console.log(plO.getName(), " score ", plO.getGamesWon());
                } else {
                    playerUser = 1;
                    console.log("x should change to empty", playerUser);
                }
            };

            if (pcPlayer === "PC") {
                document.getElementById(i).onmouseup = function () {
                    if (playerUser != 1) {
                        console.log("mouseup player user", playerUser);
                        console.log("mouseup");
                        if (
                            checkWinner != 1 &&
                            checkWinner != 2 &&
                            checkWinner != 0
                        ) {
                            var randomNumber = randomPlayer();
                            console.log("random number first", randomNumber);
                            while (_boardArray[randomNumber] != " ") {
                                randomNumber = randomPlayer();
                                console.log(
                                    "random number second",
                                    randomNumber
                                );
                            }
                            let selectedCell =
                                document.getElementById(randomNumber);
                            selectedCell.textContent = currentPlayer;
                            _boardArray[randomNumber] = currentPlayer;
                            checkIfWin();
                            let checkWinner = displayWinner();
                            switchPlayerColorAndCurrentPlayer();
                            // console.log(displayWinner());
                            if (checkWinner === 1) {
                                plX.setGamesWon();
                            } else if (checkWinner === 2) {
                                plO.setGamesWon();
                            }
                        }
                    }
                };
            }
        }
        function randomPlayer() {
            function getRandomInt(max) {
                return Math.floor(Math.random() * max);
            }
            let rand = getRandomInt(9);
            return rand;
        }
    }
    function tableColorAfterWin() {
        table.style.backgroundColor = "#717b7a";
        table.style.borderRadius = "10px";
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

    function switchPlayerColorAndCurrentPlayer() {
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
            declareWinner.textContent = "Winner is " + plOne;
            return 1;
        } else if (winnerOneOrTwo === plTwo) {
            playerTwoScore++;
            plTwoScore.textContent = playerTwoScore;
            declareWinner.textContent = "Winner is " + plTwo;
            return 2;
        } else if (winnerOneOrTwo === draw) {
            declareWinner.textContent = "Draw";
            return 0;
        }
    }
    // function play() {
    //     let showPlayerOne = document.getElementById("plOne");
    //     let showPlayerTwo = document.getElementById("plTwo");
    //     showPlayerOne.style.backgroundColor = "lightblue";
    // }

    function getBoardPosStatus(x) {
        console.log(_boardArray[8]);
    }

    function checkAllPositions() {
        let check = 0;
        for (var i = 0; i < 9; i++) {
            if (_boardArray[i] == " ") {
                check++;
            }
        }

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
    // function checkIfWin() {
    //     // console.log('checking win pos');
    //     let checking = checkAllPositions();
    //     if (
    //         " " != _boardArray[0] &&
    //         _boardArray[0] === _boardArray[1] &&
    //         _boardArray[1] === _boardArray[2]
    //     ) {
    //         if (_boardArray[0] === plOne) {
    //             winnerOneOrTwo = plOne;
    //         } else {
    //             winnerOneOrTwo = plTwo;
    //         }
    //         lines.lineHor02();
    //         console.log("winner is " + winnerOneOrTwo);
    //     } else if (
    //         " " != _boardArray[3] &&
    //         _boardArray[3] === _boardArray[4] &&
    //         _boardArray[4] === _boardArray[5]
    //     ) {
    //         if (_boardArray[3] === plOne) {
    //             winnerOneOrTwo = plOne;
    //         } else {
    //             winnerOneOrTwo = plTwo;
    //         }
    //         lines.lineHor35();
    //         console.log("winner is " + winnerOneOrTwo);
    //     } else if (
    //         " " != _boardArray[6] &&
    //         _boardArray[6] === _boardArray[7] &&
    //         _boardArray[7] === _boardArray[8]
    //     ) {
    //         if (_boardArray[6] === plOne) {
    //             winnerOneOrTwo = plOne;
    //         } else {
    //             winnerOneOrTwo = plTwo;
    //         }
    //         lines.lineHor68();
    //         console.log("winner is " + winnerOneOrTwo);
    //     } else if (
    //         " " != _boardArray[0] &&
    //         _boardArray[0] === _boardArray[3] &&
    //         _boardArray[3] === _boardArray[6]
    //     ) {
    //         if (_boardArray[0] === plOne) {
    //             winnerOneOrTwo = plOne;
    //         } else {
    //             winnerOneOrTwo = plTwo;
    //         }
    //         lines.lineVer06();
    //         console.log("winner is " + winnerOneOrTwo);
    //     } else if (
    //         " " != _boardArray[1] &&
    //         _boardArray[1] === _boardArray[4] &&
    //         _boardArray[4] === _boardArray[7]
    //     ) {
    //         if (_boardArray[1] === plOne) {
    //             winnerOneOrTwo = plOne;
    //         } else {
    //             winnerOneOrTwo = plTwo;
    //         }
    //         lines.lineVer17();
    //         console.log("winner is " + winnerOneOrTwo);
    //     } else if (
    //         " " != _boardArray[2] &&
    //         _boardArray[2] === _boardArray[5] &&
    //         _boardArray[5] === _boardArray[8]
    //     ) {
    //         if (_boardArray[2] === plOne) {
    //             winnerOneOrTwo = plOne;
    //         } else {
    //             winnerOneOrTwo = plTwo;
    //         }
    //         lines.lineVer28();
    //         console.log("winner is " + winnerOneOrTwo);
    //     } else if (
    //         " " != _boardArray[0] &&
    //         _boardArray[0] === _boardArray[4] &&
    //         _boardArray[4] === _boardArray[8]
    //     ) {
    //         if (_boardArray[0] === plOne) {
    //             winnerOneOrTwo = plOne;
    //         } else {
    //             winnerOneOrTwo = plTwo;
    //         }
    //         lines.lineX08();
    //         console.log("winner is " + winnerOneOrTwo);
    //     } else if (
    //         " " != _boardArray[2] &&
    //         _boardArray[2] === _boardArray[4] &&
    //         _boardArray[4] === _boardArray[6]
    //     ) {
    //         if (_boardArray[2] === plOne) {
    //             winnerOneOrTwo = plOne;
    //         } else {
    //             winnerOneOrTwo = plTwo;
    //         }
    //         lines.lineX26();
    //         console.log("winner is " + winnerOneOrTwo);
    //     } else if (checking === 1) {
    //         console.log("checkAllPos");
    //         winnerOneOrTwo = draw;
    //     }
    //     // console.log(checking);
    // }
    return {
        // setBoard: setBoard,
        drawXO: drawXO,
    };
})();
