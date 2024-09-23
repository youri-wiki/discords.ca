<template>
  <header></header>
  <body>
    <div class="container-loggin">
    <div v-if="!loggedIn">
      <div>
        log-in
        <login />
      </div>
      <div>
        <div>
          sign-in
          <signin />
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
  </body>
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
  },
  mounted() {
    this.checkLogin();
    this.checkView();
  },
};
</script>
<style scoped lang="css">
body {
  background-color: rgb(221, 221, 221);
  min-height: 100vh;
}
h1 {
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
