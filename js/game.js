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
            let wordPosition = Math.floor(Math.random() * 5);
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
            let p = document.createElement("h1");
            p.setAttribute("id", "hints");
            p.appendChild(document.createTextNode(hints));
            div.appendChild(p);
        }
        /**
         * Método que comprueba la letra introducida
         */
        checkLetter(letter, numKey) {
            let letterGuessed = false;
            let hints = document.getElementById("hints").innerHTML;
            for (let i = 0; i < this.word.length; i++) {
                if(letter == this.word.charAt(i)) {
                    hints = hints.substring(0, i*2) + letter + hints.substring(i*2 + letter.length);
                    document.getElementById("hints").innerHTML = hints;
                    letterGuessed = true;                    
                    if (hints.search("_") < 0) {
                        this.showImages(-1);
                        this.gameFinish(true);
                    }
                } else if(i == this.word.length-1 && letterGuessed == false) {
                    this.attemps--;
                    document.getElementById("attemps").innerHTML = "Intentos: " + this.attemps;
                    this.showImages(this.attemps);
                    if (this.attemps == 0) {
                        document.getElementById("hints").innerHTML = this.word;
                        this.gameFinish(false);
                    }
                }
            }
            letterGuessed = false;                        
            let keyboard = document.getElementsByClassName('key');
            keyboard[numKey].onclick = null;
            keyboard[numKey].setAttribute("id", "key-disabled");
        }
        /**
         * Método que finaliza la partida y muestra el mensaje de resultado
         */
        gameFinish(resultado) {
            let message = document.getElementById("message");
            if (resultado) {
                message.innerHTML = "HAS GANADO";
                message.setAttribute("id", "win-message");
            } else {
                message.innerHTML = "HAS PERDIDO";
                message.setAttribute("id", "defeat-message");
            }
            this.restartGame();
            var keyboard = document.getElementsByClassName('key');
            for (let i = 0; i < keyboard.length; i++) {
                keyboard[i].onclick = null;
            }  
        }
        /**
         * Método que reinicia la partida
         */
        restartGame() {
            let button = document.createElement("button");
            document.getElementById("attemps").appendChild(button);
            button.appendChild(document.createTextNode("REINICIAR"));
            button.onclick = function() {
                location.reload();
            }
        }

        /**
         * Método que muestra las imágenes del juego
         */
        showImages(attemps) {
            let src = "";
            switch(attemps) {
                case -1: 
                    src = "win.jpg";
                    break;
                case 7: 
                    src = "attemp-7.jpg";
                    break;
                case 6: 
                    src = "attemp-6.jpg";
                    break;
                case 5: 
                    src = "attemp-5.jpg";
                    break;
                case 4: 
                    src = "attemp-4.jpg";
                    break;
                case 3: 
                    src = "attemp-3.jpg";
                    break;
                case 2: 
                    src = "attemp-2.jpg";
                    break;
                case 1: 
                    src = "attemp-1.jpg";
                    break;
                case 0: 
                    src = "defeat.jpg";
                    break;
            }
            document.getElementById("image").setAttribute("src", src);
        }
    }
}