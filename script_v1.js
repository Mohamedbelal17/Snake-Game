//wiOut OOP
// const canvas = document.getElementById("gameCanvas");
// const ctx = canvas.getContext("2d");
// //note max number will be 40
// // gameInterval = setInterval(update, 100);

// // snake object + the direction of the snake

// class Snake {
//   constructor(x, y) {
//     this.snake = [
//       {
//         x: x,
//         y: y,
//       },
//     ];
//     this.direction = {
//       x: 0,
//       y: 0,
//     };
//   }
// }

// // food object
// class Food {
//   constructor(x, y) {
//     this.food = {
//       x: x,
//       y: y,
//     };
//   }
//   placeFood() {
//     this.food.x = Math.floor(Math.random() * (canvas.width / 10));
//     this.food.y = Math.floor(Math.random() * (canvas.width / 10));
//   }
// }

// // obstacles object
// class Obstacles {
//   constructor() {
//     this.obstacle = [];
//   }
//   placeObstacles() {
//     for (let i = 0; i < 5; i++) {
//       this.obstacle.push({
//         x: Math.floor(Math.random() * (canvas.width / 10)),
//         y: Math.floor(Math.random() * (canvas.width / 10)),
//       });
//     }
//   }
// }

// //--- the start
// const food1 = new Food(15, 15);
// let snake1 = new Snake(10, 10);
// const ab = new Obstacles();
// let isPause = false;
// let gameInterval;
// let score = 0;

// //---
// // draw function
// function Draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.fillStyle = "green";
//   snake1.snake.forEach((item) => {
//     ctx.fillRect(item.x * 10, item.y * 10, 10, 10);
//   });

//   ctx.fillStyle = "red";
//   ctx.fillRect(food1.food.x * 10, food1.food.y * 10, 10, 10);
//   ctx.fillStyle = "black";
//   ab.obstacle.forEach((item) => {
//     ctx.fillRect(item.x * 10, item.y * 10, 10, 10);
//   });
// }

// //snake movement
// document.addEventListener("keydown", (e) => {
//   switch (e.key) {
//     case "ArrowUp":
//       snake1.direction = { x: 0, y: -1 };
//       break;
//     case "ArrowDown":
//       snake1.direction = { x: 0, y: 1 };
//       break;
//     case "ArrowLeft":
//       snake1.direction = { x: -1, y: 0 };
//       break;
//     case "ArrowRight":
//       snake1.direction = { x: 1, y: 0 };
//   }
// });

// //Update function ===>oop done
// function Update() {
//   if (isPause) return;
//   const head = {
//     x: snake1.snake[0].x + snake1.direction.x,
//     y: snake1.snake[0].y + snake1.direction.y,
//   };

//   if (
//     Collision(head) ||
//     CollisionObstacles(head) ||
//     head.x < 0 ||
//     head.x >= canvas.width / 10 ||
//     head.y < 0 ||
//     head.y >= canvas.height / 10
//   ) {
//     clearInterval(gameInterval);
//     alert(`Game Over Your Score is ${score}`);
//     RestartGame();
//     //start button disable false
//     document.getElementById("startButton").disabled = false;
//   }
//   snake1.snake.unshift(head);
//   if (head.x === food1.food.x && head.y === food1.food.y) {
//     score++;
//     food1.placeFood();
//     //levels
//     if (score % 5 === 0) ab.placeObstacles();
//   } else {
//     snake1.snake.pop();
//   }
//   Draw();
// }

// //collision with div
// function Collision(head) {
//   return snake1.snake
//     .slice(1)
//     .some((seg) => seg.x === head.x && seg.y === head.y);
// }

// //collision with obstacles
// function CollisionObstacles(head) {
//   return ab.obstacle.some((obs) => obs.x === head.x && obs.y === head.y);
// }

// //game start ==>oop done
// function StartGame() {
//   document.getElementById("startButton").disabled = true;
//   document.getElementById("pauseButton").disabled = false;
//   RestartGame();
//   gameInterval = setInterval(Update, 100);
// }

// // game restart ==> oop done
// function RestartGame() {
//   snake1 = new Snake(10, 10); // Update global snake1
//   score = 0; // Update global score
//   ab.obstacle = [];
//   food1.placeFood();
//   ab.placeObstacles();
// }

// //pause button functionality
// document
//   .getElementById("startButton")
//   .addEventListener("click", () => StartGame());
// const btn = document.getElementById("pauseButton");
// btn.addEventListener("click", () => {
//   isPause = !isPause;
//   btn.textContent = isPause ? "Resume" : "Pause";
// });
//-----------------------------------------------------------------

//OOP code
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function drawRect(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * 10, y * 10, 10, 10);
}

class Snake {
  constructor(x, y) {
    this.snake = [{ x: x, y: y }];
    this.direction = { x: 0, y: 0 };
  }

  updateDirection(newDirection) {
    this.direction = newDirection;
  }

  move() {
    const head = {
      x: this.snake[0].x + this.direction.x,
      y: this.snake[0].y + this.direction.y,
    };
    this.snake.unshift(head);
    this.snake.pop();
  }

  grow() {
    const head = {
      x: this.snake[0].x + this.direction.x,
      y: this.snake[0].y + this.direction.y,
    };
    this.snake.unshift(head);
  }

  checkCollision(head) {
    return this.snake.slice(1).some((el) => el.x === head.x && el.y === head.y);
  }
}

class Food {
  constructor() {
    this.placeFood();
  }

  placeFood() {
    this.food = {
      x: Math.floor(Math.random() * (canvas.width / 10)),
      y: Math.floor(Math.random() * (canvas.height / 10)),
    };
  }
}

class Obstacles {
  constructor() {
    this.placeObstacles();
  }

  placeObstacles() {
    this.obstacle = [];
    for (let i = 0; i < 5; i++) {
      this.obstacle.push({
        x: Math.floor(Math.random() * (canvas.width / 10)),
        y: Math.floor(Math.random() * (canvas.height / 10)),
      });
    }
  }
}

class Game {
  constructor() {
    this.snake = new Snake(10, 10);
    this.food = new Food();
    this.obstacles = new Obstacles();
    this.score = 0;
    this.isPause = false;
    this.gameInterval = null;

    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          this.snake.updateDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          this.snake.updateDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          this.snake.updateDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          this.snake.updateDirection({ x: 1, y: 0 });
          break;
      }
    });

    document
      .getElementById("startButton")
      .addEventListener("click", () => this.startGame());
    document
      .getElementById("pauseButton")
      .addEventListener("click", () => this.togglePause());
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.snake.snake.forEach((segment) =>
      drawRect(segment.x, segment.y, "green")
    );
    drawRect(this.food.food.x, this.food.food.y, "red");
    this.obstacles.obstacle.forEach((obs) => drawRect(obs.x, obs.y, "black"));
  }

  update() {
    if (this.isPause) return;

    const head = {
      x: this.snake.snake[0].x + this.snake.direction.x,
      y: this.snake.snake[0].y + this.snake.direction.y,
    };

    if (
      this.snake.checkCollision(head) ||
      this.obstacles.obstacle.some(
        (el) => el.x === head.x && el.y === head.y
      ) ||
      head.x < 0 ||
      head.x >= canvas.width / 10 ||
      head.y < 0 ||
      head.y >= canvas.height / 10
    ) {
      clearInterval(this.gameInterval);
      alert(`Game Over! Your Score is ${this.score}`);
      this.restartGame();
      document.getElementById("startButton").disabled = false;
      return;
    }

    this.snake.move();

    if (head.x === this.food.food.x && head.y === this.food.food.y) {
      this.score++;
      this.food.placeFood();
      if (this.score % 5 === 0) this.obstacles.placeObstacles();
      this.snake.grow();
    }

    this.draw();
  }

  startGame() {
    document.getElementById("startButton").disabled = true;
    document.getElementById("pauseButton").disabled = false;
    this.restartGame();
    this.gameInterval = setInterval(() => this.update(), 100);
  }

  restartGame() {
    this.snake = new Snake(10, 10);
    this.score = 0;
    this.obstacles = new Obstacles();
    this.food.placeFood();
    this.draw();
  }

  togglePause() {
    this.isPause = !this.isPause;
    document.getElementById("pauseButton").textContent = this.isPause
      ? "Resume"
      : "Pause";
  }
}

const game = new Game();
