<template>
  <div>
    <h3 class="mb-6">지니봇과 함께 하는 가위바위보 게임 <v-btn @click="startGame">시작</v-btn></h3>
    <div class="d-flex flex-row justify-space-between" style="gap: 20px">
      <v-card style="width: 50%">
        <v-card-title> Player Ginie </v-card-title>
        <v-card-item>
          <ul class="rock-scissors-paper">
            <li>{{ ginie.emoji }}</li>
          </ul>
        </v-card-item>
      </v-card>
      <v-card style="width: 50%">
        <v-card-title> You </v-card-title>
        <v-card-item>
          <ul class="rock-scissors-paper">
            <li>{{ you.emoji }}</li>
          </ul>
        </v-card-item>
      </v-card>
    </div>
    result
    <h1>{{ result }}</h1>
    <v-btn v-if="result.length" @click="resetGame">Reset</v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'RockScissorsPaper',
  setup() {
    const ginie = ref({ emoji: '✌️', value: 0 })
    const you = ref({ emoji: '✌️', value: 0 })
    const rockScissorsPaper = [
      { emoji: '✌️', value: 0 },
      { emoji: '✊', value: 1 },
      { emoji: '🖐️', value: 2 }
    ]
    function changeHand() {
      const randomIdx = () => Math.floor(Math.random() * 3)
      ginie.value = rockScissorsPaper[randomIdx()]
      you.value = rockScissorsPaper[randomIdx()]
    }
    const interval = ref(
      setInterval(() => {
        changeHand()
      }, 100)
    )
    const result = ref('')

    function startGame() {
      setTimeout(() => {
        clearInterval(interval.value)
        result.value =
          ginie.value.value > you.value.value
            ? '지니봇 승리'
            : ginie.value.value < you.value.value
            ? '당신의 승리'
            : '무승부'
      }, 1000)
    }

    function resetGame() {
      console.log(resetGame)
      result.value = ''
      interval.value = setInterval(() => {
        changeHand()
      }, 100)
    }
    return {
      rockScissorsPaper,
      ginie,
      you,
      startGame,
      result,
      resetGame
    }
  }
})
</script>

<style lang="scss" scoped>
.rock-scissors-paper {
  list-style: none;
  position: relative;
  height: 300px;
  > li {
    font-size: 200px;
    height: inherit;
    width: 100%;
    text-align: center;
    list-style: none;
    position: absolute;
    top: 0;
    left: 0;
    transition: display 0.5s ease-in-out;
  }
}
</style>
