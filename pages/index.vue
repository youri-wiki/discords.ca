<template>
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, maximum-scale=1"
  />
  <p @click="toggleMenu" class="sidebar">
    <i class="fas fa-bars"></i>
  </p>
  <sidebar ref="sideMenu" />

  <div class="Top">
    <h1>{{ pName }}</h1>
    <p><i>youri's messing up space</i></p>
  </div>
  <div v-if="module == 'home'">
    <div class="center">
      <h2>Socials</h2>
      <div class="social-wrapper">
        <div class="social">
          <i class="fab fa-instagram"> </i>
          <p @click="redirect('https://www.instagram.com/masterdpro/')">
            masterdpro
          </p>
        </div>
        <div class="social">
          <i class="fab fa-discord"></i>
          <p
            @click="
              redirect('https://www.discord.com/users/722450303919587409')
            "
          >
            masterdpro
          </p>
        </div>
        <div class="social">
          <i class="fab fa-github"></i>
          <p @click="redirect('https://github.com/masterdpro')">masterdpro</p>
        </div>
      </div>
      <h2>Projects</h2>
      <div class="project-wrapper">
        <div
          class="project"
          v-for="(feature, index) in projects"
          :key="index"
          :style="{ backgroundColor: feature.color }"
        >
          <a class="project" id="lui" :href="feature.link">
            <img :src="feature.logo" alt="logo" />

            <div style="flex-direction: column">
              <h3>
                <a :href="feature.link">{{ feature.name }}</a>
              </h3>
              <p>{{ feature.description }}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <component :is="module" />
  </div>
</template>

<script setup>
import { useHead } from "@unhead/vue";

useHead({
  title: "🥥 discords.ca",
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
      content: "discords.ca, a place where web meets humans!",
    },
    {
      name: "twitter:description",
      content: "This website ain't useful at all",
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
import sidebar from "../components/youri.wiki/sidebar.vue";
import who from "../components/youri.wiki/who.vue";
import what from "../components/youri.wiki/what.vue";
import snake from "../components/youri.wiki/snake.vue";
import wtf from "../components/youri.wiki/wtf.vue";
import login from "../components/youri.wiki/login.vue";


export default {
  components: {
    sidebar,
    who,
    what,
    snake,
    wtf,
    login,
  },
  data() {
    return {
      projects: [
        {
          name: "Displays 🖼️",
          description:
            "Displays is a website that allows you to host images and share them with an esay to use API !",
          color: "rgb(119, 126, 218)",
          logo: "https://discords.ca/api/image/displays",
          link: "/displays",
        },
        {
          name: "Counto 🧮",
          description:
            "Counto, a discord that going to make your server counting to the infinite!",
          color: "#188b76",
          logo: "https://discords.ca/api/image/counto",
          link: "/counto",
        },
        {
          name: "Pro's & co 🎭",
          description:
            "My own community discord server ! Mostly french, but everyone is welcome !",
          color: "#7468af",
          logo: "https://cdn.discordapp.com/icons/807434421279916034/dcc8c9be68ab7b23267b3de83291f612.webp",
          link: "https://discord.gg/rJN5cwR3pf",
        },
      ],
      module: "",
      pName: "Discords.ca",
    };
  },
  methods: {
    redirect(link) {
      window.location.href = link;
    },
    toggleMenu() {
      this.$refs.sideMenu.toggleMenu();
    },
    getModule() {
      const modules = ref([]);

      let module = window.location.search.split("?")[1];
      if (!module) {
        module = "home";
      }
      //get all the module in components/youri.wiki/
      const files = import.meta.glob("../components/youri.wiki/*.vue");
      modules.value = Object.keys(files).map((key) =>
        key.replace(/.*\/(.+)\.vue$/, "$1")
      );

      if (modules.value.includes(module)) {
        return module;
      } else {
        return "home";
      }
    },
  },
  mounted() {
    this.module = this.getModule();
    if (this.module == "home") {
      this.pName = "Discords.ca";
    } else {
      this.pName = this.module;
    }
  },
};
</script>

<style scoped>
template {
  font-family: "QuickSand", sans-serif;
  font-size: 2rem;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin: 10px;
}

.Top {
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.Top h1 {
  color: rgb(119, 126, 218);
  text-align: center;
  font-family: "QuickSand", sans-serif;
  font-size: 8rem;
  padding: 0;
  margin: 0;
}

.Top p {
  color: rgb(0, 0, 0);
  text-align: center;
  font-family: "QuickSand", sans-serif;
  font-size: 20px;
  position: relative;
}
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  color: rgb(0, 0, 0);
  font-family: "QuickSand", sans-serif;
  font-size: 2rem;
}

.center h2 {
  text-align: center;

  font-family: "QuickSand", sans-serif;
  font-size: 4rem;
  padding: 0;
  margin: 0;
}

.project-wrapper {
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  color: rgb(0, 0, 0);
  font-family: "QuickSand", sans-serif;
  font-size: 2rem;
}
.project-wrapper h2 {
  font-size: 4rem;
  margin-bottom: 10px;
}

.project {
  display: flex;
  flex-direction: row;
  max-width: 800px;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  color: rgb(0, 0, 0);
  font-family: "QuickSand", sans-serif;
  font-size: 2rem;
}

.project img {
  width: 200px;
  height: 200px;
  border-radius: 10%;
}

.project h3 {
  font-size: 2rem;
  margin: 30px;
}

.project p {
  font-size: 1rem;
  margin: 30px;
}

.project a {
  color: rgb(0, 0, 0);
  text-decoration: none;
  transition: color 0.5s ease-in-out;
}

#lui {
  transition: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: 100%;
}

#lui:hover {
  color: rgb(0, 0, 0);
}

.project a:hover {
  color: rgb(39, 70, 156);
}

.social-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  color: rgb(0, 0, 0);
  font-family: "QuickSand", sans-serif;
  font-size: 2rem;
}

.social {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: auto;
  max-width: 800px;
  flex-wrap: wrap;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  color: rgb(0, 0, 0);
  font-family: "QuickSand", sans-serif;
  font-size: 2rem;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease-in-out;
  bottom: 0;
}

.social i {
  margin-right: 2px;
}

.social:hover {
  bottom: 5px;
  color: rgb(8, 97, 119);
  transition: all 0.3s ease-in-out;
}

.sidebar{
  display: flex;
  position: relative;
  margin-left: 30px;
  font-size: 30px;
}

@media (max-width: 768px) {
  .Top h1 {
    font-size: 4rem;
  }

  .project img {
    display: none;
  }
}
</style>
