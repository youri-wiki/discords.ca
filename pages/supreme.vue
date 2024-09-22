<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <body>
    <div class="upper-container">
      <div class="logo">
        <img src="../assets/img/econo.png" alt="logo" />
      </div>
      <nav class="menu">
        <ul>
          <li>
            <a href="#"><i class="fas fa-home"></i> Accueil</a>
          </li>
        </ul>
      </nav>
    </div>
    
    <TopBar></TopBar>

    <div class="mobile-bar">
      <button class="navbar-toggle" @click="toggleMenu">
        <h1></h1>
      </button>
      <ul :class="{ 'show-menu': isMenuOpen }">
        <li>
          <a href="#"><i class="fas fa-home"></i> Accueil</a>
        </li>
      </ul>
    </div>

    <div class="center">
      <p :class="{ 'green-text': isStoreOpen, 'red-text': !isStoreOpen }">
        ⌚| La boutique est {{ isStoreOpen ? "ouverte" : "fermé" }}.
      </p>
      <p>Suivez-nous sur nos page pour être au courant des nouveauté !</p>
    </div>

    <div class="container">
      <div class="info-container">
        <div class="adresse-container">
          <h3></h3>
          <div class="adresse">
            <Reseau></Reseau>
          </div>
        </div>
        <div class="horraire">
          <horraire></horraire>
        </div>
      </div>

      <div class="post-container">
        <FbPage></FbPage>
      </div>
    </div>
    <div class="main-container">
      <p>Venez nous voir en vrai !</p>

      <MapSee></MapSee>
    </div>
  </body>
</template>

<script setup>
import { useHead } from "@unhead/vue";

useHead({
  title: "🛒 Suprem'écono",
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
    {
      rel: "stylesheet",
      href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
      integrity: "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=",
      crossorigin: "",
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "",
    },
    {
      href: "https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wdth,wght,YTLC@0,6..12,75..125,200..1000,440..540;1,6..12,75..125,200..1000,440..540&display=swap",
      rel: "stylesheet",
    },
  ],
});
</script>

<script>
import Reseau from "../components/compoSupreme/reseau.vue";
import Horraire from "../components/compoSupreme/horraire.vue";
import FbPage from "../components/compoSupreme/pageFb.vue";
import MapSee from "../components/compoSupreme/map.vue";
import TopBar from "../components/compoSupreme/TrucEnHautLa.vue";

export default {
  components: {
    Reseau,
    Horraire,
    FbPage,
    MapSee,
    TopBar,
  },
  data() {
    return {
      schedule: {
        Monday: "10:00 - 17:00",
        Tuesday: "10:00 - 17:00",
        Wednesday: "10:00 - 17:00",
        Thursday: "10:00 - 19:00",
        Friday: "10:00 - 19:00",
        Saturday: "10:00 - 17:00",
        Sunday: "10:00 - 17:00",
      },
      isMapHovered: false,
      showMap: false,
      mapInstance: null,
      showClipboardIcon: false,
      isMenuOpen: false,
      isMenuIconRotated: false,
    };
  },

  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      this.toggleIconRotation();
    },
    toggleIconRotation() {
      this.isMenuIconRotated = !this.isMenuIconRotated;
    },
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    });
  },

  computed: {
    isStoreOpen() {
      const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
      let openHours = "";
      switch (today) {
        case "Monday":
          openHours = this.schedule.Monday;
          break;
        case "Tuesday":
          openHours = this.schedule.Tuesday;
          break;
        case "Wednesday":
          openHours = this.schedule.Wednesday;
          break;
        case "Thursday":
          openHours = this.schedule.Thursday;
          break;
        case "Friday":
          openHours = this.schedule.Friday;
          break;
        case "Saturday":
          openHours = this.schedule.Saturday;
          break;
        case "Sunday":
          openHours = this.schedule.Sunday;
          break;
        default:
          return false;
      }

      const [openTime, closeTime] = openHours.split(" - ");
      const [openHour, openMinute] = openTime.split(":").map(Number);
      const [closeHour, closeMinute] = closeTime.split(":").map(Number);

      const currentTime = new Date();
      const storeOpen = new Date();
      const storeClose = new Date();

      storeOpen.setHours(openHour, openMinute, 0);
      storeClose.setHours(closeHour, closeMinute, 0);

      return currentTime >= storeOpen && currentTime <= storeClose;
    },
  },
};
</script>

<style scoped lang="css">
body {
  margin: 0;
  font-family: "Nunito sans", sans-serif;
}

.upper-container {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
  margin-bottom: 0rem;
  border-bottom: 3px solid #000;
}
.center {
  height: auto;
  min-width: 34%;
  max-width: 34%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  top: 1rem;
  margin: 0 auto;
  /* height: auto; Remove fixed height */
}

.center p {
  font-size: 30px;
}

.green-text {
  color: green;
}

.red-text {
  color: red;
}

.mobile-bar {
  display: none;
}

.logo img {
  max-width: 100%;
  max-height: 130px;
  min-width: 120px;
  min-height: 60px;
}

.menu ul {
  list-style-type: none;
  display: flex;
  padding: 0;
  margin-left: 100px;
  font-family: "Nunito sans", sans-serif;
  font-size: 30px;
  /* Adjust the margin to create space between logo and menu */
}

.mice {
  cursor: pointer;
}

.menu li {
  margin-right: 230px;
}

.menu a {
  text-decoration: none;
  color: rgb(0, 0, 0);
  font-weight: bold;
}

.container {
  display: flex;
  justify-content: center;
  align-items: stretch;
  text-align: center;
  /* height: 90vh; Remove fixed height */
  height: auto; /* Allow height to adjust */
}

.main-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  /* height: 40rem; Remove fixed height */
  width: 80%;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
  font-size: 50px;
  height: 70%; /* Set percentage height */
}
.info-container {
  position: relative;
  left: 50%;
  min-width: 33%;
  max-width: 33%;
  display: flex;
  flex-direction: column;
  align-items: end;
  text-align: center;
}

.post-container {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: start;
  text-align: center;
  min-width: 33%;
  max-width: 33%;
  right: 50%;
}

.horraire,
.adresse-container {
  margin-right: 30px;
}

.container .horraire {
  position: relative;
  top: 10px;
  width: 500px;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  font-family: "Nunito sans", sans-serif;
}

.container .adresse-container {
  position: relative;
  bottom: 0;
  width: 500px;
  height: auto;
  border-radius: 10px;
  overflow: hidden;
  font-family: "Nunito sans", sans-serif;
  margin-bottom: 40px;
  font-size: 20px;
}

.adresse {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

@media screen and (max-width: 981px) {
  .main-container {
    display: flex;
    margin-top: 40px;
  }
  .center {
    max-width: calc(100% - 20px); /* Adjust maximum width for smaller screens */

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    top: 5rem;
  }

  .center p {
    font-size: 50px;
  }

  .upper-container {
    display: none;
    align-items: center;
    padding: 10px;
    background-color: #ffffff;
    margin-bottom: 1rem;
  }

  .mobile-bar {
    position: fixed;
    display: flex;
    justify-content: start;
    align-items: start;
    padding: 10px;
    margin-bottom: 1rem;
    flex-direction: column;
    z-index: 999;
  }

  .navbar-toggle {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
    color: #0084ff;
    display: block;
    transition: transform 0.3s ease;
  }

  .navbar-toggle i {
    transition: transform 0.3s ease;
  }

  .navbar-toggle:hover {
    transform: rotate(-90deg);
  }

  ul {
    position: relative;
    display: none;
    background-color: rgba(141, 141, 141, 0.5);
    padding: 10px;
    width: auto;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    left: 10px;
  }

  ul.show-menu {
    display: block;
  }

  li {
    display: block;
    margin-right: 0;
    padding: 20px;
    font-size: 50px;
  }

  .container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: auto;
    width: 100%;
    margin-top: 50px;
  }

  .container .info-container {
    position: relative;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    margin-bottom: 20px;
    min-width: 100%;
  }

  .menu ul {
    position: static;
    top: auto;
    margin-left: 0;
    justify-content: center;
    flex-wrap: wrap;
  }

  .menu li {
    margin-right: 0;
    text-align: center;
    width: 100%;
  }

  .menu a {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
    text-decoration: none;
  }

  .menu a i {
    margin-left: 0;
    font-size: 60px;
    margin-bottom: 5px;
    color: black;
  }

  .container .horraire {
    position: relative;
    width: 80%;
    height: 500px;
    border-radius: 10px;
    overflow: visible;
    font-family: "Nunito sans", sans-serif;
    margin: 0 auto;
  }

  .post-container {
    width: 100%;
    margin-bottom: 20px;
    right: 14px;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: azure;
  }
}
</style>
