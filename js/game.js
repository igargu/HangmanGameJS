var nsGame = nsGame || {};
nsGame = {
    Game:class {
        /**
         * Constructor de la clase
         */
        constructor() {
            this.attemps = 8;
            this.wordsList = new Array("PAN", "CASA", "GATO", "PERRO", "TORRES");
            this.word = null;
            this.keyboard = new nsKeyboard.Keyboard();
            this.btRestart = document.getElementById("btRestart");
        }
        /**
         * Método que inicia el juego
         */
        startGame() {
            this.word = this.generateWord();
            this.drawHints(this.word);
            //this.keyboard.generateKeyboard();
            //this.gameLogic();
            //this.reloadGame();
        }
        /**
         * Método que genera la palabra parar adivinar
         */
        generateWord() {
            let wordPosition = Math.floor(Math.random() * 4);
            return this.wordsList.at(wordPosition);
        }
        /**
         * Método que dibuja los hints de la palabra
         */
        drawHints(word) {
            let hints = "";
            for (let i = 0; i < word.length; i++) {
                hints += "_ ";
            }
            let div = document.createElement("div");
            document.body.appendChild(div);
            let p = document.createElement("p");
            p.setAttribute("id", "hints");
            p.appendChild(document.createTextNode(hints));
            div.appendChild(p);
        }
        /**
         * Método que establece la lógica del juego
         */
        gameLogic() {
            document.getElementById("button").onclick = function() {
                let hints = document.getElementById("hints").innerHTML;
                let attemps = document.getElementById("attemps").innerHTML;
                let wordGuessed = false;
                while(this.attemps > 0 || wordGuessed) {
                    let letter = document.getElementById("input").value;
                    for (let i = 0; i < this.word.length; i++) {
                        if(letter == this.word.charAt(i)) {
                            hints.replace(hints.charAt(i*2), letter);
                            if (hints.trim == this.word) {
                                wordGuessed = true;
                            }
                        } else if(i == this.word.length-1) {
                            this.attemps--;
                            attemps = attemps + this.attemps;
                        }
                    }
                    letter = "";
                }
            }
            this.gameFinish(this.wordGuessed);
        }
        /**
         * Método que finaliza la partida y muestra el mensaje de resultado
         */
        gameFinish(resultado) {
            let message = resultado ? "HAS GANADO" : "HAS PERDIDO";
            console.log(message);
            btRestart.hidden = false;
        }
        /**
         * Método que reinicia la partida
         */
        reloadGame() {
            this.btRestart.onclick = function() {
                // Reiniciar partida
            }
        }
    }
}