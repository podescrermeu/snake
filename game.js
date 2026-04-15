// Simple Snake Game Engine

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set up game parameters
const box = 20;
const canvasSize = 400;
let snake = [{x: 9 * box, y: 9 * box}];
let direction;
let food = { x: Math.floor(Math.random() * (canvasSize/box)) * box, y: Math.floor(Math.random() * (canvasSize/box)) * box };
let score = 0;

// Control the snake
document.addEventListener('keydown', directionControl);

function directionControl(event) {
    if (event.keyCode == 37 && direction != 'RIGHT') {
        direction = 'LEFT';
    } else if (event.keyCode == 38 && direction != 'DOWN') {
        direction = 'UP';
    } else if (event.keyCode == 39 && direction != 'LEFT') {
        direction = 'RIGHT';
    } else if (event.keyCode == 40 && direction != 'UP') {
        direction = 'DOWN';
    }
}

// Draw everything on the canvas
function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'lightgreen';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Determine snake's movement direction
    if (direction == 'LEFT') snakeX -= box;
    if (direction == 'UP') snakeY -= box;
    if (direction == 'RIGHT') snakeX += box;
    if (direction == 'DOWN') snakeY += box;

    // Check if snake has eaten the food
    if (snakeX == food.x && snakeY == food.y) {
        score++; 
        food = {
            x: Math.floor(Math.random() * (canvasSize/box)) * box,
            y: Math.floor(Math.random() * (canvasSize/box)) * box
        };
    } else {
        // Remove the tail of the snake
        snake.pop();
    }

    // Add new head
    let newHead = { x: snakeX, y: snakeY }; 

    // Game over conditions
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvasSize || snakeY >= canvasSize || collision(newHead, snake)) {
        clearInterval(game);
        alert('Game Over!');
        document.location.reload();
    }
    snake.unshift(newHead);

    // Update score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, box, box);
}

// Check collision
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// Set game loop speed
let game = setInterval(draw, 100);
