$(() => {
  const gamegrid = $("#layout");
  const userForm = $("#userForm");
  const startGameBtn = $("#startGameBtn");
  const submitBtn = $("#submitBtn");
  const statusDisplay = $("#statusDisplay");
  const statusPlayer = $("#statusPlayer");
  const resetBtn = $("#resetBtn");
  let currentPlayer;
  const box = $(".box");
  const player1 = $("#player1Name");
  const player2 = $("#player2Name");
  const winningMessage = () => `${currentPlayer} has won!`;
  const drawMessage = () => `Game ended in a draw!`;
  const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
  let gameState = ["", "", "", "", "", "", "", "", ""];
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    [4, 6, 2],
    [4, 2, 6],
  ];

  gamegrid.hide();
  statusPlayer.hide();
  userForm.hide();
  resetBtn.hide();

  startGameBtn.click(function () {
    userForm.show();
    startGameBtn.hide();
  });

  submitBtn.click(function (e) {
    e.preventDefault();
    if (
      player1.val() !== "" &&
      player1.val() !== null &&
      player2.val() !== "" &&
      player2.val() !== null
    ) {
      currentPlayer = player1.val();
      userForm.hide();
      gamegrid.show();
      statusPlayer.show();
    }
  });

  let playerTurn = "X";
  let player1Score = [];
  let gameActive = true;
  let player2Score = [];

  box.one("click", function () {
    if (gameActive) {
      statusPlayer.show();
      statusPlayer.empty();
      playerTurn === "X"
        ? player1Score.push(Number($(this).attr("value")))
        : player2Score.push(Number($(this).attr("value")));

      playerTurn = playerTurn === "X" ? "O" : "X";
      currentPlayer =
        currentPlayer === player1.val() ? player2.val() : player1.val();
      $(this).children("span").first().text(playerTurn);

      winningConditions.forEach((v, i) => {
        //   console.log(v);
        if (
          (v.length === player1Score.length &&
            v.every((value, index) => value === player1Score[index])) ||
          v.reverse().every((value, index) => value === player1Score[index])
        ) {
          statusDisplay.text(winningMessage);
          gameActive = false;
          statusPlayer.hide();
          resetBtn.show();
        }
        if (
          (v.length === player2Score.length &&
            v.every((value, index) => value === player2Score[index])) ||
          v.reverse().every((value, index) => value === player2Score[index])
        ) {
          statusDisplay.text(winningMessage);
          gameActive = false;
          statusPlayer.hide();
          resetBtn.show();
          // statusPlayer.text(currentPlayerTurn);
        }
      });

      if (player2Score.length + player1Score.length === 9) {
        statusDisplay.text(drawMessage);
        statusPlayer.hide();
        resetBtn.show();
      }
    }
  });

  resetBtn.click(function () {
    box.text("");
  });
});
