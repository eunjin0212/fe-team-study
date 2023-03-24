<template>
  <div>
    <div>
      <!-- <button @click="clickValue = 'auto'">자동</button> -->
      <button @click="clickValue = 'manual'">수동</button>
    </div>
    <div>
      <!-- <auto-lotto  v-if="clickValue === 'auto'" /> -->
      <manual-lotto
        v-if="clickValue === 'manual'"
        @update:modelValue="updateManualLotto"
      />
    </div>
    <div>
      <button @click="getLottoNumber" :disabled="manualLotto.length !== 7">이번주 로또 번호</button>
      <p>result</p>
      <div style="display: flex; gap: 10px">
        <span class="ball" v-for="number in lottoNumbers" :key="number">{{ number }}</span>
      </div>
      {{ result }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref } from 'vue'
import ManualLotto from '../components/ManualLotto.vue'

export default defineComponent({
  components: { ManualLotto },
  name: 'LottoPage',
  setup() {
    const lottoNumbers: Ref<number[]> = ref([])
    const generateLottoNumber = () => {
      return Math.floor(Math.random() * 50) + 1 // generates a number between 1 and 50
    }

    const generateLottoNumbers = () => {
      const number = generateLottoNumber()
      if (!lottoNumbers.value.includes(number)) {
        lottoNumbers.value.push(number)
      }
    }
    const manualLotto: Ref<number[]> = ref([])
    function updateManualLotto(number: number[]) {
      manualLotto.value = number
    }
    const result = ref('')
    function getLottoNumber() {
      lottoNumbers.value = []
      const interval = setInterval(() => {
        if (lottoNumbers.value.length > 6) {
          const count = lottoNumbers.value.reduce((acc, cur) => {
            acc = manualLotto.value.filter(v => cur === v).length 
            return acc
          }, 0)
          if (count) result.value = `${count}개 맞았습니다! 축하합니다!`
          return clearInterval(interval)
        }
        generateLottoNumbers()
      }, 300)
    }
    return {
      clickValue: ref(''),
      lottoNumbers,
      getLottoNumber,
      updateManualLotto,
      manualLotto,
      result,
    }
  }
})
</script>

<style lang="scss">
.ball {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  color: white;
  background-color: red;
  font-size: 16px;
  font-weight: 700;
  padding: 4px;
}
</style>
