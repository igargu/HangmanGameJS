var nsKeyboard = nsKeyboard || {};
nsKeyboard = {
    Keyboard:class {        
        generateKeyboard() {
            for(let i = 65; i <= 90; i++) {
                this.createKey(String.fromCharCode(i));
            }
        }
        createKey(letter) {
            let div = document.createElement("div");
            document.body.appendChild(div);
            let p = document.createElement("p");
            p.appendChild(document.createTextNode(letter));
            div.appendChild(p);
        }
    }
};