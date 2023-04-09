<template>
  <div class="d-flex">
    <v-card v-for="card in randomCards" :key="card.value">{{ card.value }}</v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref } from 'vue';

export default defineComponent({
  name: 'CardFlipping',
  setup() {
    const randomValue = () => Math.floor(Math.random() * 30) + 1
    const randomCards: Ref<{ value: number; fliped: boolean }[]> = ref([])
    function createNewCards() {
      randomCards.value = []
      while(randomCards.value.length < 6) {
        const randomNumber = randomValue()
        if (!randomCards.value.some((obj) => obj.value === randomNumber)) {
          randomCards.value.push({ value: randomNumber, fliped: false })
        }
      }
    }
    createNewCards()

    return {
      randomCards
    }
  }
})
</script>

<style lang="scss"></style>
