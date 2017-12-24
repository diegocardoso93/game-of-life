<template>
  <footer className="App-footer">
    <strong className="Footer-text">
      Game of Life - a vue experiment &nbsp;
      <a href="https://github.com/diegocardoso93/game-of-life"
         target="_blank"
         rel="noopener noreferrer">source</a>
    </strong>
  </footer>
</template>

<script>
export default {
  name: 'GameFooter'
}
</script>

<style scoped>

.App-footer {
  background-color: #000000;
  height: 30px;
  padding: 20px;
}

.Footer-text {
  color: aliceblue;
  padding-left: 20px;
  font-size: 14px;
}

</style>
