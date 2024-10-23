<template>
  <div class="info">
    <div class="phone-number">
      <p class="number" @click="HandleCopyPhone"
        :class="{ 'number--show': !showClipboardIcon, 'number': showClipboardIcon }">
        <i class="fas fa-phone"></i> {{ phone }}
      </p>
      <div class="clipboard-icon" :class="{ 'clipboard-icon--show': showClipboardIcon }">
        <p>📋</p>
      </div>
    </div>
    <div class="google-map">
      <p class="mice" @click="HandleRedirectGoogleMap">
        <i class="fas fa-map-marker-alt"></i> {{ location }}
      </p>
    </div>
  </div>
  <div class="reseau-social">
    <div class="messenger">
      <p class="mice" @click="HandleMessengerClick">
        <i class="fab fa-facebook-messenger"></i>
      </p>
    </div>
    <div class="facebook">
      <p class="mice" @click="HandleFacebookClick">
        <i class="fab fa-facebook"></i>
      </p>
    </div>
    <div class="instagram">
      <p class="mice" @click="HandleInstagramClick">
        <i class="fab fa-instagram"></i>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showClipboardIcon: false, // Initially set to false
      location: "515 montée Masson, Mascouche",
      phone: "(450) 474-7774",
      mapLink: "https://www.google.com/maps/place/515+montée+Masson,+Mascouche",
    };
  },
  methods: {
    HandleCopyPhone() {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        this.showClipboardIcon = true;
        navigator.clipboard.writeText(this.phone)
          .then(() => {
            setTimeout(() => {
              this.showClipboardIcon = false;
            }, 1000); // Hide icon after 1 second
          })
          .catch(err => {
            console.error('Failed to copy: ', err);
            this.showClipboardIcon = false;
          });
      } else {
        console.warn('Clipboard API is not available.');
        this.showClipboardIcon = false;
      }
    },
    async getLocation() {
      const place = window.location.search.split("?")[1];
      if (!place) {
        try {
          const closestLocation = await getClosestLocation();
          if (closestLocation.place) {
            window.history.pushState({}, "", `?${closestLocation.place}`);
            this.getInfo(closestLocation.place);
          }
        } catch (error) {
          console.error("error" + error);
        }
      } else {
        this.getInfo(place);
      }
    },
    getInfo(place) {
      if (place === "st-zotique") {
        this.location = "332 rue Principale, st-zotique";
        this.phone = "(450) 217-1550";
        this.mapLink =
          "https://www.google.com/maps/place/332+rue+Principale,+st+zotique";
      } else if (place === "valleyfield") {
        this.location = "45 rue Alphonse desjardins, Valleyfield";
        this.phone = "(450) 370-4445";
        this.mapLink =
          "https://www.google.com/maps/place/45+rue+Alphonse+desjardins";
      } else if (place === "mascouche") {
        this.location = "515 montée Masson, Mascouche";
        this.phone = "(450) 474-7774";
        this.mapLink =
          "https://www.google.com/maps/place/515+montée+Masson,+Mascouche";
      }
    },
    HandleRedirectGoogleMap() {
      window.location.href = this.mapLink;
    },
    HandleMessengerClick() {
      window.location.href =
        "https://www.facebook.com/messages/t/Liquidationmarieinc/";
    },
    HandleFacebookClick() {
      window.location.href = "https://www.facebook.com/Liquidationmarieinc/";
    },
    HandleInstagramClick() {
      window.location.href = "https://www.instagram.com/liquidationmarie/";
    },
  },
  mounted() {
    this.getLocation();
  },
};
</script>

<style scoped lang="css">
* {}

.info {
  display: flex;
  align-items: start;
  flex-direction: column;
}

.reseau-social {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: start;
  width: 90%;
  margin-left: 20px;
}

.reseau-social p {
  font-size: 50px;
  text-align: center;
}

.google-map,
.phone-number {
  max-height: 150px;
  align-content: center;
  justify-content: center;
  text-align: start;
  padding: 10px;
  margin-left: 20px;
}


.instagram,
.facebook,
.messenger,
.google-map,
.phone-number {
  transition: 0.3s ease-in-out;
  font-size: 30px;
}

.messenger:hover {
  background: linear-gradient(120deg, #0084ff, #ffffff);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.facebook:hover {
  color: #3b5998;
}

.instagram:hover {
  background: linear-gradient(45deg,
      #833ab4,
      #fd1d1d,
      #fcb045,
      #e1306c,
      #c13584,
      #833ab4);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.google-map:hover {
  background: linear-gradient(45deg, #4285f4, #34a853, #fbbc05, #ea4335);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}


.number {
  position: relative;
  transition: all 0.3s ease-in-out;
  right: -10000px;
  cursor: pointer;
}

.number--show {
  position: relative;
  transition: all 0.3s ease-in-out;
  right: 0;
}

.phone-number:hover {
  color: #339443;
}

.mice {
  cursor: pointer;
}

.clipboard-icon {
  font-size: 0px;
  position: absolute;
  transition: all 0.3s ease-in-out;
  align-items: center;
  justify-content: center;
  right: -50%;
  top: 50%;
  transform: translate(-50%, -100%);
}

.clipboard-icon--show {
  transition: all 0.3s ease-in-out;
  font-size: 60px;
  position: absolute;
  align-items: center;
  justify-content: center;
  right: 50%;
  top: 50%;
  transform: translate(50%, -100%);
}

@media screen and (max-width: 981px) {
  .reseau-social p {
    font-size: 70px;
    text-align: center;
    margin: 10px;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    width: 90%;
  }

  .google-map,
  .phone-number {
    transition: 0.3s ease-in-out;
    font-size: 30px;
    width: 100%;
  }

  .instagram {
    background: linear-gradient(45deg,
        #833ab4,
        #fd1d1d,
        #fcb045,
        #e1306c,
        #c13584,
        #833ab4);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .facebook {
    color: #3b5998;
  }

  .messenger {
    background: linear-gradient(120deg, #0084ff, #ffffff);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .google-map p {
    color: black;
  }

  .google-map i {
    background: linear-gradient(45deg, #4285f4, #34a853, #fbbc05, #ea4335);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .phone-number {
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: row-reverse;
  }



  .phone-number i {
    color: #339443;
  }
}
</style>
