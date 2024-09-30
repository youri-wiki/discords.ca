<template>
  <div class="container">
    <div class="input-container">
      <p v-if="!IDok" class="error-message">
        <i>Wrong password or username</i>
      </p>
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
      IDok: true,
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
          if (response.status === 401) {
            this.IDok = false;
          }
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
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px rgb(205, 205, 205) inset !important;
}


.container {
  background-color: rgb(205, 205, 205);
  display: flex;
  height: auto;
  width: 15rem;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 7px;
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
  min-height: 35px;
  height: 100%;
  border-left: 5px solid rgb(0, 0, 0);
  border-right: 0px solid;
  border-top: 0px solid;
  border-bottom: 1px solid rgb(0, 0, 0);
  background-color: transparent;
  margin-top: 10px;
  transition: all 0.3s ease-in-out;
}

.error-message {
  color: red;
  font-size: 0.8rem;
  margin-bottom: 10px;
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

/* Add any custom styles for your login form here */
</style>
