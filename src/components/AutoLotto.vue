<template>
  <div>
    <button @click="createAutoNumber">자동으로 숫자 받기</button>
    <p>내 로또 번호</p>
    <div style="display: flex; gap: 10px">
      <span class="ball" v-for="number in autoLottoNumber" :key="number">{{ number }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType, type Ref } from 'vue'

export default defineComponent({
  name: 'AutoLotto',
  props: {
    modelValue: { type: Array as PropType<number[]>, default: () => [] }
  },
  setup(props, {emit}) {
    const autoLottoNumber: Ref<number[]> = ref(props.modelValue)
    function createAutoNumber() {
      autoLottoNumber.value = []
      const lottoNumber = () => Math.floor(Math.random() * 44) + 1
      autoLottoNumber.value = [...new Set(Array.from({ length: 6 }).map(() => lottoNumber()))]
      emit('update:modelValue', autoLottoNumber.value)
    }
    return {
      createAutoNumber,
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
