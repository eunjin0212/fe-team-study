<template>
  <div>
    <div>
      <button @click="clickValue = 'manual'">수동</button>
      <button @click="clickValue = 'auto'">자동</button>
    </div>
    <div>
      <auto-lotto v-if="clickValue === 'auto'" @update:modelValue="(auto) => autoLottoNumber = auto" v-model="autoLottoNumber" />
    </div>
    <div>
      <button @click="getLottoNumber" :disabled="!autoLottoNumber.length">이번주 로또 번호</button>
      <p>result</p>
      <div style="display: flex; gap: 10px">
        <span class="ball" v-for="number in resultNumber" :key="number">{{ number }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref } from 'vue'
import AutoLotto from '../components/AutoLotto.vue'

export default defineComponent({
  components: { AutoLotto },
  name: 'LottoPage',
  setup() {
    const resultNumber: Ref<number[]> = ref([])
    function getLottoNumber() {
      resultNumber.value = []
      const lottoNumber = () => Math.floor(Math.random() * 44) + 1
      console.log('ss')
      setInterval(() => {
        if (resultNumber.value.length < 6) {
          resultNumber.value.push(lottoNumber())
        }
      }, 300)
    }
    const autoLottoNumber: Ref<number[]> = ref([])
    return {
      autoLottoNumber,
      clickValue: ref(''),
      resultNumber,
      getLottoNumber
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
