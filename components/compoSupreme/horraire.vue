<template>
  <div class="container">
    <h3 class="title">Horraire</h3>
    <div class="schedule-columns">
      <div v-for="(value, day) in horraire" :key="day" class="schedule-item">
        <p class="days">{{ day }}</p>
        <p class="hours">{{ value }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      horraire: {},
    };
  },
  methods: {
    getLocation() {
      const place = window.location.search.split("?")[1];
      this.getSchedule(place);
    },
    getSchedule(place) {
      if (place === "valleyfield") {
        this.horraire = {
          "Lundi - Mardi - Mercredi": "10:00 - 17:00",
          "Jeudi - Vendredi": "10:00 - 20:00",
          "Samedi - Dimanche": "10:00 - 17:00",
        };
      } else {
        this.horraire = {
          "Lundi - Mardi - Mercredi": "10:00 - 17:00",
          "Jeudi - Vendredi": "10:00 - 19:00",
          "Samedi - Dimanche": "10:00 - 17:00",
        };
      }
    },
  },
  mounted() {
    this.getLocation();
  },
};
</script>

<style scoped>
* {
}


.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;

}
h3.title {
  font-size: 30px;
  margin-bottom: 2rem;
}

.schedule-columns {
  position: relative;
  font-weight: bold;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  box-sizing: border-box;

}

.schedule-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 75px;
  border-radius: 10px;
  box-sizing: border-box;
  color: #616161;
}

.schedule-item .days {
  font-size: 20px;
  margin: 0;
  font-weight: bold;
}
.schedule-item .hours {
  margin: 0;
  font-size: 20px;
}

@media screen and (max-width: 981px) {
  h3.title {
    font-size: 50px;
  }
}
</style>
