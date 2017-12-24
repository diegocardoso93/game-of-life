<template>
  <div id="app">
    <GameHeader />
    <GameArea />
    <GameFooter />
  </div>
</template>

<script>
import GameHeader from './components/GameHeader'
import GameArea from './components/GameArea'
import GameFooter from './components/GameFooter'

export default {
  name: 'app',
  components: {
    GameHeader,
    GameArea,
    GameFooter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
