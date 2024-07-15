const gameBoard = (function(){
    let board = [1,2,3,4,5,6,7,8,9];
    let player1 = [];
    let player2 = [];

    function display() {
        console.log("------");
        console.log(board[0], board[1], board[2]);
        console.log(board[3], board[4], board[5]);
        console.log(board[6], board[7], board[8]);
    }

    return {board, display, player1, player2};
})();
 
const players = (function playerInfo() {
    const playerOne = prompt("Player 1, What is your name?");
    const playerTwo = prompt("Player 2, What is your name?");
    const oneOrTwo = Math.floor(Math.random() * 2) + 1;
    const playerOneMark = oneOrTwo === 1 ? "O" : "X";
    const playerTwoMark = playerOneMark === "X" ? "O" : "X";

    function createPlayer (playerName, playerMark) {
        const player = playerName;
        const mark = playerMark;
        return {player , mark};
    };

    const player1 = createPlayer(playerOne, playerOneMark);
    const player2 = createPlayer(playerTwo, playerTwoMark);  

    return {player1, player2};
})();

const turn = (function() {
    let playerChoice;
    let currentTurn = 1;
    const {checkWinner, continueGame} = gameCondition();

    function playersTurn() {
        if (currentTurn % 2 == 1) {
            currentTurn += 1;
            playerChoice = +prompt("Player 1, Where do you want to play 1-9");
            gameBoard.player1.push(playerChoice);
            gameBoard.board[playerChoice - 1] = players.player1.mark;
            checkWinner();
        } else if (currentTurn % 2 == 0) {
            currentTurn += 1;
            let playerChoice = +prompt("Player 2, Where do you want to play 1-9");
            gameBoard.player2.push(playerChoice);
            gameBoard.board[playerChoice - 1] = players.player2.mark;
            checkWinner();
        }
        continueGame();
    }
    return {playersTurn}; 
})();

function gameCondition() {
    const winningCondition = {
        1: [1,2,3],
        2: [4,5,6],
        3: [7,8,9],
        4: [1,4,7],
        5: [2,5,8],
        6: [3,6,9],
        7: [1,5,9],
        8: [3,5,7],
    };
    let gameOver = false; 

    function checkWinner(){
        for (let i = 1; i < 9; i++) {
            const checkPlayerOne = winningCondition[i].every((element) => gameBoard.player1.includes(element));
            const checkPlayerTwo = winningCondition[i].every((element) => gameBoard.player2.includes(element));
            if (checkPlayerOne) {
                console.log("Player one is the Winner!");
                gameOver = true;
                gameBoard.display();
            } else if (checkPlayerTwo) {
                console.log("Player Two is the Winner!");
                gameOver = true;
                gameBoard.display();
            } 
        }

        if (gameBoard.player1.length + gameBoard.player2.length == 9 && gameOver == false) {
            console.log("It's a tie no one won!");
                gameOver = true;
                gameBoard.display();
        }
    }

    function continueGame() {
        if (!gameOver) {
            gameController();
        } 
    }

    return {checkWinner, continueGame}
};

function gameController() {
    gameBoard.display();
    turn.playersTurn();
}

gameController();
