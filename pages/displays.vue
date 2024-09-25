<template>
  <header></header>

  <div v-if="!loggedIn">
    <div class="page-container">
      <div class="info-container">
        <div v-if="displayLogin" class="register">
          <h2>Log-in</h2>
          <login />
          <p @click="changeMethod">No account?</p>
        </div>
        <div v-if="displaySignin" class="register">
          <h2>Sign-in</h2>
          <signin />
          <p @click="changeMethod">Already have an account?</p>
        </div>
      </div>
    </div>

  </div>


  <div v-if="loggedIn" class="logged">
    <sidebar @viewChanged="handleViewChange" style="position: fixed" />

    <div class="content">
      <div class="info" v-if="view === 'home'">
        <homeDisplay />
      </div>
      <div class="info" v-if="view === 'data'">
        <displayImg />
      </div>
      <div class="info" v-if="view === 'api'">
        <apiInfo />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from "@unhead/vue";

useHead({
  title: "Displays",
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "https://discords.ca/api/image/displays",
    },
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css",
    },
  ],
  meta: [
    {
      name: "twitter:title",
      content: "Discords.ca image hosting",
    },
    {
      name: "twitter:description",
      content: "host your images on discords.ca!",
    },
    {
      //change the color
      name: "theme-color",
      content: "#6b6a8f",
    },
  ],
});
</script>

<script>
import login from "../components/displays/log-in.vue";
import signin from "../components/displays/sign-in.vue";
import homeDisplay from "../components/displays/homeDisplay.vue";
import displayImg from "../components/displays/displayImg.vue";
import apiInfo from "../components/displays/apiInfo.vue";
import sidebar from "../components/displays/sidebar.vue";

export default {
  data() {
    return {
      loggedIn: false,
      displayLogin: true,
      displaySignin: false,
      view: "home",
    };
  },
  head() {
    return {
      title: "Displays",
      //change the website icon to an image
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "https://cdn.discords.ca/4b8rxpo.png",
        },
      ],
      meta: [
        {
          name: "twitter:title",
          content: "Discords.ca image hosting",
        },
        {
          name: "twitter:description",
          content: "host your images on discords.ca!",
        },
        {
          //change the color
          name: "theme-color",
          content: "#6b6a8f",
        },
      ],
    };
  },

  methods: {
    checkLogin() {
      if (
        sessionStorage.getItem("username") &&
        sessionStorage.getItem("password")
      ) {
        console.log("Logged in as:", sessionStorage.getItem("username"));
        this.loggedIn = true;
      }
    },
    checkView() {
      if (sessionStorage.getItem("view")) {
        console.log("view:", sessionStorage.getItem("view"));
        this.view = sessionStorage.getItem("view");
      }
    },
    handleViewChange(newView) {
      console.log("View changed to: " + newView);
      this.view = newView;
    },
    changeMethod() {
      if (this.displayLogin) {
        this.displayLogin = false;
        this.displaySignin = true;
      } else {
        this.displayLogin = true;
        this.displaySignin = false;
      }
    }
  },
  mounted() {
    this.checkLogin();
    this.checkView();
  },
};
</script>
<style scoped lang="css">
.page-container {
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}

.info-container {
  display: flex;
  height: 350px;
  width: 50%;
  min-width: 300px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-self: center;
  align-self: center;
  background-color: rgb(228, 228, 228);
  border-radius: 20px;
}

.register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.register h1 {
  font-family: "Quicksand", sans-serif;
  font-weight: 900;
  color: #000000;
}

p {
  font-family: "Quicksand", sans-serif;
  font-weight: 500;
  color: #000000;
}

.logged {
  display: flex;
  flex-direction: row;
}

.content {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-left: 200px;
}

.info {
  margin: 20px;
  width: 100%;
}
</style>
