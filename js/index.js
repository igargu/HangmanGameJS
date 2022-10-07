game = new nsGame.Game;
game.startGame();

document.getElementById('button').onclick = function() {
    game.checkLetter();
}
document.getElementById('btRestart').onclick = function() {
    game.restartGame();
}