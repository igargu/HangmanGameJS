var nsKeyboard = nsKeyboard || {};
nsKeyboard = {
    Keyboard:class {        
        generateKeyboard() {
            let table = document.createElement("table");
            table.setAttribute("id", "keyboard");
            const letters = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
                             'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ',
                             ' ', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ' ', ' '];
            for(let i = 0; i < 3; i++) {
                let tr = document.createElement("tr");
                for (let j = 0; j < 10; j++) {
                    let th = document.createElement("th");
                    if (i == 2 && (j == 0 || j == 8 || j == 9)) {
                        th.setAttribute("id", "key-disabled");
                    } else {
                        th.setAttribute("class", "key");
                    }
                    tr.appendChild(th);
                    tr.cells[j].appendChild(document.createTextNode(letters[j+(i*10)]));
                    table.appendChild(tr);
                }
            }
            document.body.appendChild(table);
        }
    }
};