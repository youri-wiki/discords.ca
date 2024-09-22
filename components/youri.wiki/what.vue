<template>
  <div class="what">
    <h1>What ???</h1>
    <div class="content">
      <p>chicken butt</p>
      <span :style="rollStyle" class="roll">{{ emoji }}</span>
    </div>
    <div class="range-container">
      <label for="rangeInput">Speed: {{ rangeValue }}</label>
      <input
        type="range"
        id="rangeInput"
        v-model="rangeValue"
        @change="logRangeValue"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rangeValue: 50,
      speed: 1,
      emoji: "🐔",
    };
  },
  computed: {
    rollStyle() {
      return {
        animationDuration: `${this.speed}s`,
      };
    },
  },
  methods: {
    logRangeValue() {
      const speed = 25 / this.rangeValue;
      this.speed = speed.toFixed(2);
    },
  },
};
</script>

<style scoped>
.what {
  font-family: "QuickSand", sans-serif;
  font-size: 2rem;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  display: flex;
  margin: 10px;
}

.content {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-content: center;
  text-align: center;
}

.roll {
  animation: roll linear infinite;
  font-size: 2rem;
  margin: 20px;
}

@keyframes roll {
  0% {
    transform: rotate(0deg);
  }
  12% {
    transform: rotate(45deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  62% {
    transform: rotate(225deg);
  }
  75% {
    transform: rotate(270deg);
  }
  87% {
    transform: rotate(315deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.range-container {
  margin-top: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
}
</style>
