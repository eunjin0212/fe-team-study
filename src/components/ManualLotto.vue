<template>
  <div>
    <input
      v-model.number="manualLottoInput"
      type="number"
      @keypress.enter="() => addNumber(manualLottoInput)"
      :disabled="manualLottoNumber.length === 7"
    />
    <span style="color: red">{{ warning }}</span>
    <div style="display: flex; gap: 10px">
        <span class="ball" v-for="number in manualLottoNumber" :key="number">{{ number }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref } from 'vue'

export default defineComponent({
  name: 'ManualLotto',
  setup(_, { emit }) {
    const manualLottoInput = ref(0)
    const manualLottoNumber: Ref<number[]> = ref([])
    const warning = ref('')
    function addNumber(number: number) {
      if (manualLottoNumber.value.length && manualLottoNumber.value.some(v => v === number)) {
        warning.value = '중복된 번호 입니다.'
        return
      }
      if(manualLottoInput.value > 45) {
        warning.value = '숫자가 너무 큽니다.'
        manualLottoInput.value = 0
        return
      }
      warning.value = ''
      manualLottoNumber.value.push(number)
      manualLottoInput.value = 0
      emit('update:modelValue', manualLottoNumber.value)
    }
    return {
      manualLottoInput,
      warning,
      manualLottoNumber,
      addNumber
    }
  }
})
</script>

<style scoped></style>
