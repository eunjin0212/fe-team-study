<template>
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
  matched: boolean
}
export default defineComponent({
  name: 'CardFlipping',
  setup() {
    const randomValue = () => Math.floor(Math.random() * 100) + 1
    const randomCards: Ref<Cards[]> = ref([])
    function createNewCards() {
      randomCards.value = []
      while (randomCards.value.length < 9) {
        const randomNumber = randomValue()
        if (!randomCards.value.some((obj) => obj.value === randomNumber)) {
          randomCards.value.push({ value: randomNumber, flipped: false, idx: 0, matched: false })
        }
      }
      randomCards.value = randomCards.value
        .concat(randomCards.value)
        .map((v, idx) => ({ ...v, idx: idx }))
        .sort(() => Math.random() - 0.5)
    }
    createNewCards()
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
          }, 1000)
        }
      }, 200)
    }
    showCards()
    const previousCard: Ref<Cards | null> = ref(null)
    function flipCard(card: Cards, idx:number) {
      randomCards.value[idx].flipped = !randomCards.value[idx].flipped
      if (previousCard.value && previousCard.value.flipped && card.value === previousCard.value.value) {
        console.log('match!')
        previousCard.value = null
      } else if (previousCard.value) {
        setTimeout(() => {
          card.flipped = false
          previousCard.value!.flipped = false
          previousCard.value = null
        }, 1000)
      } else {
        previousCard.value = card
      }
    }

    return {
      randomCards,
      flipCard
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
