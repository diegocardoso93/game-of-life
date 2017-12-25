<template>
  <div class="Game-buttons">
    <button @click="clickAction('random')" value="Random">Random</button>
    <button @click="clickAction('start')" value="Start">Start</button>
    <button @click="clickAction('stop')" value="Stop">Stop</button>
    <button @click="clickAction('reset')" value="Reset">Reset</button>
  </div>
</template>

<script>
export default {
  name: 'GameButtons',
  props: {
    clickAction: {
      type: Function,
      required: true
    }
  }
}
</script>

<style scoped>

.Game-buttons {
  width: 100%;
  margin-top: 20px;
}

</style>
