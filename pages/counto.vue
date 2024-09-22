<template>
  <body>
    <div class="container">
      <a
        href="https://discords.ca/counto/add"
        @click="handleCountoClick"
        class="counto-link"
      >
        <h1>Count'o</h1>
      </a>
      <h2>Description</h2>
      <p>
        Count'o est un bot discord spécialiser dans le comptage. Il est presque
        entièrement personalisable
      </p>
      <h2>Fonctionnalités</h2>
      <div
        v-for="(feature, index) in features"
        :key="index"
        :class="{
          'feature-box': true,
          even: index % 2 !== 0,
          expanded: feature.expanded,
        }"
        @mouseenter="expandFeature(feature), changeFeatureImage(feature)"
        @mouseleave="shrinkFeature(feature)"
      >
        <div class="feature-content">
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
          <div
            class="feature-image"
            :style="{ backgroundImage: `url(${feature.imageUrl})` }"
          ></div>
          <div v-if="feature.title.startsWith('Mode')" class="mode-buttons">
            <button @click="changeMode(feature, 'Mode classique')">
              Classique
            </button>
            <button @click="changeMode(feature, 'Mode compliqué')">
              Compliqué
            </button>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script lang="javascript">

import Group11Image from '../assets/img/countoMsgEmbed.svg';
import Group12Image from '../assets/img/countoMsgPasEmbed.svg'



export default {

    methods: {

        changeMode(feature, modeTitle) {
            if (feature.title.startsWith('Mode')) {
                if (modeTitle === 'Mode classique') {
                    feature.description = ' Le mode classique est le mode de comptage de base, il permet de compter de 1 en 1. Quand un chiffre est mauvais il est simplement supprimé'
                    feature.title = 'Mode classique';
                } else if (modeTitle === 'Mode compliqué') {
                    feature.description = 'Le mode compliqué est un mode de comptage plus compliqué, il permet de compter de 1 en 1. Quand un chiffre est mauvais il est supprimé et le compteur est remis à 0.'
                    feature.title = 'Mode compliqué';
                }

            }
        },
        handleDiscordLogin() {
            window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=1166494209411399690&redirect_uri=http%3A%2F%2F127.0.0.1%3A5173%2F&response_type=code&scope=identify';

        },

        checkLoginStatus() {

            this.isLoggedIn = true;
            this.user
            console.log("Count'o was checked!")
            console.log(this.user)
        },

        async fetchUserData(accessToken) {
      try {
        const response = await fetch('https://discord.com/api/users/@me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          console.log('User Info:', userData);


        } else {
          console.error('Failed to fetch user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    },

        async handleLoginCallback() {
            const accessToken = "MTE2NjQ5NDIwOTQxMTM5OTY5MA.GlfsZA.Ay0ZPvsjRFtZazyEOqLqYe0OOf10NmkpnsYCSE";
            await this.fetchUserData(accessToken);
        },
        handleCountoClick() {
            console.log("Count'o was clicked!");
        },
        expandFeature(feature) {
            if (feature.title !== "Esthetique") return;
            feature.expanded = true;
            console.log("Feature was expanded!");
        },
        shrinkFeature(feature) {
            feature.expanded = false;
        },

        changeFeatureImage(feature) {
            if (feature.title !== 'Esthetique') {

            } else {
                feature.imageUrl = this.getRandomImage();
            }
        },
        getRandomImage(f) {

            const images = [Group11Image, Group12Image];
            return images[Math.floor(Math.random() * images.length)];

        },
        preventCollapse() {
        },
        allowCollapse(feature) {
            this.shrinkFeature(feature);
        },

    },
    mounted() {
        this.checkLoginStatus();
        console.log("Count'o was mounted!")
    },
    data() {
        return {
            isLoggedIn: false, // Set this to true when the user is logged in
            userProfilePicture: '', // Set this to the user's profile picture URL when the user is logged in
            features: [
                {
                    iconClass: 'fas fa-user-plus',
                    title: 'Esthetique',
                    description: "Count'o te permet de changer l'embed de comptage, le message de comptage, le salon de comptage, le role de comptage",
                    imageUrl: this.getRandomImage(),
                    expanded: false,
                },
                {
                    iconClass: 'fas fa-tachometer-alt',
                    title: 'Mode',
                    description: "Il te permet aussi de choisir parmis diverse mode pour compter pour rendre l'experience plus fun!",
                    expanded: false,
                },
            ],
        };
    },

};
</script>

<style scoped lang="css">
body {
  font-family: "Nunito sans", sans-serif;
  background: linear-gradient(135deg, #188b76, #188b76ab);
  color: #ffffff;
  min-height: 100vh;
}

.top-right {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
}

.profile-picture {
  width: 40px;
  /* Adjust the size as needed */
  height: 40px;
  border-radius: 50%;
  /* Assuming the profile picture is circular */
  /* Other styles */
}

.mode-buttons {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.mode-buttons button {
  transition: all 0.5s ease;
  color: #ffffff;
  border: 2px solid black;
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
  text-align: center;
  line-height: 1;
  margin-left: 10px;
  font-size: 17px;
  background-color: transparent;
  padding: 10px;
  outline: none;
  border-radius: 4px;
}

.mode-buttons button:hover {
  color: #000000;
  background-color: #188b76;
}

.counto-link {
  text-decoration: none;
  color: inherit;
}

/* Hover effect for the anchor tag */

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 10vw;
  font-weight: 900;
  color: #f0f0f0;
  text-align: center;
  margin-bottom: 20px;
  transition: color 0.3s ease-in-out;
}

h1:hover {
  color: #8c00ff36;
}

.feature-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 1.125rem;
  border: 2px solid #000;
  background: #1d675a;
  margin-bottom: 20px;
  height: auto;
  max-height: 210px;
  min-height: 210px;
  overflow: hidden;
  transition: 0.5 ease-in-out;
}

.feature-icon {
  font-size: 32px;
  color: #f0f0f0;
}

.feature-content {
  opacity: 1;
  flex: 1;
  position: relative;
  transition: opacity 0.3s ease-in-out;
  /* Add transition for opacity */
}

.feature-title {
  font-size: 24px;
  color: #ffffff;
  opacity: 1;
  margin-bottom: 10px;
  transition: opacity 0.3s ease-in-out;
  /* Add transition for opacity */
}

.feature-description {
  font-size: 16px;
  color: #ffffff;
  line-height: 1.5;
  transition: opacity 0.3s ease-in-out;
  /* Add transition for opacity */
}

.feature-image {
  position: absolute;
  top: 0%;
  left: 0;
  width: 100%;
  height: 150px;
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: center;
  transition: top 0.3s ease-in-out, opacity 0.3s ease-in-out;
  pointer-events: none;
  opacity: 0;
}

.expanded {
  height: 100000000px;
}

.feature-box.expanded .feature-description,
.feature-box.expanded .feature-title {
  opacity: 0;
  /* Hide the text */
}

.feature-box.expanded .feature-image {
  opacity: 1;
  top: 0;
}

.feature-box:not(:hover) .feature-image {
  opacity: 0;
  bottom: 10px;
}
</style>
