<template>
  <div class="container">
    <div class="input-container">
      <input type="text" v-model="username" placeholder="Username" class="text-input" />
      <input type="password" v-model="password" placeholder="Password" class="text-input" />
    </div>
    <button @click="login" class="button"><i class="fas fa-sign-in-alt"></i></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const runtimeConfig = useRuntimeConfig();

      try {
        const response = await fetch(
          `${runtimeConfig.public.API_BASE_URL}/db/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: this.username,
              password: this.password,
            }),
          }
        );
        if (response.ok) {
          console.log("Login successful");
          sessionStorage.setItem("username", this.username);
          sessionStorage.setItem("password", this.password);
          sessionStorage.setItem("view", "home");
          location.reload();
        } else {
          // Handle login failure
          console.error("Login failed");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  background-color: rgb(205, 205, 205);
  display: flex;
  height: 100px;
  width: 15rem;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 20px;
}

.input-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;

}

.text-input {
  font-size: 17px;
  width: 10rem;
  height: 50%;
  border-left: 5px solid rgb(0, 0, 0);
  border-right: 0px solid;
  border-top: 0px solid;
  border-bottom: 1px solid rgb(0, 0, 0);
  background-color: transparent;
  margin-top: 10px;
  transition: all 0.3s ease-in-out;
}

.button {
  position: relative;
  height: 100%;
  background-color: transparent;
  border: 2px solid rgba(0, 0, 0, 0);
  border-left: 0px solid transparent;
  transition: all 0.3s ease-in-out;
  width: 50px;
  left: 0;
}

.button:hover {
  transition: all 0.3s ease-in-out;
  rotate: 180deg;
}

.text-input:focus {
  outline: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-color: #555 #555 transparent #555;

}
</style>
