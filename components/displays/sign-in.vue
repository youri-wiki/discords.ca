<template>
  <div>
    <input type="text" v-model="username" placeholder="Username" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="signin">signin</button>
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
    async signin() {
      const runtimeConfig = useRuntimeConfig();

      try {
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
          // Handle signin failure
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
/* Add any custom styles for your login form here */
</style>
