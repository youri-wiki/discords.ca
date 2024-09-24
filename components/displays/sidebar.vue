<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="space">
    <div class="sidebar">
      <ul>
        <li @click="changeView('home')" style="cursor: default">
          <i class="fas fa-home"></i> Home
        </li>
        <li @click="changeView('data')" style="cursor: default">
          <i class="fas fa-file-image"></i> Data
        </li>
        <li @click="changeView('api')" style="cursor: default">
          <i class="fas fa-server"></i> API
        </li>
        <li @click="changeView('logout')"><i class="fas fa-sign-out-alt"></i> Logout</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    changeView(view) {
      if (view === 'logout') {
        sessionStorage.clear()
        location.reload()
        return
      }
      sessionStorage.setItem('view', view)
      this.$emit('viewChanged', view)
    }
  }
}
</script>
<style scoped>
.space {
  display: flex;
  height: 100vh;
  width: 200px;
}

.sidebar {
  font-family: 'Quicksand', sans-serif;
  font-size: 20px;
  width: 200px;
  background-color: #969696;
  height: 100%;
}

ul {
  list-style-type: none;
  padding: 0;
  margin-top: 100px;
}

li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  transition: background-color 0.3s ease;
}

li:hover {
  background-color: #ccc;
  cursor: pointer;
}

li:last-child {
  border-bottom: none;
}
</style>
