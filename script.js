const gameBoard = (function (){
    let board = [1,2,3,4,5,6,7,8,9];
    let player1Board = [];
    let player2Board = [];
    let playerScores = [0,0];

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

    return {board, display, player1Board, player2Board, resetBoard, playerScores};
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
    let gameOver = false;
    let currentTurn = 1;
    let playerChoice;
    const {continueButton} = events;
    const {board, display, player1Board, player2Board,} = gameBoard;
    let {playerScores} = gameBoard;
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
                updatePlayerScore("#player-score1", "#player-score2", "player1win");
            } else if (winningCondition[i].every((element) => player2Board.includes(element))) {
                announceResult(`Game Over! ${playersInfo.player2.player} is the winner!`);
                console.log(`Game Over! ${playersInfo.player2.player} is the winner!`);
                gameOver = true;
                updatePlayerScore("#player-score1", "#player-score2", "player2win");
            } 
        }

        if (player1Board.length + player2Board.length === 9 && gameOver === false) {
            announceResult("It's a tie no one won!");
            console.log("It's a tie no one won!");
                gameOver = true;
        }

        if (gameOver === true) {
            gameOver = false;
            currentTurn = 1;
            continueButton();
          } 
    }

    function updatePlayerScore(elementID1, elementID2, winner) {
        let player1Score;
        let player2Score;

        if (winner == "player1win") {
            player1Score = playerScores[0];
            player1Score += 1; 
            playerScores[0] = player1Score;
            player1Score = 0; 
        } else if (winner == "player2win") {
            player2Score = playerScores[1];
            player2Score += 1; 
            playerScores[1] = player2Score;
            player2Score = 0; 
        }
        
        (function () {
            const player1ScoreElement = document.querySelector(elementID1);
            const player2ScoreElement = document.querySelector(elementID2);
            player1ScoreElement.textContent = `Score: ${playerScores[0]}`;
            player2ScoreElement.textContent = `Score: ${playerScores[1]}`;
        })();
    }

    function resetScore() {
        playerScores.length = 0;
        playerScores.push(0, 0);
    }

    function announceResult(text) {
        const announcementElement = document.querySelector(".game-announcement");
        announcementElement.textContent = text;
    }
    return {playTurn, updatePlayerScore, resetScore, currentTurn};
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
        //FIX addStylingToGrid();
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

    (function restartButton() {
        const restartBtn = document.querySelector("#restart");
        restartBtn.addEventListener("click", () => {
        const dialog = document.querySelector("dialog");
        const player1Element = document.querySelector("#player1");
        const player2Element = document.querySelector("#player2");
        const {resetScore} = game();
        gameBoard.resetBoard();
        resetScore();
        player1Element.innerHTML = "";
        player2Element.innerHTML = "";
        dialog.showModal();
        })
    
    })();

    //FIX function addStylingToGrid() {
    //     const {currentTurn} = game();
    //     const squares = document.querySelectorAll(".square");
    //     squares.forEach(square => {
    //         square.addEventListener ("mouseenter", ()=> {
    //             if (currentTurn == 1) {
    //                 square.textContent = "X"
    //             } else if (currentTurn == 2) {
    //                 square.textContent = "O"
    //             }
    //         })
    //         square.addEventListener ("mouseleave", ()=> {
    //             square.textContent = "";
    //         })
    //         });
    // }

  return {addEventListenerForBoard, continueButton};
 })();
