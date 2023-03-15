<template>
  <div>
    <p>2인이서 하는 끝말잇기 게임</p>
    <div class="input-box">
      player 1 :
      <input
        type="text"
        v-model="player.player1"
        @keyup.enter="() => inputWord(player.player1, 'player1')"
        :disabled="isDisabled['player1']"
        ref="player1Ref"
        autofocus
      />
      <br />
      player 2 :
      <input
        type="text"
        v-model="player.player2"
        @keyup.enter="() => inputWord(player.player2, 'player2')"
        :disabled="isDisabled['player2']"
        ref="player2Ref"
      />
    </div>
    <div>
      <b>이전 글자 : </b
      ><span v-for="(lastWord, idx) in lastWords" :key="idx"
        >{{ lastWord }}<span v-if="idx !== lastWords.length - 1">></span></span
      >
    </div>
  </div>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'WordChainGame',
  setup() {
    const player: Ref<Record<string, string>> = ref({ player1: '', player2: '' })
    const lastWords: Ref<string[]> = ref([])
    const isDisabled: Ref<Record<string, boolean>> = ref({ player1: false, player2: true })
    const player1Ref: Ref<HTMLInputElement | null> = ref(null)
    const player2Ref: Ref<HTMLInputElement | null> = ref(null)

    function inputWord(word: string, thisTurn: string) {
      // TODO: 다음 플레이어에게 포커스
      const players = Object.keys(player.value)
      players.forEach((turn: string) => (isDisabled.value[turn] = thisTurn === turn))
      player.value[thisTurn] = ''

      const lastWord = lastWords.value[lastWords.value.length - 1]
      if (lastWords.value.length > 1 && lastWord.charAt(lastWord.length - 1) !== word.charAt(0)) {
        lastWords.value.push(`${players.find((winner) => winner !== thisTurn)}가 승리하였습니다!`)
        isDisabled.value = { player1: true, player2: true }
        return
      }

      lastWords.value.push(word)
    }
    return {
      player,
      lastWords,
      inputWord,
      isDisabled,
      player1Ref,
      player2Ref
    }
  }
})
</script>

<style lang="scss"></style>
