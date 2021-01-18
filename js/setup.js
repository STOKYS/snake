const canvas = document.getElementById("game")
const ctx = canvas.getContext('2d');
ctx.globalCompositeOperation = "source-over";

document.getElementById("start").addEventListener("click", function(){
    game.start()
})

document.onkeyup = function movement(key) {
    if (game.game_started == true) {
        switch (key.keyCode) {
            case 87:
                if (snake[0].move != "down"){
                    snake[0].move = "up";
                }
                break;
            case 83:
                if (snake[0].move != "up"){
                    snake[0].move = "down";
                }

                break;
            case 68:
                if (snake[0].move != "left"){
                    snake[0].move = "right";
                }

                break;
            case 65:
                if (snake[0].move != "right"){
                    snake[0].move = "left";
                }
                break;
        }
    }
}