<template>
  <div class="center">
    <h2>Snake Game</h2>
    <p v-if="failed">You lost</p>
    <div>
      <canvas
        ref="gameCanvas"
        :width="canvasWidth"
        :height="canvasHeight"
      ></canvas>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvasWidth: 400,
      canvasHeight: 400,
      context: null,
      snake: [{ x: 10, y: 10 }],
      direction: "RIGHT",
      food: { x: 0, y: 0 },
      gridSize: 20,
      gameInterval: null,
      snakeEmoji: "🟩",
      foodEmoji: "🍎",
      failed: false,
    };
  },
  mounted() {
    this.createGame();
  },
  methods: {
    gameLoop() {
      this.moveSnake();
      this.checkCollision();
      this.drawGame();
    },
    moveSnake() {
      const head = { ...this.snake[0] };
      switch (this.direction) {
        case "UP":
          head.y -= 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
        case "LEFT":
          head.x -= 1;
          break;
        case "RIGHT":
          head.x += 1;
          break;
      }
      this.snake.unshift(head);
      if (head.x === this.food.x && head.y === this.food.y) {
        this.placeFood();
      } else {
        this.snake.pop();
      }
    },
    checkCollision() {
      const head = this.snake[0];
      if (
        head.x < 0 ||
        head.x >= this.canvasWidth / this.gridSize ||
        head.y < 0 ||
        head.y >= this.canvasHeight / this.gridSize ||
        this.snake
          .slice(1)
          .some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        clearInterval(this.gameInterval);
        this.failed = true;
      }
    },
    drawGame() {
      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.snake.forEach((segment) => {
        this.context.fillText(
          this.snakeEmoji,
          (segment.x + 0.5) * this.gridSize,
          (segment.y + 0.5) * this.gridSize
        );
      });
      this.context.fillText(
        this.foodEmoji,
        (this.food.x + 0.5) * this.gridSize,
        (this.food.y + 0.5) * this.gridSize
      );
    },
    placeFood() {
      this.food.x = Math.floor(
        Math.random() * (this.canvasWidth / this.gridSize)
      );
      this.food.y = Math.floor(
        Math.random() * (this.canvasHeight / this.gridSize)
      );
    },
    changeDirection(event) {
      const key = event.keyCode;
      if (key === 82) this.restartGame();
      const directions = {
        37: "LEFT",
        65: "LEFT",
        38: "UP",
        87: "UP",
        39: "RIGHT",
        68: "RIGHT",
        40: "DOWN",
        83: "DOWN",
      };
      const oppositeDirections = {
        LEFT: "RIGHT",
        UP: "DOWN",
        RIGHT: "LEFT",
        DOWN: "UP",
      };
      if (
        directions[key] &&
        directions[key] !== oppositeDirections[this.direction]
      ) {
        this.direction = directions[key];
      }
    },
    restartGame() {
      this.failed = false;
      this.snake = [{ x: 10, y: 10 }];
      this.direction = "RIGHT";
      this.placeFood();
      this.gameInterval = setInterval(this.gameLoop, 100);
    },
    createGame() {
      this.context = this.$refs.gameCanvas.getContext("2d");
      this.placeFood();
      document.addEventListener("keydown", this.changeDirection);
      this.gameInterval = setInterval(this.gameLoop, 100);
    },
  },
  beforeDestroy() {
    clearInterval(this.gameInterval);
    document.removeEventListener("keydown", this.changeDirection);
  },
};
</script>

<style>
canvas {
  border: 1px solid #000;
  justify-content: center;
  display: flex;
  margin: 0 auto;
}
</style>
