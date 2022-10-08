var nsKeyboard = nsKeyboard || {};
nsKeyboard = {
    Keyboard:class {        
        generateKeyboard() {
            let div = document.createElement("div");
            div.setAttribute("id", "keyboard");
            document.body.appendChild(div);
            for(let i = 65; i <= 90; i++) {
                this.createKey(String.fromCharCode(i));
            }
        }
        createKey(letter) {
            let div = document.createElement("div");
            div.setAttribute("id", "key");
            document.getElementById("keyboard").appendChild(div);
            let p = document.createElement("p");
            p.appendChild(document.createTextNode(letter));
            div.appendChild(p);
        }
    }
};