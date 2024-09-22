<template>
  <div class="login-container" :class="''">
    <p class="stay" :class="{ leave: anim }">{{ text }}</p>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Username" />
      <input type="text" v-model="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      text: "Enter your password",
      anim: false,
    };
  },
  methods: {
    login() {
      if (this.password === "your password") {
        this.text = "Password is incorrect";
      } else if (this.password === "incorrect") {
        this.text = "Try again";
      } else if (this.password === "again") {
        this.text = "hell nah";
        setTimeout(() => {
          this.text = "I quit this job";
        }, 2000); 

        setTimeout(() => {
          this.text = "I'm out";
        }, 3000);

        setTimeout(() => {
          this.text = "👤🔫";
          this.anim = true;
        }, 4000); 
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
}

.stay {
  font-size: 2rem;
  font-family: "QuickSand", sans-serif;
  color: rgb(0, 0, 0);
  transition: all 2s ease;
  position: relative;
  left: 0;
}

.leave {
  transition: all 5s ease;
  left: 80rem;
}

input {
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgb(0, 0, 0);
  font-size: 2rem;
  font-family: "QuickSand", sans-serif;
  align-items: center;
  justify-content: center;
  display: flex;
}

button {
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgb(0, 0, 0);
  font-size: 2rem;
  font-family: "QuickSand", sans-serif;
  color: rgb(0, 0, 0);

}
</style>
