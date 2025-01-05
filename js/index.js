// Game Constants & Variables
let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];

food = {x: 6, y: 7};

// Game Functions
function main(ctime) { // current time at which the game will run
    window.requestAnimationFrame(main); // /// this is used to render an animation and takes a function as parameter which is a timsstamp
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If the snake bumps into itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // if the snake bumps into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}
// Function to start the game with specified speed

// Function to start the game with specified speed
function startGame(newSpeed) {
    speed = newSpeed; 
    window.requestAnimationFrame(main);
}

// Event listeners for speed buttons
document.querySelectorAll('.speed button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove the 'selected' class from all buttons
        document.querySelectorAll('.speed button').forEach(btn => {
            btn.classList.remove('selected');
        });

        // Add the 'selected' class to the clicked button
        button.classList.add('selected');

        const speedText = button.textContent.toLowerCase();
        switch (speedText) {
            case 'slow':
                startGame(2);
                break;
            case 'normal':
                startGame(4);
                break;
            case 'hard':
                startGame(10);
                break;
            case 'legendary':
                startGame(20);
                break;
            default:
                break;
        }
    });
});



function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        // musicSound.play();
        score = 0; 
    }

    // // If the snake eats food, increase the length of snake and regenrate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){ // the coordinates of food and head of snake becomes equal
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};  // //{...snakeArr[i]} creates a new snake object segment similar to previous one.This effectively moves each body segment of the snake forward by one position.
    }

    snakeArr[0].x += inputDir.x; // this is where the head is pointed to a new direction
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = ""; // we did this so that the snake is displayed in an empty box not along with anything else
    snakeArr.forEach((e, index)=>{  //// this done so that all the objects in snake arrays are added here as the snake keeps on eating food
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}


// Main logic starts here
// musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);  /// this is used to render an animation and takes a function as parameter which is a timsstamp
window.addEventListener('keydown', e =>{
    
    inputDir = {x: 0, y: 1} // any button pressed starts the game
    moveSound.play();
    musicSound.play(); 
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
    

});