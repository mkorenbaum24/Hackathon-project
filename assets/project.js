alert("test")


$(document).ready(function () {

    alert("Do you want to start the game")
    
        // first create the player
        
        //then we should add the controls for the arrow keys to move the player
        
        
        //add the computer/enemy player
        
        //add the computer movements.
        
        //If the player touches the enemy the dies an lose a life.
        
        //respawn if lives is greater than zero.
        //If lives === 0, then game over.
    
        
        
        function startGame() {
        myGamePiece = new Component(50, 50, "assets/mario.png", 10,
        200, "image")
        myObstacle = new Component(20, 20, "red", 510, 230)
        myGameArea.start()
        }
        
    
    
        let myGamePiece, myObstacle, lives
    
        function startGame() {
            myGamePiece = new Component(50, 50, "assets/mario.png", 10, 200, "image")
            myObstacle = new Component(20, 20, "red", 510, 230)
            lives=3
            myGameArea.start()
        }
        function fadeOut(imageNumber){
            console.log(imageNumber)
            $("#lives-" + imageNumber).animate({opacity: "0.10"});
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
        //ARROW CONTROLS
       /* document.onkeydown = (e) => {
        switch(e.which) {
        case 37: // left
        moveleft()
        break;
        
        case 38: // up
        moveup()
        break;
        
        case 39: // right
        moveright()
        break;
        
        case 40: // down
        movedown()
        break;
        
        default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
        };*/
        
        /*document.onkeyup = (e) => {
        switch(e.which) {
        case 37: // left
        clearmove()
        break;
        
        case 38: // up
        clearmove()
        break;
        
        case 39: // right
        clearmove()
        break;
        
        case 40: // down
        clearmove()
        break;
        
        default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
        };*/
        //ARROW CONTROLS
        
        var myGameArea = {
        canvas: document.getElementById("myCanvas"),
        start: function () {
        this.canvas.width = 600
        this.canvas.height = 450
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
        //there needs to be 2 conditionals otherwise we would be able to
        //move out of bounds if we move use arrow buttons to move left/right and
        //up/down at the same time
        //left and right
        if (myGamePiece.x < 0) {
        myGamePiece.speedX = 0
        }
        else if (myGamePiece.x > rect.width) {
        myGamePiece.x = rect.width
        }
        //up and down
        if (myGamePiece.y < 0) {
        myGamePiece.y = 0
        }
        else if (myGamePiece.y > rect.height) {
        myGamePiece.y = rect.height
        }
        }
        
        
        let speed = 2
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
        preventOutOfBounds(rect)
        chasePlayer()
        
        if (myGamePiece.crashWith(myObstacle)) {
        myGameArea.stop()
        document.getElementById("notifications").textContent =
        alert("Collision!!!")
        } else {
        myGameArea.clear()
        myGamePiece.newPos()
        myGamePiece.update()
        myObstacle.newPos()
        myObstacle.update()
    
            if (myGamePiece.crashWith(myObstacle)) {
                
                // fadeOut(lives)
                // lives--
                // myGameArea.stop()
                /* document.getElementById("notifications").textContent = "Collision!!!"*/
                // alert("collision!!");
                
            } else {
                myGameArea.clear()
                myGamePiece.newPos()
                myGamePiece.update()
                myObstacle.newPos()
                myObstacle.update()
            }
    
    
        }
        
        }
        
        // function updateGameArea() {
        // if (myGamePiece.crashWith(myObstacle)) {
        // myGameArea.stop()
        // /* document.getElementById("notifications").textContent
        //= "Collision!!!"*/
        // alert("collision!!");
        // } else {
        // myGameArea.clear()
        // myGamePiece.newPos()
        // myGamePiece.update()
        // myObstacle.newPos()
        // myObstacle.update()
        // }
        //
        // }
        
        function moveup() {
        myGamePiece.speedY = -3
        }
        
        function movedown() {
        myGamePiece.speedY = 3
        }
        
        function moveleft() {
        myGamePiece.speedX = -3
        }
        
        function moveright() {
        myGamePiece.speedX = 3
        }
        
        function clearmove() {
        myGamePiece.speedX = 0
        myGamePiece.speedY = 0
        }
        
        startGame()
        
        // CEDRICS CODE
        //--------------------------
        //If lives === 0, then game over.
        
        /* function playergetseaten() {
        
        console.log("try again")
        
        }
        
        var x = 3
        
        
        if (i = 3, i < x.length, i--) {
        playergetseateaten
        }
        else if (x === 0) {
        alert("gameover")
        }
        */
        
        
        });
        
        
        // So this is the snippet that I updated:
        
         //i used debugger to figure out which attributes i can work with on
        // the myGamePiece
         //console.log(`x: ${myGamePiece.x}, y: ${myGamePiece.y}`) - gives the
        // current x,y position
        
        //I noticed that when you move the player around, it can move out of
        //the canvas, so that's what the preventOutOfBounds function is for.
         function preventOutOfBounds(rect){
         //there needs to be 2 conditionals otherwise we would be able to
         //move out of bounds if we move use arrow buttons to move left/right and
         //up/down at the same time
         //left and right
         if(myGamePiece.x < 0){
         myGamePiece.x = 0
         }
         else if (myGamePiece.x > rect.width){
         myGamePiece.x = rect.width
         }
         //up and down
         if(myGamePiece.y < 0){
         myGamePiece.y = 0
         }
         else if (myGamePiece.y > rect.height){
         myGamePiece.y = rect.height
         }
         }
        
         // i looked at this solution for reference to make the function for
        // having the obstacle chase the player
         //https://www.reddit.com/r/javascript/comments/2pty1w/how_do_i_make_an_object_chase_an_other_object/
         //speed variable changes the speed of the obstacle
        
         let speed = 2
         function chasePlayer(){
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
         preventOutOfBounds(rect)
         chasePlayer()
        
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
        
        //When the obstacle does touch the player though, we hit an error, but
        // i'll let you take it from there.