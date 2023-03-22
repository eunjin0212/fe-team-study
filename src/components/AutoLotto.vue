<template>
  <div>
    <button @click="createNumber">자동으로 숫자 받기</button>
    <p>내 로또 번호</p>
    <div style="display: flex; gap: 10px">
      <span class="ball" v-for="number in autoLottoNumber" :key="number">{{ number }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref } from 'vue'
import generateAutoNumber from '../modules/useRandomNumber'

export default defineComponent({
  name: 'AutoLotto',
  setup() {
    const autoLottoNumber:Ref<number[]> = ref([])
    function createNumber() {
      autoLottoNumber.value = []
      autoLottoNumber.value = generateAutoNumber()
    }
    return {
      createNumber,
      autoLottoNumber
    }
  }
})
</script>

<style lang="scss" scoped>
.ball {
  background-color: purple;
}
</style>
