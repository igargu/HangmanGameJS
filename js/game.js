var nsGame = nsGame || {};
nsGame = {
    Game:class {
        /**
         * Constructor de la clase
         */
        constructor() {
            this.wordsList = new Array("PAN", "CASA", "GATO", "PERRO", "TORRES");
            this.keyboard = new nsKeyboard.Keyboard();
            this.word = null;
            this.attemps = 8;
        }
        /**
         * Método que inicia el juego
         */
        startGame() {
            this.word = this.generateWord();
            this.drawHints(this.word);
            this.keyboard.generateKeyboard();
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
         * Método que comprueba la letra introducida
         */
        checkLetter() {
            let letterGuessed = false;
            let hints = document.getElementById("hints").innerHTML;
            let letter = document.getElementById("key").value.toUpperCase();
            let lettersUsed = "";
            lettersUsed = lettersUsed + " " + letter
            console.log("Letras usadas: " + lettersUsed);
            for (let i = 0; i < this.word.length; i++) {
                if(letter == this.word.charAt(i)) {
                    hints = hints.substring(0, i*2) + letter + hints.substring(i*2 + letter.length);
                    letterGuessed = true;                    
                    if (hints.search("_") < 0) {
                        this.gameFinish(true);
                    }
                } else if(i == this.word.length-1 && letterGuessed == false) {
                    this.attemps--;
                    document.getElementById("attemps").innerHTML = "Intentos: " + this.attemps;
                    if (this.attemps == 0) {
                        this.gameFinish(false);
                    }
                }
            }
            letterGuessed = false;            
            document.getElementById("hints").innerHTML = hints;
            document.getElementById("input").value = "";
        }
        /**
         * Método que finaliza la partida y muestra el mensaje de resultado
         */
        gameFinish(resultado) {
            let message = resultado ? "HAS GANADO" : "HAS PERDIDO";
            console.log(message);
            document.getElementById("button").disabled = true;
            document.getElementById("btRestart").hidden = false;
        }
        /**
         * Método que reinicia la partida
         */
        restartGame() {
            location.reload();
        }
    }
}