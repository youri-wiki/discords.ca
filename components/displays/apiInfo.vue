<template>
  <h1>API</h1>
  <div>
    <p>Key <i class="fas fa-hashtag"></i>{{ key }}</p>
  </div>
  <div class="shareX">
    <h1>How to Setup ShareX</h1>
    <p>1. Start by opening shareX (easy step)</p>
    <p>
      2. Click on <strong>Destination</strong> and then
      <strong>Custom uploader settings</strong>
    </p>
    <img src="https://discords.ca/api/image/s7lv0u8.png" alt="ShareX1" />
    <p>3. In the left upper corner, click on <strong>New</strong></p>
    <img
      src="https://discords.ca/api/image/m2lyny1.png"
      alt="ShareX2"
      style="height: 400px; width: auto"
    />
    <p>
      4. Change the name for whatever you want, it doesn't matter, set the
      destination type to <strong>image uploader</strong>
    </p>
    <p>
      5. Set the method to <strong>post</strong> and inster the Url to your API
      (the one that we made earlier). and add /upload at the end
    </p>
    <p>
      6. In the body part, add a data called <strong>secret</strong>, with the
      value of your choice, need to be the same as the one you put in the code,
      in your case <strong>{{ key }}</strong>
    </p>
    <p>
      7. Finally, For the <strong>File form name</strong>, put
      <strong>sharex</strong>
    </p>
    <p>It should look like this...</p>
    <img
      src="https://cdn.discords.ca/b6byoe4.png"
      alt="ShareX3"
      style="height: 400px; width: auto"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      key: "",
    };
  },
  methods: {
    async createKey() {
      const runtimeConfig = useRuntimeConfig();

      try {
        const response = await fetch(
          `${runtimeConfig.public.API_BASE_URL}/user/create/key/${this.username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const json = await response.json();
          const key = json.key;
          this.key = key;
          sessionStorage.setItem("key", key);
        } else {
          // Handle createKey failure
          console.error("createKey failed");
        }
      } catch (error) {
        console.error("Error during createKey:", error);
      }
    },
  },
  async mounted() {
    this.username = sessionStorage.getItem("username");
    await this.createKey();
    this.key = sessionStorage.getItem("key");
    console.log(import.meta.env.VITE_API_URL);
  },
};
</script>

<style scoped>
h1 {
  font-size: 30px;
  font-weight: bold;
  font-family: "Quicksand", sans-serif;
}
p {
  font-size: 20px;
  font-family: "Quicksand", sans-serif;
}

.shareX p {
  font-size: 18px;
  font-family: "Quicksand", sans-serif;
}
</style>
