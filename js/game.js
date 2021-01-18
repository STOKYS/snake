class Game {
    constructor(){
        this.game_started = true;
    }
    start(){
        update()
    }
    update(){
        console.log("hey")
        ctx.clearRect(0,0,canvas.width,canvas.height)
        if (snake.length != 1 && snake[0].move != ''){
            update_under()
        } else {
            snake[0].update()
        }
        food.update()
    }
}

class Snake {
    constructor(x,y,width,height){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = this.width
        this.move = ''
    }
    update(){
        if (this.move != ''){
            if (this.move == "up"){
                this.y -= this.speed
            } else if (this.move == "down"){
                this.y += this.speed
            } else if (this.move == "right"){
                this.x += this.speed
            } else if (this.move == "left"){
                this.x -= this.speed
            }
        }
        snake.forEach(function(obj){
            obj.draw()
        })
        snake[0].colision()
    }
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }
    colision(){
        snake.forEach(function(obj, index){
            if (obj.x == snake[0].x && obj.y == snake[0].y && index != 0){
                game.game_started = false
                ctx.font = "80px Verdana";
                ctx.lineWidth = 2;
                ctx.fillStyle = "white";
                ctx.strokeStyle = "black"
                ctx.textAlign = "center";
                ctx.fillText(`Game Over!`, canvas.width/2, canvas.height/2);
                ctx.strokeText(`Game Over!`, canvas.width/2, canvas.height/2);
            }
        })
        this.eat()
    }
    eat(){
        if (snake[0].x == food.x && snake[0].y == food.y){
            food.create()
            snake.push(new Snake(snake[snake.length - 1].x, snake[snake.length - 1].y, snake[snake.length - 1].width, snake[snake.length - 1].height))
        }
    }
}

class Food {
    constructor(x,y,width,height){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
    create(){
        let x = Math.floor((Math.random() * ((canvas.width - 25) - 0) + 0) / 25) * 25
        let y = Math.floor((Math.random() * ((canvas.height - 25) - 0) + 0)  / 25) * 25
        console.log(x + " " + y)
        this.x = x
        this.y = y
    }
    update(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }
}

function update_under(){
    for (let i = (snake.length - 1); i >= 0; i--){
        if(i == 0){
            snake[0].update()
        } else {
            snake[i].x = snake[i-1].x
            snake[i].y = snake[i-1].y
        }
    }
}

let timeOne = 0;

function update() {
    if ((Date.now() - timeOne) >= 500) {
        timeOne = Date.now()
        game.update()
    }
    if (game.game_started) {
        requestAnimationFrame(update)
    }
}

let game = new Game()
let snake = [new Snake(350, 350, 25, 25)]
let food = new Food(100,100,25,25)