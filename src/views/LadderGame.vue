<template>
  <div>
    <v-dialog v-model="dialog" width="auto">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props" v-if="itemCount < 1">시작</v-btn>
      </template>

      <v-card>
        <v-card-text>
          사다리게임
        </v-card-text>
        <v-card-item>
          <v-btn variant="text" size="x-small" class="ml-6" flat plain @click="itemCount > 0 ? itemCount-- : null">-</v-btn>
          {{ itemCount }}
          <v-btn variant="text" size="x-small" class="mr-6" flat plain @click="itemCount++">+</v-btn>
        </v-card-item>
        <v-card-actions>
          <v-btn color="primary" block @click="handleClick">시작</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-if="!dialog" class="d-flex flex-column ladder-wrapper">
      <div class="d-flex justify-space-between text-center" style="gap: 8px">
        <v-sheet v-for="(item) in itemCount" :key="item" :style="`width: calc(100vw / ${itemCount})`">{{ item }}</v-sheet>
      </div>
      <div class="d-flex" style="gap: 8px">
        <v-text-field v-for="(item, idx) in itemCount" :key="item" v-model="items[idx]"></v-text-field>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref } from 'vue';

export default defineComponent({
  setup() {
    const dialog = ref(false)
    const itemCount = ref(0)
    const items:Ref<string[]> = ref([])
    function handleClick() {
      dialog.value = false
    }
    return {
      dialog,
      itemCount,
      handleClick,
      items
    }
  }
})
</script>

<style lang="scss">
.ladder-wrapper {}
</style>
