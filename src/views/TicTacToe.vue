<template>
  <div>
    <h1>TicTacToe</h1>
    <v-container>
      <p>
        <v-select 
          variant="solo" 
          label="게임하기" 
          v-model="playerSelect" 
          @update:modelValue="handlePlayer" 
          :items="['친구','컴퓨터']"
          :disabled="ticTacToe.some(v => v.some(t => t))"
        />
      </p>
      <h3>
        차례 : {{ randomTurn === null ? '' : randomTurn ? '나' : playerSelect }}
      </h3>
      <h2>
        {{ result }} <v-btn v-if="result" @click="onReset">다시하기</v-btn>
      </h2>
      <v-row v-for="(boards, idxs) in ticTacToe" :key="idxs" class="tic-tac-toe-board" no-gutters justify="center">
        <v-col v-for="(board, idx) in boards" :key="idx" cols="1" @click="() => { disableBoard ? null : clickBoard(idxs, idx)}">{{ board }}</v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { watch, defineComponent, ref, type Ref } from 'vue'

export default defineComponent({
  name: 'TicTacToe',
  setup () {
      const playerSelect = ref('')

      const randomTurn:Ref<boolean|null> = ref(null);
      const turn = ():boolean[] => [true, false].sort(() => Math.random() - 0.5)
      const result = ref('')
      const disableBoard = ref(true)
      const ticTacToe:Ref<string[][]> = ref(Array.from({length: 3}, () => Array.from({length: 3}).map(()=> '')))
      function onReset () {
        ticTacToe.value = Array.from({length: 3}, () => Array.from({length: 3}).map(()=> ''))
        result.value = ''
        playerSelect.value = ''
      }

    function handlePlayer(val:string) {
      playerSelect.value = val
      randomTurn.value = turn()[0]
      disableBoard.value = false
    }
    
    // 승부 체크
    const checkWinner = ():string|null => {
      const lines = [
        // 가로
        ...ticTacToe.value,
        // 세로
        ...ticTacToe.value.map((_, idx) => ticTacToe.value.map(row => row[idx])),
        // 대각선
        [ticTacToe.value[0][0], ticTacToe.value[1][1], ticTacToe.value[2][2]],
        [ticTacToe.value[0][2], ticTacToe.value[1][1], ticTacToe.value[2][0]]
      ];

      for (const line of lines) {
        if (line.every(val => val === line[0] && val !== "")) {
          return `${line[0]} 이겼습니다!`;
        }
      }
      if (ticTacToe.value.flat().every((val:string) => val !== "")) {
        return "무승부!";
      }
      return null
    }

    function getResult () {
      const isWin = checkWinner()
      if(isWin) {
        result.value = isWin
        disableBoard.value = true
        randomTurn.value = null
        return;
      }
      return;
    }

    function clickBoard(rowidx:number, colIdx:number) {
      if(!ticTacToe.value[rowidx][colIdx] && randomTurn.value !== null) {
        ticTacToe.value[rowidx][colIdx] = randomTurn.value  ? '나' : playerSelect.value
        randomTurn.value = !randomTurn.value
      }
      getResult()
    }

    function computerPlay () {
      const randomIdx = () => Math.floor(Math.random() * 3)
      const rowIdx = randomIdx()
      const colIdx = randomIdx()
      if(ticTacToe.value[rowIdx][colIdx] === '') {
        setTimeout(() => {
          ticTacToe.value[rowIdx][colIdx] = '컴퓨터'
          randomTurn.value = !randomTurn.value
          getResult()
        }, 500)
        return
      } 
      getResult()
      computerPlay()
    }

    watch(randomTurn, (newValue) => {
      if(playerSelect.value === '컴퓨터' && newValue === false && !result.value) {
        computerPlay()
      }
    })

    return {
      ticTacToe,
      playerSelect,
      handlePlayer, 
      clickBoard, 
      randomTurn,
      result,
      disableBoard,
      onReset,
    }
  }
})
</script>

<style scoped lang="scss">
$boardSize: 200px;
$border: 3px solid white;
.tic-tac-toe-board {
  border-bottom: $border;
  width: fit-content;
  margin: 0 auto !important;
  &:last-of-type {
    border-bottom: none;
  }
  .v-col {
    width: $boardSize;
    height: $boardSize;
    min-width: $boardSize;
    color: white;
    border-right: $border;
    text-align: center;
    line-height: $boardSize;
    font-size: 20px;
    &:last-of-type {
      border-right: none;
    }
  }
}
</style>