// first create the player

//then we should add the controls for the arrow keys to move the player
//

//know when specific key is pressed so it can tell wherether to move left up down or right.


//add the computer/enemy player

//add the computer movements.

//If the player touches the enemy the dies an lose a life.

//respawn if lives is greater than zero.
//If lives === 0, then game over.

let myGamePiece, myObstacle

function startGame() {
    myGamePiece = new Component(125, 125, "assets/mario.png", 10, 120, "image")
    myObstacle = new Component(10, 10, "red", 100, 40)
    myGameArea.start()
}
$(".up-button").on("click", function () {
    moveup()
})
$(".down-button").on("click", function () {
    movedown()
})
$(".left-button").on("click", function () {
    moveleft()
})
$(".right-button").on("click", function () {
    moveright()
})

$(".btn").mouseleave(function () {
    // alert("mouse moving")
    // Mouse events at https://api.jquery.com/category/events/mouse-events/
    clearmove()
    // myGamePiece.speedX = -1
})

/*document.body.onkeydown = function (e) {
    var keys = {
        37: "left",
        39: "right",
        38: "up",
    }
    console.log(e.keyCode)
    switch (e.keyCode) {
        case 38:
            clearmove()
            break
        case 37:
            moveleft()
            break
        case 39:
            moveright()
            break
        default:
    }
}
*/

var myGameArea = {
    canvas: document.getElementsByTagName("canvas")[0],
    start: function () {
        this.canvas.width = 600
        this.canvas.height = 450
        this.context = this.canvas.getContext("2d")
        document.body.insertBefore(this.canvas, document.body.childNodes[0])
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
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        } else {
            ctx.fillStyle = color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
    this.newPos = function () {
        this.x += this.speedX
        this.y += this.speedY
    }
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
        if (mybottom < othertop || mytop > otherbottom || myright < otherleft || myleft > otherright) {
            crash = false
        }
        return crash
    }
}

function updateGameArea() {
    if (myGamePiece.crashWith(myObstacle)) {
        myGameArea.stop()
        document.getElementById("notifications").textContent = "Collision!!!"
    } else {
        myGameArea.clear()
        myGamePiece.newPos()
        myGamePiece.update()
        myObstacle.newPos()
        myObstacle.update()
    }

}

function moveup() {
    myGamePiece.speedY = -1
}

function movedown() {
    myGamePiece.speedY = 1
}

function moveleft() {
    myGamePiece.speedX = -1
}

function moveright() {
    myGamePiece.speedX = 1
}

function clearmove() {
    myGamePiece.speedX = 0
    myGamePiece.speedY = 0
}

startGame()