<template>
  <header>
    <nav>
      <RouterLink to="/word-chain-game">끝맛잇기 게임</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  components: { RouterView },
  setup() {
    return {}
  }
})
</script>

<style lang="scss">
  body {
    display: flex;
    flex-direction: column;
    padding: 40px 20px;
  }
  header {
    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
  }
</style>
