const canvas = document.getElementById("game")
const ctx = canvas.getContext('2d');
ctx.globalCompositeOperation = "source-over";

let options = {
    hrm: false,
    hsm: false,
    dw: false,
    skin: "smooth"
}


const horizontal = new Image()
const vertical = new Image()
const wa = new Image()
const wd = new Image()
const sa = new Image()
const sd = new Image()
const ta = new Image()
const td = new Image()
const tw = new Image()
const ts = new Image()
const ha = new Image()
const hd = new Image()
const hw = new Image()
const hs = new Image()

horizontal.src = `img/${options.skin}/horizontal.png`
vertical.src = `img/${options.skin}/vertical.png`
wa.src = `img/${options.skin}/wa.png`
wd.src = `img/${options.skin}/wd.png`
sa.src = `img/${options.skin}/sa.png`
sd.src = `img/${options.skin}/sd.png`
ta.src = `img/${options.skin}/ta.png`
td.src = `img/${options.skin}/td.png`
tw.src = `img/${options.skin}/tw.png`
ts.src = `img/${options.skin}/ts.png`
ha.src = `img/${options.skin}/ha.png`
hd.src = `img/${options.skin}/hd.png`
hw.src = `img/${options.skin}/hw.png`
hs.src = `img/${options.skin}/hs.png`

const rodent = new Image()
rodent.src = "img/rodent.png"

document.onkeyup = function movement(key) {
    if (game.game_started == true) {
        switch (key.keyCode) {
            case 87:
                if (game.snake[0].move != "down" && (!game.changed || options.hrm)) {
                    game.snake[0].move = "up";
                    game.changed = true
                }
                break;
            case 83:
                if (game.snake[0].move != "up" && (!game.changed || options.hrm)) {
                    game.snake[0].move = "down";
                    game.changed = true
                }

                break;
            case 68:
                if (game.snake[0].move != "left" && (!game.changed || options.hrm)) {
                    game.snake[0].move = "right";
                    game.changed = true
                }

                break;
            case 65:
                if (game.snake[0].move != "right" && (!game.changed || options.hrm)) {
                    game.snake[0].move = "left";
                    game.changed = true
                }
                break;
        }
    } else {
        if (key.key == "w" || key.key == "s" || key.key == "d" || key.key == "a") {
            game.start()
        }
    }
}

document.getElementById("hrm").addEventListener("click", function () {
    options.hrm = !options.hrm
    this.innerText = `High Response Mode: ${options.hrm}`
})

document.getElementById("hsm").addEventListener("click", function () {
    options.hsm = !options.hsm
    this.innerText = `High Speed Mode: ${options.hsm}`
})

document.getElementById("dw").addEventListener("click", function () {
    options.dw = !options.dw
    this.innerText = `Deadly walls: ${options.dw}`
})

document.getElementById("skin").addEventListener("click", function () {
    if (options.skin == "smooth") {
        options.skin = "tiled"
    } else if (options.skin == "tiled") {
        options.skin = "smooth"
    }
    this.innerText = `Skin: ${options.skin}`
    skin()
})

function skin() {
    horizontal.src = `img/${options.skin}/horizontal.png`
    vertical.src = `img/${options.skin}/vertical.png`
    wa.src = `img/${options.skin}/wa.png`
    wd.src = `img/${options.skin}/wd.png`
    sa.src = `img/${options.skin}/sa.png`
    sd.src = `img/${options.skin}/sd.png`
    ta.src = `img/${options.skin}/ta.png`
    td.src = `img/${options.skin}/td.png`
    tw.src = `img/${options.skin}/tw.png`
    ts.src = `img/${options.skin}/ts.png`
    ha.src = `img/${options.skin}/ha.png`
    hd.src = `img/${options.skin}/hd.png`
    hw.src = `img/${options.skin}/hw.png`
    hs.src = `img/${options.skin}/hs.png`
}