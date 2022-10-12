var nsGame = nsGame || {};
nsGame = {
    Game:class {
        
        constructor() {
            this.wordsList = new Array("PAN", "SOL", "CASA", "GATO", "HUMO", "MAGIA", "PERRO", "TORRES");
            this.keyboard = new nsKeyboard.Keyboard();
            this.word = null;
            this.attemps = 8;
        }
        
        startGame() {
            this.word = this.generateWord();
            this.drawHints(this.word);
            this.keyboard.generateKeyboard();
        }
        
        generateWord() {
            let wordPosition = Math.floor(Math.random() * this.wordsList.length);
            return this.wordsList.at(wordPosition);
        }
        
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
        
        restartGame() {
            document.getElementById("attemps").appendChild(document.createElement("br"));
            let button = document.createElement("button");
            document.getElementById("attemps").appendChild(button);
            button.appendChild(document.createTextNode("REINICIAR"));
            button.onclick = function() {
                location.reload();
            }
        }

        showImages(attemps) {
            let src = "";
            switch(attemps) {
                case -1: 
                    src = "img/win.png";
                    break;
                case 7: 
                    src = "img/attemp-7.png";
                    break;
                case 6: 
                    src = "img/attemp-6.png";
                    break;
                case 5: 
                    src = "img/attemp-5.png";
                    break;
                case 4: 
                    src = "img/attemp-4.png";
                    break;
                case 3: 
                    src = "img/attemp-3.png";
                    break;
                case 2: 
                    src = "img/attemp-2.png";
                    break;
                case 1: 
                    src = "img/attemp-1.png";
                    break;
                case 0: 
                    src = "img/defeat.png";
                    break;
            }
            document.getElementById("image").setAttribute("src", src);
        }
    }
}