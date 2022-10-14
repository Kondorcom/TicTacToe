
var gameboard = (function() {
    'use strict';
    const table = document.getElementById("gameBoardTable");
    var _boardArray = [];

    let playerOneScore = 0;
    let playerTwoScore = 0;

    let plOneScore = document.getElementById('plOneScore');
    let plTwoScore = document.getElementById('plTwoScore');

    plOneScore.textContent = playerOneScore;
    plTwoScore.textContent = playerTwoScore;

    let plOneArea = document.getElementById('plOne');
    let plTwoArea = document.getElementById('plTwo');

    const plOne = 'X';
    const plTwo = 'O';
    const draw = 'D';

    let currentPlayer;

    let winnerOneOrTwo = 'I';

    function drawXO(){  

        currentPlayer = plOne;
        plOneArea.style.backgroundColor = 'lightblue';

        for (let i=0; i<9; i++){
           
              document.getElementById(i).onclick = function(){
                let selectedCell = document.getElementById(i);
                // console.log(selectedCell.textContent);
                if (selectedCell.textContent === ' '){    
                    selectedCell.textContent = currentPlayer;
                    _boardArray[i] = currentPlayer;
                    // console.log('should write x');
                } else {
                    // selectedCell.textContent = ' ';
                    alert('already played');
                    console.log('x should change to empty');
                }   
                if (currentPlayer === plOne){
                    plOneArea.style.backgroundColor = 'white';
                    plTwoArea.style.backgroundColor = 'lightblue';
                    currentPlayer = plTwo;
                }   else {
                    plTwoArea.style.backgroundColor = 'white';
                    plOneArea.style.backgroundColor = 'lightblue';
                    currentPlayer = plOne;
                }
                // console.log('position on board', i); 

                checkIfWin();
                if (winnerOneOrTwo === plOne){
                    playerOneScore ++;
                    plOneScore.textContent = playerOneScore;
                    alert('would you like to play again');
                    setBoard();
                }   else if (winnerOneOrTwo === plTwo){
                    playerTwoScore ++;
                    plTwoScore.textContent = playerTwoScore;
                    alert('would you like to play again');
                    setBoard();
                }   else if(winnerOneOrTwo === draw){
                    alert('DRAW, would you like to play again');
                    setBoard();
                }

                // if (winnerOneOrTwo === plOne || winnerOneOrTwo === plTwo ){
                    
                //     alert('would you like to play again');
                //     setBoard();
                // }   else if (winnerOneOrTwo === draw) {
                //     alert('DRAW, would you like to play again');
                //     setBoard();
                // }
                
             };
        }
     
    }  
   
    
    function play(){
        let showPlayerOne = document.getElementById('plOne');
        let showPlayerTwo = document.getElementById('plTwo');

        showPlayerOne.style.backgroundColor = 'lightblue';


    }

    function setBoard(){
        for (var i=0; i<9; i++){
            _boardArray[i] = 0;
            document.getElementById(i).bgColor = '#2E8B57';
            document.getElementById(i).innerText = ' ';

        }      
        winnerOneOrTwo = 'unknown';  
        drawXO();
       
    }
    function getBoardPosStatus(x){
        console.log(_boardArray[8]);
    }
    function displayAllPositions(){
        for (var i=0;i< 9;i++){
            console.log(i,'===',_boardArray[i]);
            
        }
    }
    function checkAllPositions(){
        let check = 0;
        // console.log('checkPos');
        for (var i=0;i< 9;i++){

            // console.log(i,'===',_boardArray[i]);
            if (_boardArray[i] == ' '){
                
                check ++;
            }  
        }
        // console.log(check);
        if (check === 0){
            return 1;
        } else {
            return 0;
        }

    }
    let checking = checkAllPositions();

   function playerOneMove(x){
        _boardArray[x] = 'X';
   }
   function playerTwoMove(x){
        _boardArray[x] = 'O';
    }
    function checkIfPosIsUsed(x){
        if(_boardArray[x] != 0){
            console.log('position already played, choose again');
        }
    }
   function checkIfWin(){
    // console.log('checking win pos');
        let checking = checkAllPositions();
        if (' ' != _boardArray[0] && _boardArray[0]===_boardArray[1] && _boardArray[1] ===_boardArray[2]){
            if (_boardArray[0] === plOne){
                winnerOneOrTwo = plOne;
            }   else {winnerOneOrTwo = plTwo}
            console.log('winner is ' + winnerOneOrTwo);
        }   else if (' ' != _boardArray[3] && _boardArray[3]===_boardArray[4] && _boardArray[4] ===_boardArray[5]){
            if (_boardArray[3] === plOne){
                winnerOneOrTwo = plOne;
            }   else {winnerOneOrTwo = plTwo}
            console.log('winner is ' + winnerOneOrTwo);
        }   else if (' ' != _boardArray[6] && _boardArray[6]===_boardArray[7] && _boardArray[7] ===_boardArray[8]){
            if (_boardArray[6] === plOne){
                winnerOneOrTwo = plOne;
            }   else {winnerOneOrTwo = plTwo}
            console.log('winner is ' + winnerOneOrTwo);
        }   else if (' ' != _boardArray[0] && _boardArray[0]===_boardArray[3] && _boardArray[3] ===_boardArray[6]){
            if (_boardArray[0] === plOne){
                winnerOneOrTwo = plOne;
            }   else {winnerOneOrTwo = plTwo}
            console.log('winner is ' + winnerOneOrTwo);
        }   else if (' ' != _boardArray[1] && _boardArray[1]===_boardArray[4] && _boardArray[4] ===_boardArray[7]){
            if (_boardArray[1] === plOne){
                winnerOneOrTwo = plOne;
            }   else {winnerOneOrTwo = plTwo}
            console.log('winner is ' + winnerOneOrTwo);
        }   else if (' ' != _boardArray[2] && _boardArray[2]===_boardArray[5] && _boardArray[5] ===_boardArray[8]){
            if (_boardArray[2] === plOne){
                winnerOneOrTwo = plOne;
            }   else {winnerOneOrTwo = plTwo}
            console.log('winner is ' + winnerOneOrTwo);
        }   else if (' ' != _boardArray[0] && _boardArray[0]===_boardArray[4] && _boardArray[4] ===_boardArray[8]){
            if (_boardArray[0] === plOne){
                winnerOneOrTwo = plOne;
            }   else {winnerOneOrTwo = plTwo}
            console.log('winner is ' + winnerOneOrTwo);
        }   else if (' ' != _boardArray[2] && _boardArray[2]===_boardArray[4] && _boardArray[4] ===_boardArray[6]){
            if (_boardArray[2] === plOne){
                winnerOneOrTwo = plOne;
            }   else {winnerOneOrTwo = plTwo}
            console.log('winner is ' + winnerOneOrTwo);
        }  else if(checking === 1){
            console.log('checkAllPos');
             winnerOneOrTwo = draw;

        }
        
        // console.log(checking);
        
    }
  
    return {
      
        setBoard: setBoard,
        
    };
  })();
  gameboard.setBoard();
//   gameboard.drawXO();
 
 
const Player = (name) => {
        // let health = level * 2;
        // const getLevel = () => level;
        const getName  = () => name;
        let playedPositions = [];
        const gamesWon = 0;

        const playedPosition = x =>{
            playedPosition[x] = 1;
        }

        
        return {attack, damage, getLevel, getName};
      };




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
