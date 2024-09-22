<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <iframe
    id="mapIframe"
    src=""
    style="border: 0"
    loading="lazy"
    class="hidden-map"
  ></iframe>
</template>
<script>
export default {
  data() {
    return {
      mapLink:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2784.877053399117!2d-73.6136361!3d45.733560399999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc8dd1052dfdc99%3A0x460ac98398bbff3f!2s515%20Mnt%20Masson%2C%20Mascouche%2C%20QC%20J7K%202L6!5e0!3m2!1sfr!2sca!4v1717715964970!5m2!1sfr!2sca",
    };
  },
  methods: {
    async getLocation() {
      const place = window.location.search.split("?")[1];
      if (!place) return "mascouche";
      return place;
    },
    getMap(place) {
      if (place === "mascouche") {
        this.mapLink =
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2784.877053399117!2d-73.6136361!3d45.733560399999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc8dd1052dfdc99%3A0x460ac98398bbff3f!2s515%20Mnt%20Masson%2C%20Mascouche%2C%20QC%20J7K%202L6!5e0!3m2!1sfr!2sca!4v1717715964970!5m2!1sfr!2sca";
      } else if (place === "valleyfield") {
        this.mapLink =
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2808.486915448448!2d-74.12872589999999!3d45.258167199999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc94e2e34173be3%3A0xee3b21d711746642!2s45%20Rue%20Alphonse-Desjardins%2C%20Salaberry-de-Valleyfield%2C%20QC%20J6S%202M2!5e0!3m2!1sfr!2sca!4v1717716180181!5m2!1sfr!2sca";
      } else if (place === "st-zotique") {
        this.mapLink =
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2808.7221772765783!2d-74.2253657!3d45.2534105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc95262ca4e5c15%3A0x29eb893d33e74eaf!2s332%20Rue%20Principale%2C%20Saint-Zotique%2C%20QC%20J0P%201Z0!5e0!3m2!1sfr!2sca!4v1717716261421!5m2!1sfr!2sca";
      }
    },
    //make a methode to add an iframe to the page with the mapLink as src
    addIframe() {
      const iframe = document.getElementById("mapIframe");
      iframe.src = this.mapLink;
    },
  },
  mounted() {
    this.getLocation().then((place) => {
      this.getMap(place);
      this.addIframe();
    });
  },
};
</script>
<style scoped>
.hidden-map {
  width: 40rem;
  height: 30rem;
  border: 0;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 981px) {
  .hidden-map {
    width: 100%;
    height: auto;
    height: 30rem;
  }
}
</style>
