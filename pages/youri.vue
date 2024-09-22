<template>
  <div class="page">
    <div class="top-container">
      <div class="top-bg">
        <img
          src="../assets/img/PageYouriTop.jpg"
          alt="img"
          class="top-bg-img"
        />
      </div>
      <div class="info">
        <h1 class="title">Youri Belanger</h1>
        <div class="fullstack">
          <h2>Developpeur fullstack</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
            magni! Necessitatibus culpa quaerat provident quo odit cupiditate ut
            inventore quidem unde error officia, alias deleniti at assumenda,
            iure fugiat? Iste velit consequuntur ea quibusdam perferendis,
            consequatur, blanditiis commodi nobis omnis, odit quisquam vel vero!
            Pariatur reiciendis deleniti doloribus assumenda vero.
          </p>
        </div>
      </div>
    </div>
    <div class="idea-wrapper">
      <div class="idea">
        <div class="idea-info">
          <h2 class="idea-h2">Vous avez un projet?</h2>
          <p>
            Chaque projet mérite d’avoir sa propre page web pour le mettre en
            valeur. Une page web permet aussi d’afficher les informations pour
            que de potentiel clients puisse s’y retrouvé facilement.
          </p>
        </div>
        <div class="gradient">
          <img
            src="../assets/img/PageYouriClient.jpg"
            alt="img"
            class="idea-img"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  transition: all 0.5s ease;
  max-width: 1920px;
  min-height: 100vh;
  margin: 0 auto;
}

.top-container {
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease;
  width: 100%;
  margin: 0 auto;
}

.top-bg {
  width: 100%;
  max-width: 1920px;
  height: 40rem;
  position: absolute;
  overflow: hidden;
  z-index: -1;
}

.top-bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1)
  );
  z-index: 1;
}

.top-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-width: 100rem;
  overflow: hidden;
  position: relative;
  z-index: 0;
}

.info {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  padding-left: 0;
  padding-right: 0;
  margin-top: 3rem;
  transition: all 0.5s ease;
}

.title {
  font-size: 100px;
  font-family: "QuickSand", sans-serif;
  color: rgb(0, 0, 0);
  transition: all 2s ease;
  width: 450px;
  margin-left: 10%;
  transition: none;
}

.fullstack {
  position: relative;
  font-size: 2rem;
  font-family: "QuickSand", sans-serif;
  color: rgb(0, 0, 0);
  transition: all 2s ease;
  max-width: 650px;
  height: auto;
  padding: 20px;
  display: flex;
  margin-left: 10%;
  margin-right: 2%;
  flex-direction: column;
  text-align: start;
  transition: all 0.5s ease;
}

.fullstack p {
  font-size: 30px;
  margin-top: 22px;
}

.fullstack h2 {
  font-size: 60px;
  font-weight: 200;
}

.idea-wrapper {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  color: rgb(0, 0, 0);
  font-family: "QuickSand", sans-serif;
  font-size: 2rem;
  margin-top: 2rem;
}

.idea {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-bottom: 4rem;
  padding: 10px;
  min-height: 30rem;
  height: auto;
  z-index: 1;
}
.idea-info {
  display: flex;
  flex-direction: column;
  text-align: start;
  min-height: 400px;
  justify-content: center;
  height: auto;
  width: 35rem;
  margin-left: 10%;
  padding: 10px;
}

.idea-h2 {
  transition: all 0.2s ease;
}
.idea-h2:hover {
  animation: gradient 3s linear;
}

@keyframes gradient {
  0% {
    color: rgb(0, 0, 0);
  }
  50% {
    color: rgb(39, 70, 156);
  }
  100% {
    color: rgb(39, 70, 156);
 
  }
}
.gradient {
  width: 30%;
  height: auto;
  position: absolute;
  overflow: hidden;
  top: 20%;
  right: 0;
  z-index: 0;
  margin: 0;
}

.gradient::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1)
  );
  z-index: 1;
}

.idea-img {
  width: 100%;
  min-width: none;
  height: 100%;
  object-fit: fill;
  overflow: hidden;
  position: relative;
  z-index: 0;
}

@media (max-width: 1467px) {
  .info {
    justify-content: center;
    text-align: center;
  }

  .title,
  .fullstack {
    margin-left: 0;
    margin-right: 0;
  }

  .title {
    max-width: 450px;
    width: 90%;
    font-size: 80px;
    height: auto;
    text-align: start;
    align-items: center;
    justify-content: center;
  }

  .fullstack {
    width: 100%;
    padding: 0 10px;
    text-align: center;
  }

  .idea {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow: hidden;
    padding: 0;
  }

  .idea-info {
    width: 90%;
    margin-left: 0;
    margin-right: 0;
    padding: 0;
  }

  .gradient {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 20%;
    overflow: hidden;
  }

  .gradient::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0),
      rgb(255, 255, 255)
    );
    z-index: 1;
    overflow: hidden;
  }

  .idea-img {
    position: relative;
    z-index: 0;
    overflow: hidden;
  }
}
</style>
