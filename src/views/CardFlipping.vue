<template>
  <div class="d-flex align-center justify-center" style="gap: 20px;">
    <v-btn @click="() => {createNewCards(); showCards()}">시작하기</v-btn>
    <h1>Timer: {{ time }}초</h1><h2>{{ result }}</h2>
  </div>
  <div class="card-fliped-container">
    <v-card
      v-for="(card, idx) in randomCards"
      :key="idx"
      @click="() => {flipCard(card, idx)}"
      >{{ card.flipped ? card.value : '?' }}</v-card
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref } from 'vue'
interface Cards {
  value: number
  flipped: boolean
  idx: number
}
export default defineComponent({
  name: 'CardFlipping',
  setup() {
    const randomValue = () => Math.floor(Math.random() * 100) + 1
    const randomCards: Ref<Cards[]> = ref([])
      const time = ref(0)

    function createNewCards() {
      randomCards.value = []
      time.value = 0
      while (randomCards.value.length < 9) {
        const randomNumber = randomValue()
        if (!randomCards.value.some((obj) => obj.value === randomNumber)) {
          randomCards.value.push({ value: randomNumber, flipped: false, idx: 0 })
        }
      }
      randomCards.value = randomCards.value
        .concat(randomCards.value)
        .map((v, idx) => ({ ...v, idx: idx }))
        .sort(() => Math.random() - 0.5)
    }

    const result = ref('')
    function Timer () {
      const setTime = setInterval(() => { 
        time.value++
        if(time.value > 40) {
          clearInterval(setTime)
          time.value = 40
          if(randomCards.value.some(card => card.flipped === false)) {
            result.value = '실패!'
            randomCards.value = []
            return
          }
          result.value = '성공!'
        }
      }, 1000)
    }

    function showCards() {
      const showing = setInterval(() => {
        randomCards.value.forEach((v) => {
          v.flipped = true
        })
        if (randomCards.value.every((v) => v.flipped)) {
          clearInterval(showing)
          setTimeout(() => {
            randomCards.value.forEach((v) => {
              v.flipped = false
            })
            Timer()
          }, 1000)
        }
      }, 200)
    }

    const previousCard: Ref<Cards | null> = ref(null)
    function flipCard(card: Cards, idx:number) {
      randomCards.value[idx].flipped = !randomCards.value[idx].flipped
      if(randomCards.value.every(c => c.flipped)) {
        result.value = '성공!'
        return;
      }
      if (previousCard.value && previousCard.value.flipped && card.value === previousCard.value.value) {
        console.log('match!')
        previousCard.value = null
      } else if (previousCard.value) {
        setTimeout(() => {
          card.flipped = false
          previousCard.value!.flipped = false
          previousCard.value = null
        }, 500)
      } else {
        previousCard.value = card
      }
    }

    return {
      randomCards,
      flipCard,
      showCards,
      createNewCards,
      time,
      result,
    }
  }
})
</script>

<style lang="scss">
.card-fliped-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 50px;
  grid-row-gap: 20px;
  > .v-card {
    background-color: white;
    color: #333333;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    font-weight: 900;
  }
}
</style>
