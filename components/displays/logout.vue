<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <button @click="logout">logout</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async logout() {
      sessionStorage.clear()

      location.reload()
    }
  }
}
</script>

<style scoped>
</style>
