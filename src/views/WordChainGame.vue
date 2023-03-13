<template>
  <div>
    <p>2인이서 하는 끝말잇기 게임</p>
    <div class="input-box">
      player 1 : <input type="text" :value="player1" />
      <br />
      player 2 : <input type="text" :value="player2" />
    </div>
    <div>
      <b>이전 글자 : </b>
      <span>{{ lastWord }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'WordChainGame',
  setup() {
    const player1 = ref('')
    const player2 = ref('')
    const lastWord = ref('')
    return {
      player1,
      player2,
      lastWord
    }
  }
})
</script>

<style lang="scss"></style>
