<template>
  <div class="App-header">
    <img src="favicon.ico" class="App-logo" alt="logo" />
    <h1 class="App-title">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'GameHeader',
  data () {
    return {
      title: 'Game of Life'
    }
  }
}
</script>

<style scoped>

.App-logo {
  animation: App-logo-scale infinite 4s linear;
  height: 80px;
  width: 80px;
}

.App-header {
  background-color: #000;
  height: 130px;
  padding: 20px;
  color: aliceblue;
}

.App-title {
  font-size: 24px;
}

@keyframes App-logo-scale {
  from { transform: scale(0.8); }
  to { transform: scale(1.2); }
}

</style>
