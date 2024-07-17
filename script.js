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
    // const {player1Score, player2Score} = game();
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
    function createElements(playerName, playerMark, elementID, playerNum) {
            const cardElement = document.querySelector(elementID);
            const divContainer = document.createElement("div");
            const playerNameElement = document.createElement("p");
            const playerMarkElement = document.createElement("p");
            const playerScoreElement = document.createElement("p");

            playerNameElement.textContent = playerName;
            playerMarkElement.textContent = playerMark;
            playerScoreElement.textContent = "Score: 0"
            cardElement.classList.add("player-card");
            playerScoreElement.id = ("player-score" + playerNum);
            divContainer.id = "div-container";
            divContainer.appendChild(playerNameElement);
            divContainer.appendChild(playerMarkElement);
            divContainer.appendChild(playerScoreElement);
            cardElement.appendChild(divContainer);
            return {divContainer}
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
    let player1Score = 0
    let player2Score = 0
    let gameOver = false;
    let currentTurn = 1;
    let playerChoice;
    const {continueButton} = events
    const {board, display, player1Board, player2Board, resetBoard} = gameBoard;
    const {getPlayerInfo} = player();
    playersInfo = getPlayerInfo();
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
                announceResult(`Game Over! ${playersInfo.player1.player} is the winner!`);
                console.log(`Game Over! ${playersInfo.player1.player} is the winner!`);
                gameOver = true;
                player1Score += 1;
                updatePlayerScore("#player-score1", "#player-score2");
            } else if (winningCondition[i].every((element) => player2Board.includes(element))) {
                announceResult(`Game Over! ${playersInfo.player2.player} is the winner!`);
                console.log(`Game Over! ${playersInfo.player2.player} is the winner!`);
                gameOver = true;
                player2Score += 1;
                updatePlayerScore("#player-score1", "#player-score2");
            } 
        }

        if (player1Board.length + player2Board.length === 9 && gameOver === false) {
            announceResult("It's a tie no one won!")
            console.log("It's a tie no one won!");
                gameOver = true;
        }

        if (gameOver === true) {
            gameOver = false;
            currentTurn = 1;
            continueButton();
          } 
    }

    function updatePlayerScore(elementID1, elementID2) {
        const player1ScoreElement = document.querySelector(elementID1)
        const player2ScoreElement = document.querySelector(elementID2)
        player1ScoreElement.textContent = `Score: ${player1Score}`;
        player2ScoreElement.textContent = `Score: ${player2Score}`;
    }

    function announceResult(text) {
        const announcementElement = document.querySelector(".game-announcement");
        announcementElement.textContent = text
    }
    return {playTurn, player1Score, player2Score};
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
        createElements(playersInfo.player1.player, playersInfo.player1.mark, "#player1", 1);
        createElements(playersInfo.player2.player, playersInfo.player2.mark, "#player2", 2);
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

    function continueButton() {
        const dialog = document.querySelector(".continue");
        dialog.showModal();
        const continueBtn = document.querySelector("#continue");
        continueBtn.addEventListener ("click",()=> {
            dialog.close();
            gameBoard.resetBoard();
          });
    }
  return {addEventListenerForBoard, continueButton};
 })();
