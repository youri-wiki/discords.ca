<template>
  <div>
    <aside class="side-menu" :class="{ 'side-menu--open': isOpen }">
      <div class="side-menu__content">
        <h1>Randoms <i class="fas fa-level-down-alt"></i></h1>
        <ul>
          <li><a href="?home">Home</a></li>
          <li><a href="?who">Who ?</a></li>
          <li><a href="?what">What ?</a></li>
          <li><a href="?snake">Snake</a></li>
        </ul>
      </div>
    </aside>
    <div class="side-menu__overlay" @click="closeMenu" v-if="isOpen"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    closeMenu() {
      this.isOpen = false;
    },
  },
};
</script>

<style scoped>
.side-menu {
  position: fixed;
  top: 0;
  left: -300px; 
  width: 300px;
  height: 100%;
  background-color: #fff;
  transition: left 0.3s ease;
  z-index: 1000;
}

.side-menu--open {
  left: 0;
}

.side-menu__content {
  padding: 20px;

}

.side-menu i {
  position: relative;
  top: 8px;
  font-size: 20px;
}

.side-menu a {
  display: block;
  font-size: 18px;
  padding: 10px 0;
  color: #333;
  text-decoration: none;
  border-bottom: 1px solid #ccc;
  margin-left: 10px
}

.side-menu ul {
  position: relative;
  left: 20px;
}

.side-menu li {
  transition: all 0.3s ease-in-out;
  list-style: none;
  border-radius: 10px;
  position: relative;
  right: 20px;

}

.side-menu li:hover {
  background-color: #85858581;
  border-radius: 10px 0px 0px 10px;
  right: 0px;
}



.side-menu__overlay {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
@media screen and (max-width: 981px) {
}
</style>
