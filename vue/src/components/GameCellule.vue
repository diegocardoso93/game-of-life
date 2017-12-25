<template>
  <div class="Game-cellule" v-bind:class="[isAlive ? 'Cellule-live' : 'Cellule-dead', '']" @click="toggleState()"> </div>
</template>

<script>
import LifeState from '../GameLifeState';

export default {
  name: 'GameCellule',
  props: [],

  created() {
    this.temp_life_state = LifeState.Dead;
    this.life_state = LifeState.Dead;
    this.isAlive = false;
    this.$parent.$on('gameStateUpdated', this.setGameState);
  },

  methods: {

    is_alive() {
      return this.life_state === LifeState.Live;
    },

    temp_is_alive() {
      return this.temp_life_state === LifeState.Live;
    },

    update_temp_state() {
      this.temp_life_state = this.life_state;
    },

    count_live_neighbor(neighbors) {
      let count_live = 0;
      for (let neighbor of neighbors) {
        if (neighbor.temp_is_alive()) {
          count_live++;
        }
      }
      return count_live;
    },

    is_loneliness(neighbors) {
      return this.count_live_neighbor(neighbors) < 2;
    },

    is_overpopulation(neighbors) {
      return this.count_live_neighbor(neighbors) > 3;
    },

    revive(neighbors) {
      return this.count_live_neighbor(neighbors) === 3;
    },

    changeState(life_state) {
      this.life_state = life_state;
      this.isAlive = life_state == LifeState.Live;
    },

    toggleState() {
      if (this.is_alive()) {
        this.changeState(LifeState.Dead);
      } else {
        this.changeState(LifeState.Live);
      }
    }
  },

  data: function() {
    return {
      isAlive: false
    }
  }
}
</script>

<style scoped>

.Game-cellule {
  float: left;
  width: 8px;
  height: 8px;
  border: 1px solid #ccc;
}

.Cellule-dead {
  background-color: white;
}

.Cellule-live {
  background-color: black;
}

</style>
