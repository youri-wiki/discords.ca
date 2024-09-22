<template>
  <div>
    <input type="text" v-model="username" placeholder="Username" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="login">Login</button>
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
/* Add any custom styles for your login form here */
</style>
