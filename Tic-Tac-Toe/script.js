
const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("resetButton");
const currentPlayerDisplay = document.getElementById("currentPlayer");
const scoreDisplay = document.getElementById("score");
const statusDisplay = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

// Combinações que representam uma vitória
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Atualiza o jogador exibido
function updateCurrentPlayer() {
    currentPlayerDisplay.textContent =
        `Current Player: ${currentPlayer}`;
}

// Atualiza o placar
function updateScore() {
    scoreDisplay.textContent =
        `Score - X: ${scoreX} | O: ${scoreO}`;
}

// Alterna entre X e O
function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateCurrentPlayer();
}

// Trata o clique em uma célula
function handleCellClick(event) {
    const cell = event.currentTarget;

    // Impede jogadas em células ocupadas ou após o fim do jogo
    if (cell.textContent !== "" || !gameActive) {
        return;
    }

    // Insere o símbolo e sua classe CSS
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    checkWin();

    // Só troca de jogador se a partida continuar
    if (gameActive) {
        switchPlayer();
    }
}

// Verifica vitória ou empate

function checkWin() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        const symbol = cells[a].textContent;

        if (
            symbol !== "" &&
            symbol === cells[b].textContent &&
            symbol === cells[c].textContent
        ) {
            gameActive = false;
            statusDisplay.textContent = `Player ${symbol} wins!`;

            if (symbol === "X") {
                scoreX++;
            } else {
                scoreO++;
            }

            updateScore();
            return;
        }
    }

    // Só verifica o empate se ninguém venceu
    const isDraw = [...cells].every(
        cell => cell.textContent !== ""
    );

    if (isDraw) {
        gameActive = false;
        statusDisplay.textContent = "It's a draw!";
    }
}


// Reinicia a partida sem zerar o placar
function resetGame() {
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o");
    });

    currentPlayer = "X";
    gameActive = true;

    updateCurrentPlayer();
    updateScore();

    // Limpa apenas a mensagem de vitória ou empate
    statusDisplay.textContent = "";
}

// Registra os cliques nas células
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

// Registra o clique no botão de reiniciar
resetButton.addEventListener("click", resetGame);

// Inicializa as informações na tela
updateCurrentPlayer();
updateScore();
