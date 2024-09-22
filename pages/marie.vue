<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="upperthing">
    <p @click="toggleMenu">
      <i class="fas fa-bars"></i>
    </p>
    <p>Centre de liquidation</p>
    <img src="../assets/img/marie.svg" alt="logo" />
  </div>
  <div class="page-container">
    <SideMenu ref="sideMenu" />
    <TopBar></TopBar>

    <div class="center">
      <p :class="{ 'green-text': isStoreOpen, 'red-text': !isStoreOpen }">
        ⌚| La boutique est {{ isStoreOpen ? "ouverte" : "fermé" }}.
      </p>
    </div>

    <div class="mobile-text">
      <h3>Vous cherchez</h3>
      <ul>
        <li><p>Des aliments ?</p></li>
        <li><p>Des produits de beauté ?</p></li>
        <li><p>Des objects de tout les jours ?</p></li>
      </ul>
      <p class="sub">Liquidation Marie a tout ça, a un prix imbattable !</p>
    </div>

    <div class="container">
      <div class="post-container">
        <FbPage></FbPage>
      </div>

      <div class="main-container">
        <p>Venez nous voir en vrai!</p>
        <MapSee></MapSee>
      </div>
      <div class="info-container">
        <div class="adresse-container">
          <div class="adresse" id="info">
            <Reseau></Reseau>
          </div>
        </div>
        <div class="horraire" id="schedule">
          <Horraire></Horraire>
        </div>
      </div>
    </div>
    <footer>
      <Footer></Footer>
    </footer>
  </div>
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
import SideMenu from "../components/compoSupreme/sidemenu.vue";
import Footer from "../components/compoSupreme/footer.vue";

export default {
  components: {
    Reseau,
    Horraire,
    FbPage,
    MapSee,
    TopBar,
    SideMenu,
    Footer,
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
      this.$refs.sideMenu.toggleMenu();
      console.log("truc");
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

<style scoped>
html,
body {
  overflow-x: hidden;
  width: 100%;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1920px;
  margin: 0 auto;
}

.upperthing {
  height: 100px;
  width: 100%;
  background-color: rgb(221, 221, 221);
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: space-between;
}

.mobile-text {
  display: none;
}

.upperthing p {
  font-size: 30px;
  margin: 40px;
}

.upperthing img {
  height: auto;
  width: 90px;
  margin: 10px;
}

.menu {
  position: absolute;
  font-size: 30px;
  margin-left: 1rem;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  text-align: center;
  flex-wrap: wrap;
  max-width: 100%;
}
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 33%; /* Adjust width for PC */
  margin: 0; /* Add margin for spacing */
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
  font-size: 50px;
  max-width: 100%;
  height: 100%;
}

.info-container,
.post-container {
  width: 32%; /* Adjust width to fit three columns */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 100%;
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
  max-width: 100%;
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
  max-width: 100%;
}

.adresse {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

@media screen and (max-width: 981px) {
  .menu {
    display: none;
  }
  .upperthing {
    height: 100px;
    width: 100%;
    background-color: rgb(221, 221, 221);
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    justify-content: space-between;
  }

  .upperthing p {
    font-size: 20px;
    margin: 40px;
  }
  .upperthing img {
    height: auto;
    width: 90px;
    margin: 10px;
  }
  .mobile-text {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
  }
  .mobile-text h3 {
    font-size: 30px;
    margin: 0;
  }
  .mobile-text ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    text-align: left;
    padding: 0;
    margin: 0;
    background-color: transparent;
  }
  .mobile-text li {
    margin: 0px;
  }
  .mobile-text p {
    font-size: 30px;
    border-bottom: 1px solid black;
  }

  .mobile-text .sub {
    font-size: 20px;
    margin-top: 20px;
    border: 0;
  }

  .main-container {
    display: flex;
    margin-top: 40px;
    width: 100%;
  }
  .center {
    display: none;
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

  .container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: auto;
    max-width: 100%;
    min-width: 90%;
  }

  .main-container,
  .info-container {
    width: 100%;
    margin: 10px 0;
    max-width: 100%;
  }

  .post-container{
    display: none;
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

  .container .adresse-container {
    position: relative;
    width: 90%;
    height: auto;
    font-family: "Nunito sans", sans-serif;
    margin: 0 auto;
    max-width: 100%;
  }

  .container .horraire {
    position: relative;
    width: 90%;
    height: auto;
    font-family: "Nunito sans", sans-serif;
    margin: 0 auto;
    max-width: 100%;
  }
}
</style>
