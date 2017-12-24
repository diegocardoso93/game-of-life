<template>
  <section class="Game-area">
    header works
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
