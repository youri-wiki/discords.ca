<template>
  <div class="container">
    <div class="input-container">
      <input type="text" v-model="username" placeholder="Username" class="text-input" />
      <p v-if="passwordMismatch" class="error-message">
       <i>passwords doesn't match</i> 
      </p>
      <input type="password" v-model="password" placeholder="Password" class="text-input" />
      <input type="password" v-model="passwordConf" placeholder="Confirm password" class="text-input" />
    </div>
    <button @click="signin" class="button">
      <i class="fas fa-sign-in-alt"></i>
    </button>
  </div>
</template>


<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      passwordConf: "",
    };
  },
  computed: {
    passwordMismatch() {
      return this.password !== this.passwordConf && this.passwordConf.length > 0;
    },
  },
  methods: {
    async signin() {
      if (this.passwordMismatch) {
        return; // Prevent signing in if passwords don't match
      }

      try {
        const runtimeConfig = useRuntimeConfig();
        const response = await fetch(
          `${runtimeConfig.public.API_BASE_URL}/db/create/${this.username}`,
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
          console.log("signin successful");
          sessionStorage.setItem("username", this.username);
          sessionStorage.setItem("password", this.password);
          sessionStorage.setItem("view", "home");
          location.reload();
        } else {
          console.error("signin failed");
        }
      } catch (error) {
        console.error("Error during signin:", error);
      }
    },
  },
};
</script>


<style scoped>
.container {
  background-color: rgb(205, 205, 205);
  display: flex;
  height: auto;
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
