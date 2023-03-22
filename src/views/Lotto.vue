<template>
  <div>
    <div>
      <button @click="clickValue = 'auto'">자동</button>
    </div>
    <div>
      <auto-lotto  v-if="clickValue === 'auto'"
      />
    </div>
    <div>
      <button @click="getLottoNumber">이번주 로또 번호</button>
      <p>result</p>
      <div style="display: flex; gap: 10px">
        <span class="ball" v-for="number in lottoNumbers" :key="number">{{ number }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref } from 'vue'
import AutoLotto from '../components/AutoLotto.vue'
import generateAutoNumber from '../modules/useRandomNumber'

export default defineComponent({
  components: { AutoLotto },
  name: 'LottoPage',
  setup() {
    const lottoNumbers: Ref<number[]> = ref([])
    
    function getLottoNumber() {
      lottoNumbers.value = []
      lottoNumbers.value = generateAutoNumber()
      console.log(generateAutoNumber(), lottoNumbers.value)
    }
    return {
      clickValue: ref(''),
      lottoNumbers,
      getLottoNumber,
      generateAutoNumber
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
