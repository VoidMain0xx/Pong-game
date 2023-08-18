// targeting all the neccesary element
let userpaddle = document.getElementById("user-paddle");
let computerpaddle = document.getElementById("computer-paddle");
let ball = document.getElementById("ball");
let gamebox = document.getElementById("gamebox");
let wpressed = false;
let spressed = false;

// Score-Id

let userscore = document.getElementById("user-score");
let computerscore = document.getElementById("computer-score")

// To note the event and make the moment of the paddler 
document.addEventListener("keyup", keyUpHandler);
document.addEventListener("keydown", keyDownHandler);

function keyDownHandler(e) {
    if (e.key == 'w') {
        wpressed = true;
        console.log("w is pressed")
    }
    else if (e.key == 's') {
        spressed = true;
        console.log("s is pressed")
    }
}

function keyUpHandler(e) {
    if (e.key == 'w') {
        wpressed = false;
        console.log("w is released")
    }
    else if (e.key == 's') {
        spressed = false;
        console.log("s is released")
    }
}

// To make the ball move we need t know what is velocity ?
// Velocity is essentially a vector quantity. It is the rate of change of distance. 
// It is the rate of change of displacement. Speed of an object moving can never be negative. 
// The velocity of a moving object can be zero.

// Distance travelled by body per unit of time in a given direction.
//  Velocity = Distance travelled in a given direction/Time Taken. = Displacement/Time Taken.

// As the velocity is changing (Vector) therefore the velocity of the ball can be decomposed into Vx and Vy 
// (x and y of the velocity component).

//  the formula for velocity will be V = sqrt (Vx^2 + Vy^2) 

let Vx = -5;
let Vy = -4;
let V = Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2));

// we can also set one reset button using this function
function reset() {
    ball.style.left = "50%";
    ball.style.top = "50%";
    let Vx = -5;
    let Vy = -4;
    let V = Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2));
}

// collions


function checkcollision(activepaddle) {
    // some of the varriable to get the positions co-ordinates of the ball 
    let balltop = ball.offsetTop;
    let ballbottom = ball.offsetTop + ball.offsetHeight;
    let ballleft = ball.offsetLeft;
    let ballright = ball.offsetLeft + ball.offsetWidth;

    // some of the varriable to get the positions co-ordinates of the paddle 
    let paddletop = activepaddle.offsetTop;
    let paddlebottom = activepaddle.offsetTop + activepaddle.offsetHeight;
    let paddleleft = activepaddle.offsetLeft;
    let paddleright = activepaddle.offsetLeft + activepaddle.offsetWidth;

    // if this 4 condition are true then the collision is happening   ballbottom > paddletop , balltop < paddlebottom,
    //   ballright > paddleleft ,
    //   ballleft < paddleright.

    if (
        ballbottom > paddletop && balltop < paddlebottom &&
        ballright > paddleleft &&
        ballleft < paddleright
    ) {
        // console.log("collision detected");
        return true;
    }

    else {
        return false;
    }
}



// From here we write the game logic for Velocity of the ball and the paddle Movement\
function paddleHandler() {
    if (parseInt(computerscore.innerHTML) == 10) {
        alert("computer wins refresh the page to restart the game")
        reset();
    }
    if (parseInt(userscore.innerHTML) == 10) {
        alert("user wins refresh the page to restart the game");
        reset();
    }
    if (ball.offsetLeft < 0) {
        computerscore.innerHTML = parseInt(computerscore.innerHTML) + 1;
           reset();
        // Vx = -Vx;
    }
    if (ball.offsetLeft > gamebox.offsetWidth - ball.offsetWidth) {
        userscore.innerHTML = parseInt(userscore.innerHTML) + 1;
        reset();
        // Vx = -Vx;
    }

    if (ball.offsetTop < 0) {
        Vy = -Vy       //The Ball will Bounce back in negative dirrection
    }
    if (ball.offsetTop > gamebox.offsetHeight - ball.offsetHeight) {
        Vy = -Vy;
    }

    // For score ids to check whic section is on user section or computer section so we can calculate the score
    // you can this from the center of the ball or from the left or right side of the baall offset
    // first we will target the distance and if the the distance is less than / 2 of the game box then it will be on the left side of the box or on the right side of the box
    //basically to get a judgement that which paddle is active

    let paddle = ball.offsetLeft < gamebox.offsetWidth / 2 ? userpaddle : computerpaddle;


    //  createing some varriabele for the angle and the ball center and the paddle center

    let angle = 0 //  and this will be not constant
    let ballcenterY = ball.offsetTop + ball.offsetHeight / 2; //ball center Y axix
    let paddlecenterY = paddle.offsetTop + ball.offsetHeight / 2; //Paddle center Y axis

    //css manipulation for the movement of the ball;
    ball.style.left = ball.offsetLeft + Vx + "px";
    ball.style.top = ball.offsetTop + Vy + "px";


    if (checkcollision(paddle)) {
        if (paddle == userpaddle) {
            if (ballcenterY < paddlecenterY) {
                angle = -Math.PI / 4;
            }
            else if (ballcenterY > paddlecenterY) {
                angle = Math.PI / 4;
            }
            else {
                angle = 0;
            }
        }
        else if (paddle == computerpaddle) {
            if (ballcenterY < paddlecenterY) {
                angle = -3 * Math.PI / 4;
            }
            else if (ballcenterY > paddlecenterY) {
                angle = 3 * Math.PI / 4;
            }
            else {
                angle = 0;
            }
        }
        V = V + 0.2;
        Vx = V * Math.cos(angle);
        Vy = V * Math.sin(angle);
    }

    let aidelay = 0.3;
    computerpaddle.style.top =
        computerpaddle.offsetTop + (ball.offsetTop - computerpaddle.offsetTop - computerpaddle.offsetHeight / 2) * aidelay + "px";


    if (wpressed && userpaddle.offsetTop > 8) {
        userpaddle.style.top = userpaddle.offsetTop - 5 + "px"
    }
    if (spressed && userpaddle.offsetTop < gamebox.offsetHeight - userpaddle.offsetHeight - 2) {
        userpaddle.style.top = userpaddle.offsetTop + 5 + "px"
    }

    requestAnimationFrame(paddleHandler)
}

paddleHandler();