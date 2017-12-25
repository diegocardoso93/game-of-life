<template>
  <section class="Game-area">
    <GameOfLife :cellulesWidth="50" :cellulesHeight="40"></GameOfLife>
    <GameButtons :clickAction="changeGameState"></GameButtons>
  </section>
</template>

<script>
import GameButtons from './GameButtons'
import GameOfLife from './GameOfLife'

export default {
  name: 'GameArea',
  components: {
    GameOfLife,
    GameButtons
  },
  methods: {
    changeGameState(gameState) {
      this.$emit('gameStateUpdated', gameState);
    }
  }
}
</script>

<style scoped>

.Game-area {
  width: 94%;
  height: 510px;
  max-width: 500px;
  margin: 0 auto;
}

</style>
