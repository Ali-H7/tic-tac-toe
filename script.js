const gameBoard = (function (){
    let board = [1,2,3,4,5,6,7,8,9];
    let player1Board = [];
    let player2Board = [];

    function display() {
        console.log("------");
        console.log(board[0], board[1], board[2]);
        console.log(board[3], board[4], board[5]);
        console.log(board[6], board[7], board[8]);
    }

    function resetBoard() {
      board.length = 0;
      board.push(1,2,3,4,5,6,7,8,9);
      player1Board.length = 0;
      player2Board.length = 0;

      const squares = document.querySelectorAll(".square");
      squares.forEach (square => {
        square.textContent = "";
      })
    }

    return {board, display, player1Board, player2Board, resetBoard};
})();

function player() {

    function getPlayerInfo(){
        let player1Name = document.querySelector("#player1-name").value;
        let player2Name = document.querySelector("#player2-name").value;
        randomizeChoice = Math.floor(Math.random() * 2) + 1; // 1 or 2
        let player1Mark = "X";
        let player2Mark = "O";

        function createPlayer (playerName, playerMark) {
            const player = playerName;
            const mark = playerMark;
            return {player, mark};
        };

        const player1 = createPlayer(player1Name, player1Mark);
        const player2 = createPlayer(player2Name, player2Mark);  
        return {player1, player2};
    };
    
    // HTML elements to display player Information
    function createElements(playerName, playerMark, elementID) {
            const cardElement = document.querySelector(elementID);
            const divContainer = document.createElement("div");
            const playerNameElement = document.createElement("p");
            const playerMarkElement = document.createElement("p");

            playerNameElement.textContent = playerName;
            playerMarkElement.textContent = playerMark;
            cardElement.classList.add("player-card");
            divContainer.appendChild(playerNameElement);
            divContainer.appendChild(playerMarkElement);
            cardElement.appendChild(divContainer);
    }

    return {getPlayerInfo, createElements}; 
}

function game() {
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
    let currentTurn = 1;
    let playerChoice;
    const {board, display, player1Board, player2Board, resetBoard} = gameBoard;
    const {getPlayerInfo} = player();
    playersInfo = getPlayerInfo();
    const {addEventListenerForBoard} = events;
    function playTurn(playedLocation) {
        if (currentTurn == 1) {
            currentTurn -= 1;
            playerChoice = +playedLocation.id;
            player1Board.push(playerChoice);
            board[playerChoice - 1] = playersInfo.player1.mark;
            playedLocation.textContent = playersInfo.player1.mark;
            checkGameState();
            display();
        } else if (currentTurn == 0) {
            currentTurn += 1;
            playerChoice = +playedLocation.id;
            player2Board.push(playerChoice);
            board[playerChoice - 1] = playersInfo.player2.mark;
            playedLocation.textContent = playersInfo.player2.mark;
            checkGameState();
            display();
        }
    }

    function checkGameState() {
        for (let i = 1; i < 9; i++) {
            if (winningCondition[i].every((element) => player1Board.includes(element))) {
                console.log("Player one is the Winner!");
                gameOver = true;
            } else if (winningCondition[i].every((element) => player2Board.includes(element))) {
                console.log("Player Two is the Winner!");
                gameOver = true;
            } 
        }

        if (player1Board.length + player2Board.length === 9 && gameOver === false) {
            console.log("It's a tie no one won!");
                gameOver = true;
        }

        if (gameOver === true) {
            // TODO: RESET WHEN THE GAME IS OVER!
            const dialog = document.querySelector(".continue");
            dialog.showModal();
            gameOver = false;
            currentTurn = 1;
            const continueBtn = document.querySelector("#continue");
            continueBtn.addEventListener ("click",()=> {
                dialog.close();
                resetBoard();
          });
          } 
    }
    return {playTurn};
}

const events = (function events () {
    const dialog = document.querySelector("dialog");

    window.addEventListener("load", () => {
    dialog.showModal();
  });

    const startBtn = document.querySelector("#start-button");
    startBtn.addEventListener ("click", () => {
        const {getPlayerInfo, createElements} = player();

        playersInfo = getPlayerInfo();
        createElements(playersInfo.player1.player, playersInfo.player1.mark, "#player1");
        createElements(playersInfo.player2.player, playersInfo.player2.mark, "#player2");
        addEventListenerForBoard();
        game();
        dialog.close();
 });

    function addEventListenerForBoard() {
        const squares = document.querySelectorAll(".square");
        const {playTurn} = game();

        squares.forEach(square => {
        square.addEventListener ("click", function squareClick() {
            if (square.textContent === "X" || square.textContent === "O") return; 
            playTurn(square);
        });
        });
  };
  return {addEventListenerForBoard};
 })();
