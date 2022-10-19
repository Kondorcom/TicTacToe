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
const drawWinnerLine = () => {
    var c = document.getElementById("myCanvas");

    var ctx = c.getContext("2d");
    ctx.lineWidth = 5;
    // ctx = c.getContext("2d");
    // ctx.beginPath();
    // ctx.moveTo(0, 0);
    // ctx.lineTo(300, 150);
    // ctx.stroke();
    // return ctx;
    const clearCanvas = () => {
        ctx.clearRect(0, 0, 320, 320);
        return ctx;
    };
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

    return {
        lineHor02,
        lineHor35,
        lineHor68,
        lineVer06,
        lineVer17,
        lineVer28,
        lineX08,
        lineX26,
        clearCanvas,
    };
};

var gameboard = (function () {
    "use strict";
    // let board = [
    //     [" ", " ", " "],
    //     [" ", " ", " "],
    //     [" ", " ", " "],
    // ];
    // let board = [
    //     ["X", "O", "X"],
    //     ["O", "O", "X"],
    //     [" ", " ", " "],
    // ];
    const table = document.getElementById("gameBoardTable");
    let lines = drawWinnerLine();
    var _boardArray = [];
    // var _boardArray = ["X", "O", "X", "O", "O", "X", " ", " ", " "];

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
                // console.log("on click");
                let selectedCell = document.getElementById(i);

                if (
                    selectedCell.textContent === " " &&
                    declareWinner.textContent === " "
                ) {
                    selectedCell.textContent = currentPlayer;
                    _boardArray[i] = currentPlayer;
                    //
                    switchPlayerColorAndCurrentPlayer(); //changes current player
                    checkIfWin(); // goes through the board and makes a check to see if there is a winner
                    checkWinner = displayWinner();
                    // console.log(displayWinner());
                    if (checkWinner === 1) {
                        plX.setGamesWon();
                    } else if (checkWinner === 2) {
                        plO.setGamesWon();
                    }
                } else {
                    playerUser = 1;
                    // console.log("x should change to empty", playerUser);
                }
            };

            if (
                pcPlayer === "PCmaster" ||
                pcPlayer === "PCnovice" ||
                pcPlayer === "PChard"
            ) {
                document.getElementById(i).onmouseup = function () {
                    if (playerUser != 1) {
                        if (
                            checkWinner != 1 &&
                            checkWinner != 2 &&
                            checkWinner != 0
                        ) {
                            if (pcPlayer === "PCmaster") {
                                let bestMoveO = findBestMoveO();
                                let selectedCell =
                                    document.getElementById(bestMoveO);
                                selectedCell.textContent = currentPlayer;
                                _boardArray[bestMoveO] = currentPlayer;
                            } else if (pcPlayer === "PCnovice") {
                                let noviceMoveO = findNoviceMoveO();
                                let selectedCell =
                                    document.getElementById(noviceMoveO);
                                selectedCell.textContent = currentPlayer;
                                _boardArray[noviceMoveO] = currentPlayer;
                            } else if (pcPlayer === "PChard") {
                                let hardMoveO = findHardMoveO();
                                let selectedCell =
                                    document.getElementById(hardMoveO);
                                selectedCell.textContent = currentPlayer;
                                _boardArray[hardMoveO] = currentPlayer;
                            }

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
        for (var i = 0; i < 9; i++) {
            if (_boardArray[i] == " ") {
                check++;
            }
        }

        if (check != 0) {
            return true;
        }
        return false;
    }
    let checking = checkAllPositions();

    function minimax(depth, isMax) {
        let score = checkIfWinScore();
        if (score == 10) return score;
        if (score == -10) return score;
        if (checkAllPositions() == false) return 0;
        if (isMax) {
            let best = -1000;

            for (let i = 0; i < 9; i++) {
                if (_boardArray[i] == " ") {
                    _boardArray[i] = plOne;
                    best = Math.max(best, minimax(depth + 1, !isMax));
                    _boardArray[i] = " ";
                }
            }
            return best;
        } else {
            let best = 1000;
            for (let i = 0; i < 9; i++) {
                if (_boardArray[i] == " ") {
                    _boardArray[i] = plTwo;
                    best = Math.min(best, minimax(depth + 1, !isMax));

                    _boardArray[i] = " ";
                }
            }
            return best;
        }
    }

    // function findBestMove() {
    //     let bestVal = -1000;
    //     let bestMovePlOne = -1;
    //     for (let i = 0; i < 9; i++) {
    //         if (_boardArray[i] == " ") {
    //             _boardArray[i] = plOne;
    //             let moveVal = minimax(0, false);
    //             _boardArray[i] = " ";
    //             if (moveVal > bestVal) {
    //                 bestMovePlOne = i;
    //                 bestVal = moveVal;
    //             }
    //         }
    //     }

    //     return bestMovePlOne;
    // }
    function findNoviceMoveO() {
        let randomNumber = randomPlayer();
        // console.log("random number first", randomNumber);
        const value = Math.floor(Math.random() * (100 + 1));
        if (value <= 65) {
            let bestMoveO = findBestMoveO();
            // console.log("best move");
            console.log("value", value);
            return bestMoveO;
        }

        while (_boardArray[randomNumber] != " ") {
            randomNumber = randomPlayer();
        }
        function randomPlayer() {
            function getRandomInt(max) {
                return Math.floor(Math.random() * max);
            }
            let rand = getRandomInt(9);
            return rand;
        }
        return randomNumber;
    }
    function findHardMoveO() {
        let randomNumber = randomPlayer();
        // console.log("random number first", randomNumber);
        const value = Math.floor(Math.random() * (100 + 1));
        if (value <= 85) {
            let bestMoveO = findBestMoveO();
            // console.log("value", value);
            console.log("best move", value);
            return bestMoveO;
        }
        while (_boardArray[randomNumber] != " ") {
            randomNumber = randomPlayer();
        }

        function randomPlayer() {
            function getRandomInt(max) {
                return Math.floor(Math.random() * max);
            }
            let rand = getRandomInt(9);
            return rand;
        }
        return randomNumber;
    }
    function findBestMoveO() {
        let bestVal = 1000;
        let bestMoveO = 1;
        for (let i = 0; i < 9; i++) {
            if (_boardArray[i] == " ") {
                _boardArray[i] = plTwo;
                let moveVal = minimax(0, true);
                _boardArray[i] = " ";
                if (moveVal < bestVal) {
                    bestMoveO = i;
                    bestVal = moveVal;
                }
            }
        }

        return bestMoveO;
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
                lines.lineHor02();
                return +10;
            } else {
                winnerOneOrTwo = plTwo;
                lines.lineHor02();
                return -10;
            }
            // lines.lineHor02();
            // console.log("winner is " + winnerOneOrTwo);
        } else if (
            " " != _boardArray[3] &&
            _boardArray[3] === _boardArray[4] &&
            _boardArray[4] === _boardArray[5]
        ) {
            if (_boardArray[3] === plOne) {
                winnerOneOrTwo = plOne;
                lines.lineHor35();
                console.log("winner is " + winnerOneOrTwo);
                return +10;
            } else {
                winnerOneOrTwo = plTwo;
                lines.lineHor35();
                console.log("winner is " + winnerOneOrTwo);
                return -10;
            }
            lines.lineHor35();
            console.log("winner is " + winnerOneOrTwo);
        } else if (
            " " != _boardArray[6] &&
            _boardArray[6] === _boardArray[7] &&
            _boardArray[7] === _boardArray[8]
        ) {
            if (_boardArray[6] === plOne) {
                winnerOneOrTwo = plOne;
                lines.lineHor68();
                return +10;
            } else {
                winnerOneOrTwo = plTwo;
                lines.lineHor68();
                return -10;
            }
            lines.lineHor68();
            console.log("winner is " + winnerOneOrTwo);
        } else if (
            " " != _boardArray[0] &&
            _boardArray[0] === _boardArray[3] &&
            _boardArray[3] === _boardArray[6]
        ) {
            if (_boardArray[0] === plOne) {
                winnerOneOrTwo = plOne;
                lines.lineVer06();
                return +10;
            } else {
                winnerOneOrTwo = plTwo;
                lines.lineVer06();
                return -10;
            }
            lines.lineVer06();
            console.log("winner is " + winnerOneOrTwo);
        } else if (
            " " != _boardArray[1] &&
            _boardArray[1] === _boardArray[4] &&
            _boardArray[4] === _boardArray[7]
        ) {
            if (_boardArray[1] === plOne) {
                winnerOneOrTwo = plOne;
                lines.lineVer17();
                return +10;
            } else {
                winnerOneOrTwo = plTwo;
                lines.lineVer17();
                // console.log("winner 0");
                return -10;
            }
            lines.lineVer17();
            console.log("winner is " + winnerOneOrTwo);
        } else if (
            " " != _boardArray[2] &&
            _boardArray[2] === _boardArray[5] &&
            _boardArray[5] === _boardArray[8]
        ) {
            if (_boardArray[2] === plOne) {
                winnerOneOrTwo = plOne;
                lines.lineVer28();
                return +10;
            } else {
                winnerOneOrTwo = plTwo;
                lines.lineVer28();
                return -10;
            }
            lines.lineVer28();
            console.log("winner is " + winnerOneOrTwo);
        } else if (
            " " != _boardArray[0] &&
            _boardArray[0] === _boardArray[4] &&
            _boardArray[4] === _boardArray[8]
        ) {
            if (_boardArray[0] === plOne) {
                winnerOneOrTwo = plOne;
                lines.lineX08();
                return +10;
            } else {
                winnerOneOrTwo = plTwo;
                lines.lineX08();
                return -10;
            }
            lines.lineX08();
            console.log("winner is " + winnerOneOrTwo);
        } else if (
            " " != _boardArray[2] &&
            _boardArray[2] === _boardArray[4] &&
            _boardArray[4] === _boardArray[6]
        ) {
            if (_boardArray[2] === plOne) {
                winnerOneOrTwo = plOne;
                lines.lineX26();
                return +10;
            } else {
                winnerOneOrTwo = plTwo;
                lines.lineX26();
                return -10;
            }
            lines.lineX26();
            console.log("winner is " + winnerOneOrTwo);
        } else if (checking === false) {
            console.log("checkAllPos");
            winnerOneOrTwo = draw;
            return 0;
        }
        // console.log(checking);
    }
    function checkIfWinScore() {
        let checking = checkAllPositions();
        if (
            " " != _boardArray[0] &&
            _boardArray[0] === _boardArray[1] &&
            _boardArray[1] === _boardArray[2]
        ) {
            if (_boardArray[0] === plOne) {
                return +10;
            } else {
                return -10;
            }
        } else if (
            " " != _boardArray[3] &&
            _boardArray[3] === _boardArray[4] &&
            _boardArray[4] === _boardArray[5]
        ) {
            if (_boardArray[3] === plOne) {
            } else {
                return -10;
            }
        } else if (
            " " != _boardArray[6] &&
            _boardArray[6] === _boardArray[7] &&
            _boardArray[7] === _boardArray[8]
        ) {
            if (_boardArray[6] === plOne) {
                return +10;
            } else {
                return -10;
            }
        } else if (
            " " != _boardArray[0] &&
            _boardArray[0] === _boardArray[3] &&
            _boardArray[3] === _boardArray[6]
        ) {
            if (_boardArray[0] === plOne) {
                return +10;
            } else {
                return -10;
            }
        } else if (
            " " != _boardArray[1] &&
            _boardArray[1] === _boardArray[4] &&
            _boardArray[4] === _boardArray[7]
        ) {
            if (_boardArray[1] === plOne) {
                return +10;
            } else {
                return -10;
            }
        } else if (
            " " != _boardArray[2] &&
            _boardArray[2] === _boardArray[5] &&
            _boardArray[5] === _boardArray[8]
        ) {
            if (_boardArray[2] === plOne) {
                return +10;
            } else {
                return -10;
            }
        } else if (
            " " != _boardArray[0] &&
            _boardArray[0] === _boardArray[4] &&
            _boardArray[4] === _boardArray[8]
        ) {
            if (_boardArray[0] === plOne) {
                return +10;
            } else {
                return -10;
            }
        } else if (
            " " != _boardArray[2] &&
            _boardArray[2] === _boardArray[4] &&
            _boardArray[4] === _boardArray[6]
        ) {
            if (_boardArray[2] === plOne) {
                return +10;
            } else {
                return -10;
            }
        } else if (checking === false) {
            return 0;
        }
        // console.log(checking);
    }
    return {
        // setBoard: setBoard,
        drawXO: drawXO,
    };
})();
