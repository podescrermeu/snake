// Snake Game Engine - Fixed Version

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const scoreDisplay = document.getElementById('score');

// Game parameters
const box = 20;
const canvasSize = 400;
const gridSize = canvasSize / box;

let snake = [{x: 9 * box, y: 9 * box}];
let direction = 'RIGHT';
let nextDirection = 'RIGHT';
let food = generateFood();
let score = 0;
let gameActive = false;
let gameLoopId = null;

// Generate random food position
function generateFood() {
    return {
        x: Math.floor(Math.random() * gridSize) * box,
        y: Math.floor(Math.random() * gridSize) * box
    };
}

// Handle keyboard input
document.addEventListener('keydown', function(event) {
    if (!gameActive) return;
    
    if (event.keyCode === 37 && direction !== 'RIGHT') nextDirection = 'LEFT';
    if (event.keyCode === 38 && direction !== 'DOWN') nextDirection = 'UP';
    if (event.keyCode === 39 && direction !== 'LEFT') nextDirection = 'RIGHT';
    if (event.keyCode === 40 && direction !== 'UP') nextDirection = 'DOWN';
});

// Start button click handler
startBtn.addEventListener('click', function() {
    if (!gameActive) {
        gameActive = true;
        startBtn.textContent = 'Stop Game';
        gameLoop();
    } else {
        gameActive = false;
        clearInterval(gameLoopId);
        startBtn.textContent = 'Start Game';
    }
});

// Main game loop
function gameLoop() {
    if (!gameActive) return;
    
    update();
    draw();
    
    gameLoopId = setTimeout(gameLoop, 100);
}

// Update game state
function update() {
    direction = nextDirection;
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;
    
    // Check wall collision
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvasSize || snakeY >= canvasSize) {
        gameOver();
        return;
    }
    
    // Check self collision
    for (let i = 0; i < snake.length; i++) {
        if (snakeX === snake[i].x && snakeY === snake[i].y) {
            gameOver();
            return;
        }
    }
    
    snake.unshift({x: snakeX, y: snakeY});
    
    // Check food collision
    if (snakeX === food.x && snakeY === food.y) {
        score += 10;
        scoreDisplay.textContent = 'Score: ' + score;
        food = generateFood();
    } else {
        snake.pop();
    }
}

// Draw game
function draw() {
    // Clear canvas
    ctx.fillStyle = '#c0de59';
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    
    // Draw grid
    ctx.strokeStyle = '#a0b840';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= gridSize; i++) {
        ctx.beginPath();
        ctx.moveTo(i * box, 0);
        ctx.lineTo(i * box, canvasSize);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, i * box);
        ctx.lineTo(canvasSize, i * box);
        ctx.stroke();
    }
    
    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? '#1a3a1a' : '#2d5a2d';
        ctx.fillRect(snake[i].x + 1, snake[i].y + 1, box - 2, box - 2);
    }
    
    // Draw food
    ctx.fillStyle = '#ff3333';
    ctx.fillRect(food.x + 1, food.y + 1, box - 2, box - 2);
}

// Game over
function gameOver() {
    gameActive = false;
    clearInterval(gameLoopId);
    startBtn.textContent = 'Start Game';
    alert('Game Over! Final Score: ' + score + '\n\nClick Start Game to play again!');
    
    // Reset game
    snake = [{x: 9 * box, y: 9 * box}];
    direction = 'RIGHT';
    nextDirection = 'RIGHT';
    food = generateFood();
    score = 0;
    scoreDisplay.textContent = 'Score: 0';
    draw();
}

// Initial draw
draw();
