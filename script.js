const gameBoard = (function(){
    board = [0,0,0,0,0,0,0,0,0];

    function display() {
        console.log(board[0], board[1], board[2]);
        console.log(board[3], board[4], board[5]);
        console.log(board[6], board[7], board[8]);
    }

    return {board, display};
})();

function createPlayer (playerName, playerMark) {
    const player = playerName
    const mark = playerMark
    return {player , mark}
};
 
const players = function playerInfo() {
    const playerOne = prompt("Player 1, What is your name?");
    const playerTwo = prompt("Player 2, What is your name?");
    const playerOneMark = prompt("Player 1, What is your choice X or O?").toUpperCase();
    const playerTwoMark = playerOneMark === "X" ? "O" : "X";

    const player1 = createPlayer(playerOne, playerOneMark);
    const player2 = createPlayer(playerTwo, playerTwoMark);  

    return {player1, player2}
};


 