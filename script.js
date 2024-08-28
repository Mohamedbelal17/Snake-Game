const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let snake = [{ x: 10, y: 10 }]; // done
let direction = { x: 0, y: 0 }; // done
let food = { x: 15, y: 15 }; // done
let obstacles = []; // done
let score = 0; //done
let gameInterval; // done
let isPaused = false; // done
//done
function startGame() {
  document.getElementById("startButton").disabled = true;
  document.getElementById("pauseButton").disabled = false;
  resetGame();
  gameInterval = setInterval(update, 100);
}
//done
function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  score = 0;
  obstacles = [];
  placeFood();
  placeObstacles();
}
//done
function placeFood() {
  food.x = Math.floor(Math.random() * (canvas.width / 10));
  food.y = Math.floor(Math.random() * (canvas.height / 10));
}
//done
function placeObstacles() {
  obstacles = [];
  for (let i = 0; i < 5; i++) {
    obstacles.push({
      x: Math.floor(Math.random() * (canvas.width / 10)),
      y: Math.floor(Math.random() * (canvas.height / 10)),
    });
  }
}
//done
function update() {
  if (isPaused) return;

  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Check for collisions
  // collisions with outline
  if (
    head.x < 0 ||
    head.x >= canvas.width / 10 ||
    head.y < 0 ||
    head.y >= canvas.height / 10 ||
    collision(head) ||
    obstacleCollision(head)
  ) {
    clearInterval(gameInterval);
    alert("Game Over! Score: " + score);
    resetGame();
    document.getElementById("startButton").disabled = false;
    return;
  }

  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score++;
    placeFood();
    if (score % 5 === 0) placeObstacles(); // Increase difficulty
  } else {
    snake.pop();
  }

  draw();
}

//done
function collision(head) {
  return snake.some((segment) => segment.x === head.x && segment.y === head.y);
}

//done
function obstacleCollision(head) {
  return obstacles.some(
    (obstacle) => obstacle.x === head.x && obstacle.y === head.y
  );
}
//done
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "green";
  snake.forEach((segment) =>
    ctx.fillRect(segment.x * 10, segment.y * 10, 10, 10)
  );
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * 10, food.y * 10, 10, 10);
  ctx.fillStyle = "black";
  obstacles.forEach((obstacle) =>
    ctx.fillRect(obstacle.x * 10, obstacle.y * 10, 10, 10)
  );
}
//done
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      direction = { x: 1, y: 0 };
      break;
  }
});
// done
document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("pauseButton").addEventListener("click", () => {
  isPaused = !isPaused;
  document.getElementById("pauseButton").textContent = isPaused
    ? "Resume"
    : "Pause";
});
