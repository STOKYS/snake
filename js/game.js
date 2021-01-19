class Game {
    constructor() {
        this.game_started = false;
        this.snake = [new Head(Math.floor((Math.random() * ((canvas.width - 25) - 0) + 0) / 25) * 25, Math.floor((Math.random() * ((canvas.height - 25) - 0) + 0) / 25) * 25, 25, 25)]
        this.food = new Food(Math.floor((Math.random() * ((canvas.width - 25) - 0) + 0) / 25) * 25, Math.floor((Math.random() * ((canvas.height - 25) - 0) + 0) / 25) * 25, 25, 25)
        this.score = 0;
        this.changed = false;
        ctx.font = "40px Verdana";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(`Move to start (WASD)`, canvas.width / 2, canvas.height / 2);
    }
    start() {
        this.game_started = true;
        update()
    }
    update() {
        this.score = this.snake.length
        this.changed = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (let i = (this.snake.length - 1); i > 0; i--) {
            this.snake[i].update(i)
        }
        for (let i = (this.snake.length - 1); i > 0; i--) {
            this.snake[i].draw(i)
        }
        this.snake[0].update()
        this.food.draw()
        this.gui()
    }
    gui() {
        ctx.font = "15px Verdana";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(`Score: ${this.score}`, 40, 20);
    }
    over() {
        game.game_started = false
        ctx.font = "80px Verdana";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(`Game Over!`, canvas.width / 2, (canvas.height / 2) - 100);
        clensing()
    }
}

class Head {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = this.width
        this.move = 'up'
    }
    update() {
        if (this.move != '') {
            if (this.move == "up") {
                this.y -= this.speed
            } else if (this.move == "down") {
                this.y += this.speed
            } else if (this.move == "right") {
                this.x += this.speed
            } else if (this.move == "left") {
                this.x -= this.speed
            }
        }
        this.walls()
        this.colision()
        this.draw()
    }
    draw() {
        let image = this.image()
        ctx.drawImage(image, this.x, this.y, this.width, this.height)
    }
    image() {
        if (this.move == "up") {
            return hw
        } else if (this.move == "down") {
            return hs
        } else if (this.move == "left") {
            return ha
        } else if (this.move == "right") {
            return hd
        }
    }
    colision() {
        // Kolize se samo sebou
        game.snake.forEach(function (obj, index) {
            if (obj.x == game.snake[0].x && obj.y == game.snake[0].y && index != 0) {
                game.over()
            }
        })
        this.eat()
    }
    walls() {
        // Teleportace
        if (options.dw) {
            if (this.x < 0 || this.x >= canvas.width || this.y < 0 || this.y >= canvas.height) game.over()
        } else {
            if (this.x < 0) {
                this.x = canvas.width - 25
            } else if (this.x >= canvas.width) {
                this.x = 0
            } else if (this.y < 0) {
                this.y = canvas.height - 25
            } else if (this.y >= canvas.height) {
                this.y = 0
            }
        }
    }
    eat() {
        if (this.x == game.food.x && this.y == game.food.y) {
            game.food.create()
            game.snake.push(new Body(game.snake[game.snake.length - 1].x, game.snake[game.snake.length - 1].y, game.snake[game.snake.length - 1].width, game.snake[game.snake.length - 1].height))
        }
    }
}

class Body {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
    update(index) {
        this.x = game.snake[index - 1].x
        this.y = game.snake[index - 1].y
    }
    draw(index) {
        let image = this.image(index)
        ctx.drawImage(image, this.x, this.y, this.width, this.height)
    }
    image(index) {
        // Nemá žádnou reálnou funkci, pouze zjišťuje vhodý obrázek
        if (index == (game.snake.length - 1)) {
            if (game.snake.length == 2) {
                if (game.snake[0].move == "up") {
                    return tw
                } else if (game.snake[0].move == "down") {
                    return ts
                } else if (game.snake[0].move == "left") {
                    return ta
                } else if (game.snake[0].move == "right") {
                    return td
                }
            } else {
                if (game.snake[index - 1].x == this.x && game.snake[index - 1].y > this.y) {
                    return ts
                } else if (game.snake[index - 1].x == this.x && game.snake[index - 1].y < this.y) {
                    return tw
                } else if (game.snake[index - 1].x > this.x && game.snake[index - 1].y == this.y) {
                    return td
                } else if (game.snake[index - 1].x < this.x && game.snake[index - 1].y == this.y) {
                    return ta
                }
            }
        } else if (index == 1) {
            if (game.snake[0].move == "up") {
                if (game.snake[2].x > this.x) {
                    return wd
                } else if (game.snake[2].x < this.x) {
                    return wa
                } else if (game.snake[2].x == this.x) {
                    return vertical
                }
            } else if (game.snake[0].move == "down") {
                if (game.snake[2].x > this.x) {
                    return sd
                } else if (game.snake[2].x < this.x) {
                    return sa
                } else if (game.snake[2].x == this.x) {
                    return vertical
                }
            } else if (game.snake[0].move == "left") {
                if (game.snake[2].y > this.y) {
                    return sa
                } else if (game.snake[2].y < this.y) {
                    return wa
                } else if (game.snake[2].y == this.y) {
                    return horizontal
                }
            } else if (game.snake[0].move == "right") {
                if (game.snake[2].y > this.y) {
                    return sd
                } else if (game.snake[2].y < this.y) {
                    return wd
                } else if (game.snake[2].y == this.y) {
                    return horizontal
                }
            }
        } else {
            if ((game.snake[index - 1].x == this.x && game.snake[index - 1].y < this.y) && (game.snake[index + 1].x < this.x && game.snake[index + 1].y == this.y) || (game.snake[index - 1].x < this.x && game.snake[index - 1].y == this.y) && (game.snake[index + 1].x == this.x && game.snake[index + 1].y < this.y)) {
                return wa
            } else if ((game.snake[index - 1].x == this.x && game.snake[index - 1].y < this.y) && (game.snake[index + 1].x > this.x && game.snake[index + 1].y == this.y) || (game.snake[index - 1].x > this.x && game.snake[index - 1].y == this.y) && (game.snake[index + 1].x == this.x && game.snake[index + 1].y < this.y)) {
                return wd
            } else if ((game.snake[index - 1].x == this.x && game.snake[index - 1].y > this.y) && (game.snake[index + 1].x < this.x && game.snake[index + 1].y == this.y) || (game.snake[index - 1].x < this.x && game.snake[index - 1].y == this.y) && (game.snake[index + 1].x == this.x && game.snake[index + 1].y > this.y)) {
                return sa
            } else if ((game.snake[index - 1].x == this.x && game.snake[index - 1].y > this.y) && (game.snake[index + 1].x > this.x && game.snake[index + 1].y == this.y) || (game.snake[index - 1].x > this.x && game.snake[index - 1].y == this.y) && (game.snake[index + 1].x == this.x && game.snake[index + 1].y > this.y)) {
                return sd
            } else if (game.snake[index - 1].y == this.y && game.snake[index + 1].y == this.y) {
                return horizontal
            } else if (game.snake[index - 1].x == this.x && game.snake[index + 1].x == this.x) {
                return vertical
            }
        }
    }
}

class Food {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
    create() {
        // Znovu vytvoří jídlo na plátně v náhodné pozici
        this.x = Math.floor((Math.random() * ((canvas.width - 25) - 0) + 0) / 25) * 25
        this.y = Math.floor((Math.random() * ((canvas.height - 25) - 0) + 0) / 25) * 25
        // Zjišťuje zda se jídlo nevytvořilo uvnitř hada, pokud ano: funkce se opakuje
        game.snake.forEach(function (obj) {
            if (obj.x == game.food.x && obj.y == game.food.y) {
                game.food.create()
            }
        })
    }
    draw() {
        ctx.drawImage(rodent, this.x, this.y, this.width, this.height)
    }
}

let timeOne = 0;

function update() {
    if ((Date.now() - timeOne) >= ((options.hsm) ? 100 : 300)) {
        timeOne = Date.now()
        game.update()
    }
    if (game.game_started) {
        requestAnimationFrame(update)
    }
}

let game = new Game()

// Vytvoří nový objekt hry
function clensing() {
    game = new Game()
}