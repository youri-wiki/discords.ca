<template>
  <div class="banner">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1>Nouveau produit chaque jour !!!</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.banner {
  padding: 2rem 0;
  margin-top: 1rem;
  border-radius: 10px;
}

.container {
  background-color: #3caf38;
  width: 90%;
  padding: 10px;
  max-width: 800px;
  height: 100px;
  margin: 0 auto;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 10px;

}



h1 {
  color: #fff;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

p.rolling-color {
  color: #fff;
  font-size: 1.2rem;
  animation: roll 5s linear infinite;
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
  .banner {
    display: none;
  }
}

</style>
