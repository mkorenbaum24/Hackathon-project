//Create the dot
//Make the dot appear anywhere in the canvas
//If dot consumed, create new one and destroy first one.

$(document).ready(function () {
    alert("Do you want to start the Game?")
    // first create the player
    //then we should add the controls for the arrow keys to move the player
    //add the computer/enemy player
    //add the computer movements.
    //If the player touches the enemy the dies an lose a life.
    //respawn if lives is greater than zero.
    //If lives === 0, then game over.
    let myGamePiece, myObstacle, lives, dot
    let startX = 10
    let startY = 200
    let squareX = 510
    let squareY = 230
    let canvasY = 450
    let canvasX = 600
    let score = 0
    function randomPosition() {
        var randomNumberY = Math.floor(Math.random() * canvasY + 1)
        var randomNumberX = Math.floor(Math.random() * canvasX + 1)
        dot = new Component(10, 10, "yellow", randomNumberX, randomNumberY)
    }

    function startGame() {
        randomPosition()
        myGamePiece = new Component(50, 50, "assets/mario.png", startX, startY, "image")
        myObstacle = new Component(20, 20, "red", squareX, squareY)
        lives = 3
        myGameArea.start()
    }
    function fadeOut(imageNumber) {
        var targetId = $(`#lives-${imageNumber}`)
        console.log(imageNumber)
        targetId.animate({ opacity: "0.10" })
    }


    $(".up-button").mousedown("click", function () {
        moveup()
    })
    $(".down-button").mousedown("click", function () {
        movedown()
    })
    $(".left-button").mousedown("click", function () {
        moveleft()
    })
    $(".right-button").mousedown("click", function () {
        moveright()
    })

    $(".btn").mouseup(function () {
        clearmove()
    })


    var myGameArea = {
        canvas: document.getElementById("myCanvas"),
        start: function () {

            this.canvas.width = canvasX
            this.canvas.height = canvasY
            this.context = this.canvas.getContext("2d")
            // document.body.insertBefore(this.canvas,
            document.body.childNodes[0]
            this.frameNo = 0
            this.interval = setInterval(updateGameArea, 20)
        },
        clear: function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        },
        stop: function () {
            clearInterval(this.interval)
        },
    }

    function Component(width, height, color, x, y, type) {
        this.type = type
        if (type == "image") {
            this.image = new Image()
            this.image.src = color
        }
        this.width = width
        this.height = height
        this.speedX = 0
        this.speedY = 0
        this.x = x
        this.y = y
        this.update = function () {
            ctx = myGameArea.context
            if (type == "image") {
                ctx.drawImage(this.image, this.x, this.y, this.width,
                    this.height)
            } else {
                ctx.fillStyle = color
                ctx.fillRect(this.x, this.y, this.width, this.height)
            }
        }
        this.newPos = function () {
            this.x += this.speedX
            this.y += this.speedY
        }
        this.resetPos = function (newX, newY) {
            this.x = newX
            this.y = newY
        }
        /*this.resetPos = function (myobstacleX, myobstacleY) {
            this.X = myobstacleX
            this.Y = myobstacleY*/
        // }
        this.crashWith = function (otherobj) {
            var myleft = this.x
            var myright = this.x + this.width
            var mytop = this.y
            var mybottom = this.y + this.height
            var otherleft = otherobj.x
            var otherright = otherobj.x + otherobj.width
            var othertop = otherobj.y
            var otherbottom = otherobj.y + otherobj.height
            var crash = true
            if (mybottom < othertop || mytop > otherbottom || myright
                < otherleft || myleft > otherright) {
                crash = false
            }
            return crash
        }
    }


    //i used debugger to figure out which attributes i can work with on
    //the myGamePiece
    //console.log(`x: ${myGamePiece.x}, y: ${myGamePiece.y}`) - gives the
    //current x,y position
 
    //I noticed that when you move the player around, it can move out of
    //the canvas, so that's what the preventOutOfBounds function is for.
   
function preventOutOfBounds(rect) {

if (myGamePiece.x < 0) {
    myGamePiece.x = 0
}
else if (myGamePiece.x > canvasX - edgeLength) {
    myGamePiece.x = canvasX - edgeLength
}
//up and down
if (myGamePiece.y < 0) {
    myGamePiece.y = 0
}
else if (myGamePiece.y > canvasY - edgeLength) {
    myGamePiece.y = canvasY - edgeLength
}
}

    let speed = 2
    let playerSpeed = 3
    function chasePlayer() {
        var dx = myGamePiece.x - myObstacle.x;
        var dy = myGamePiece.y - myObstacle.y;
        // normalize (= direction vector)
        // (a direction vector has a length of 1)
        var length = Math.sqrt(dx * dx + dy * dy);
        if (length) {
            dx /= length;
            dy /= length;
        }

        // move
        // delta is the elapsed time in seconds
        // SPEED is the speed in units per second (UPS)
        myObstacle.x += dx * speed;
        myObstacle.y += dy * speed;
    }

    //so i placed the two functionse chasePlayer and preventOutOfBounds in
    //the updateGameArea function since it is constantly updating

    function updateGameArea() {

        //this rect gives us the bounds of the game area canvas, and we
        //can see how big it is with rect.width, rect.height respectively
        var rect = myGameArea.canvas.getBoundingClientRect();

        chasePlayer()
        if (myGamePiece.crashWith(dot)) {

            randomPosition()
            score++
            $("#score")[0].innerHTML = `Score: ${score}`
            console.log("score:" + score)


        }
        if (myGamePiece.crashWith(myObstacle)) {
            myGameArea.stop()
            fadeOut(lives)

            if (lives > 1 && lives < 4) {
                lives--
                myObstacle.resetPos(squareX, squareY)
                myGamePiece.resetPos(startX, startY)

                myObstacle.update()
                myGamePiece.update()
                alert(lives + " left!")

                myGameArea.start()
            } else if (lives <= 1) {
                alert("Game Over!!!")
                // game over -- show it
                // reset game --
            }
            /* document.getElementById("notifications").textContent = "Collision!!!"*/
            // alert("collision!!");
        } else {
            myGameArea.clear()
            myGamePiece.newPos()
            myGamePiece.update()
            myObstacle.newPos()
            myObstacle.update()
            dot.update()
            preventOutOfBounds()
        }
    }


    function moveup() {
        myGamePiece.speedY = -playerSpeed
    }

    function movedown() {
        myGamePiece.speedY = playerSpeed
    }

    function moveleft() {
        myGamePiece.speedX = -playerSpeed
    }

    function moveright() {
        myGamePiece.speedX = playerSpeed
    }

    function clearmove() {
        myGamePiece.speedX = 0
        myGamePiece.speedY = 0
    }

    startGame()


});

