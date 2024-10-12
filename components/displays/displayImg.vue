<template>
  <div v-if="noImage">
    <h1>There are no images</h1>
  </div>
  <div v-else>
    <h1>Images</h1>
    <div class="image-container">
      <div v-for="image in images" :key="image.id" class="image-wrapper">

        <div class="image-placeholder" v-if="image.fileExtension === 'mp4' || image.error" style="display: none"></div>

        <img :src="`data:image/${image.fileExtension};base64,${image.base64}`" alt="image" class="image" loading="lazy"
          @error="handleImageError" />

        <div class="info">
          <p class="filename" @click="
            copyToClipboard(
              `https://cdn.discords.ca/${image.fileName}.${image.fileExtension}`
            )
            " style="cursor: pointer">
            <i class="fas fa-search"></i> {{ truncateFilename(image.fileName) }}
          </p>
          <p class="filename">
            <i class="fas fa-database"></i> {{ imageSize(image.base64) }} K
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      noImage: true,
      images: [],
      amount: 10, // Load 20 images at a time
      offset: 0, // Start from the first image
      isLoading: false, // To prevent multiple requests at the same time
    };
  },
  methods: {
    async getImages() {
      const runtimeConfig = useRuntimeConfig();

      if (this.isLoading) return; // Prevent fetching if already loading

      this.isLoading = true;

      try {
        const response = await fetch(
          `${runtimeConfig.public.API_BASE_URL}/image/download`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: sessionStorage.getItem("username"),
              amount: this.amount, // Send amount of images to load
              offset: this.offset, // Send offset for pagination
            }),
          }
        );
        if (response.ok) {
          const imageData = await response.json();
          this.noImage = false;

          // Append new images to the existing array

          console.log(imageData)
          this.images = [...this.images, ...imageData];

          // Increase offset for the next batch
          this.offset += this.amount;
        } else {
          console.error("No images");
        }
      } catch (error) {
        console.error("Error during fetching:", error);
      }

      this.isLoading = false; // Reset loading state
    },

    // Check if the user has scrolled to the bottom
    handleScroll() {
      const scrollableElement = document.documentElement;
      const atBottom =
        scrollableElement.scrollHeight - scrollableElement.scrollTop <=
        scrollableElement.clientHeight + 1000;
      if (atBottom && !this.isLoading) {
        this.getImages(); 
      }
    },

    imageSize(b64) {
      const char = atob(b64);
      var byteArray = new ArrayBuffer(char.length);
      var byteNumbers = new Array(char.length);

      for (let i = 0; i < char.length; i++) {
        byteNumbers[i] = char.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      var blob = new Blob([byteArray]);

      var fileSize = blob.size;

      var size = fileSize / 1024;
      // Rounding off the size to 2 decimal places
      size = Math.round(size * 100) / 100;

      return size;
    },

    copyToClipboard(text) {
      navigator.clipboard.writeText(text);
    },
    truncateFilename(filename) {
      const maxLength = 15; // Adjust as needed
      console.log(filename)
      return filename.length > maxLength
        ? filename.slice(0, maxLength) + "..."
        : filename;
    },
    handleImageError(image) {
      image.error = true;
    },
  },
  mounted() {
    this.getImages(); // Load the first batch of images
    window.addEventListener("scroll", this.handleScroll); // Add scroll listener
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll); // Clean up listener
  },
};

</script>

<style scoped>
h1 {
  font-family: "Quicksand", sans-serif;
}

p {
  font-family: "Quicksand", sans-serif;
}

.image-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
  align-items: center;
}

.image-placeholder {
  width: 200px;
  height: 200px;
  background-color: grey;
}

.image-wrapper {
  position: relative;
  margin-bottom: 10px;
  display: flex;
  height: 250px;
  width: 300px;
  background-color: rgb(78, 78, 78);
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.image {
  width: 150px;
  height: 150px;
  object-fit: contain;
  margin-bottom: 10px;
}

.filename {
  position: relative;
  color: white;
  padding: 5px;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}

.info {
  display: flex;
  position: relative;
  top: 15px;
  flex-direction: row;
  background-color: rgba(87, 116, 116, 0.651);
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
