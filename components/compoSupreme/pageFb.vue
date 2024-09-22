<template>
  <div class="container">
    <h3 class="rolling-color">Le prix avant tout</h3>
    <iframe
      src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FLiquidationmarieinc&tabs=timeline&width=300&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=922128692136481"
      width="300"
      height="500"
      style="border: none; overflow: hidden; margin:  auto; display: block;"
      scrolling="no"
      frameborder="0"
      allowfullscreen="true"
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
    ></iframe>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 350px;
  max-height: 700px;
  margin: 0 auto;
}

.rolling-color {
  text-align: center;
  color: #000000;
  font-size: 2.2rem;
  animation: roll 5s linear infinite;
}

.page {
  width: 300px;
  height: 500px; 
  background-color: aquamarine;
  

}

@keyframes roll {
  0% {
    color: green;
  }
  50% {
    color: red;
  }
  100% {
    color: green;
  }
}

@media screen and (max-width: 981px) {
  .container {
    display: none;
  }
  .page {
    display: none;
  }
  .rolling-color {
    display: none;
  }
}
</style>
