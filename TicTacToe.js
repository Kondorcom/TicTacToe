
var gameboard = (function() {
    'use strict';
    const table = document.getElementById("gameBoardTable");
    var td1 = document.getElementById('1');
    // td1.onclick = function(){
        
    //     td1.innerHTML = "X";
    // };
    // var cells = document.querySelectorAll(1, '2','3','4','5','6','7','8','0');
    // function drawXO(){
    //     cells.onclick = function(){
    //         console.log('drawXO');
    //         cells.innerHTML = 'x';
    //     };
    // }
    
    function drawXO(){
        for (let i=0; i<9; i++){
           
              document.getElementById(i).onclick = function(){
                let selectedCell = document.getElementById(i);
                console.log(selectedCell.textContent);
                if (selectedCell.textContent === ' '){    
                    selectedCell.textContent = 'X';
                    console.log('should write x');
                } else {
                    selectedCell.textContent = ' ';
                    console.log('x should change to empty');
                }
                
                // console.log(currentCell);
                console.log('cell pos',i);
                // td1.textContent = "X";
                // let txt = document.createTextNode('xx');
                // td1.appendChild(txt);
                // currentCell.appendChild(txt);
             };
        }
        
    }

    // td1.innerHTML = "X";

    var _boardArray = [];

    function setBoard(){
        for (var i=0; i<9; i++){
            _boardArray[i] = 0;
            document.getElementById(i).bgColor = '#2E8B57';
            document.getElementById(i).innerText = ' ';

        }
    
        
        // document.getElementById('0').bgColor = '#00FF00';
      
  

        // td1.textContent= "X";
        
        
    }
    function getBoardPosStatus(x){
        console.log(_boardArray[8]);
    }
    function displayAllPositions(){
        for (var i=0;i< 9;i++){
            console.log(_boardArray[i]);
        }
    }
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
  
    return {
        playerOneMove:playerOneMove,
        playerOneMove:playerTwoMove,
      setBoard: setBoard,
      getBoardPosStatus: getBoardPosStatus,
      displayAllPositions: displayAllPositions,
      drawXO:drawXO
    };
  })();
  gameboard.setBoard();
  gameboard.drawXO();
 
  gameboard.displayAllPositions();
  gameboard.getBoardPosStatus(3);


//   myModule.publicMethod(); // outputs 'Hello World'
//   console.log(myModule.publicProperty); // outputs 'I am a public property'
//   console.log(myModule._privateProperty); // is undefined protected by the module closure
//   myModule._privateMethod(); // is TypeError protected by the module closure

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
