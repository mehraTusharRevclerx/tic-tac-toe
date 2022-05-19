$(() => {
  const gamegrid = $("#layout");
  const userForm = $("#userForm");
  const startGameBtn = $("#startGameBtn");
  const submitBtn = $("#submitBtn");
  const statusDisplay = $("#statusDisplay");
  const statusPlayer = $("#statusPlayer");
  const resetBtn = $("#resetBtn");
  const box = $(".box");
  const player1 = $("#player1Name");
  const player2 = $("#player2Name");
  const result = $("#result");
  let currentPlayer;
  const winningMessage = () => `${currentPlayer} has won!`;
  const drawMessage = () => `Game ended in a draw!`;
  const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
  result.hide();
  let gameActive = true;
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
  main();
  function main() {
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
        statusPlayer.text(currentPlayerTurn);
      }
    });

    let playerTurn = "X";
    let player1Score = [];
    let player2Score = [];

    mainLogic();
    function mainLogic() {
      box.one("click", function () {
        if (gameActive) {
          statusPlayer.show();
          statusPlayer.empty();
          playerTurn === "X"
            ? player1Score.push(Number($(this).attr("value")))
            : player2Score.push(Number($(this).attr("value")));

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
              result.show();

              result.append(`<li>${currentPlayer} is the Winner 😍</li>`);
            }
            if (
              (v.length === player2Score.length &&
                v.every((value, index) => value === player2Score[index])) ||
              v.reverse().every((value, index) => value === player2Score[index])
            ) {
              statusDisplay.text(winningMessage);
              gameActive = false;
              statusPlayer.hide();
              result.show();

              result.append(`<li>${currentPlayer} is the Winner 😍</li>`);

              resetBtn.show();
              // statusPlayer.text(currentPlayerTurn);
            }
          });

          if (player2Score.length + player1Score.length === 9) {
            gameActive = false;
            result.show();
            result.append(`<li>Game is Draw 😢</li>`);

            statusDisplay.text(drawMessage);
            statusPlayer.hide();
            resetBtn.show();
          }
          playerTurn = playerTurn === "X" ? "O" : "X";
          currentPlayer =
            currentPlayer === player1.val() ? player2.val() : player1.val();
          statusPlayer.text(currentPlayerTurn);
        }
      });
    }

    resetBtn.on("click", function () {
      $("span").text("");
      statusDisplay.text("");
      gameActive = true;
      player1Score = [];
      player2Score = [];
      resetBtn.hide();

      main();
      userForm.show();
      player1.val("");
      player2.val("");
      result.hide();
    });
  }
});
