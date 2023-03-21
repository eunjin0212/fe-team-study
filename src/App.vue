<template>
  <header>
    <nav>
      <RouterLink v-for="route in routes" :to="route.path" :key="route.name">{{ route.name }}</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import { routes } from './router/index';
export default defineComponent({
  components: { RouterView },
  setup() {
    return {
      routes
    }
  }
})
</script>

<style lang="scss">
  body {
    display: flex;
    flex-direction: column;
    padding: 40px 20px;
    header {
      position: fixed;
      top: 0;
      width: 100%;
      left: 0;
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      nav {
        display: flex;
        align-items: center;
        gap: 20px;
      }
    }
  }
</style>
