game = new nsGame.Game;
game.startGame();

var keyboard = document.getElementsByClassName('key');
for (let i = 0; i < keyboard.length; i++) {
    keyboard[i].onclick = function() {
        game.checkLetter(keyboard[i].innerHTML, i);
    }
}