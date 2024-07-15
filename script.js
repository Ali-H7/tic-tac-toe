const gameBoard = (function(){
    board = [0,0,0,0,0,0,0,0,0];

    function display() {
        console.log(board[0], board[1], board[2]);
        console.log(board[3], board[4], board[5]);
        console.log(board[6], board[7], board[8]);
    }

    return {board, display};
})();

function createPlayers() {
    let playerOne; 
    let playerTwo; 
    let playerOneMark; 
    let playerTwoMark; 

    function getPlayersInfo () {
        playerOne = prompt("Player 1, What is your name?");
        playerTwo = prompt("Player 2, What is your name?");
        playerOneMark = prompt("Player 1, What is your choice X or O?");
        playerTwoMark = prompt("Player 2, What is your choice X or O?");

    }

    return {playerOne};
}

const players = createPlayers();