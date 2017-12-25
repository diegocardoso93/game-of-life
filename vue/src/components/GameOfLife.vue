<template>
  <div class="Game-of-life">
    <span v-for="cellVec in cellulesRef">
      <span v-for="cellule in cellVec">
        <GameCellule ref="cellulesRef" ></GameCellule>
      </span>
    </span>
  </div>
</template>

<script>
import GameCellule from './GameCellule'
import LifeState from '../GameLifeState'

export default {

  name: 'GameOfLife',

  components: {
    GameCellule
  },

  props: {
    cellulesWidth: [String, Number],
    cellulesHeight: [String, Number]
  },

  created() {
    this.cellulesRef = Array.from(new Array(this.cellulesHeight),(v,i) => Array.from(new Array(this.cellulesWidth),(val,index) => 0));
    this.cellulesArray = Array.from(new Array(this.cellulesHeight),(v,i) => Array.from(new Array(this.cellulesWidth),(val,index) => []));
    this.$parent.$on('gameStateUpdated', this.setGameState);
  },

  mounted() {
    this.cellulesRef = this.$refs.cellulesRef;
    this.mapCellulesToArray();
  },

  methods: {

    mapCellulesToArray() {
      let row = 0; let col = 0;
      this.cellulesRef.map((item) => {
        this.cellulesArray[row][col] = item;
        col++;
        if (col === this.cellulesWidth) {
          row++;
          col = 0;
        }
      })
    },

    random_mutate() {
      this.fill_cellules('random');
    },

    trigger_reset() {
      this.fill_cellules(LifeState.Dead);
    },

    fill_cellules(generator) {
      for (let x=0;x<this.cellulesHeight;x++) {
        for (let y=0;y<this.cellulesWidth;y++) {
          this.cellulesArray[x][y].changeState(generator === 'random' ? Math.round(Math.random()) : generator);
        }
      }
    },

    commute() {
      for (let row=0;row<this.cellulesHeight;row++) {
        for (let col=0;col<this.cellulesWidth;col++) {
          this.cellulesArray[row][col].update_temp_state();
        }
      }
      for (let row=0;row<this.cellulesHeight;row++) {
        for (let col=0;col<this.cellulesWidth;col++) {
          let neighbors = [];
          if (row>0 && col>0) {
            neighbors.push(this.cellulesArray[row-1][col-1]);
            neighbors.push(this.cellulesArray[row][col-1]);
            neighbors.push(this.cellulesArray[row-1][col]);
          }
          if (row<this.cellulesHeight-1 && col<this.cellulesWidth-1) {
            neighbors.push(this.cellulesArray[row+1][col+1]);
            neighbors.push(this.cellulesArray[row][col+1]);
            neighbors.push(this.cellulesArray[row+1][col]);
          }
          if (row>0 && col<this.cellulesWidth-1) {
            neighbors.push(this.cellulesArray[row-1][col+1]);
          }
          if (row<this.cellulesHeight-1 && col>0) {
            neighbors.push(this.cellulesArray[row+1][col-1]);
          }
          if (this.cellulesArray[row][col].is_alive()) {
            if (this.cellulesArray[row][col].is_loneliness(neighbors) || this.cellulesArray[row][col].is_overpopulation(neighbors)) {
              this.cellulesArray[row][col].changeState(LifeState.Dead);
            }
          } else if (this.cellulesArray[row][col].revive(neighbors)) {
            this.cellulesArray[row][col].changeState(LifeState.Live);
          }
        }
      }
    },

    play() {
      this.updateRate = setInterval(() => {
        this.commute();
      }, 50);
    },

    stop() {
      clearInterval(this.updateRate);
    },

    setGameState(gameState) {
      switch (gameState) {
        case 'random': this.random_mutate(); break;
        case 'start': this.play(); break;
        case 'stop': this.stop(); break;
        case 'reset': this.trigger_reset(); break;
      }
    }
  }
}
</script>

<style scoped>

.Game-of-life {
  background-color: aliceblue;
  height: 400px;
  width: 100%;
  overflow: hidden;
}

</style>
