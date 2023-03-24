<template>
  <v-app>
    <v-app-bar :elevation="0">
      <v-btn variant="text" v-for="route in routes" :to="route.path" :key="route.name">
        {{ route.name }}
      </v-btn>
    </v-app-bar>
    <main>
      <RouterView />
    </main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { routes } from './router/index'
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
  #app {
    .v-application {
      width: 100%;
      padding: 0px;
      .v-application__wrap {
        padding: 84px 20px 20px;
        main {
          height: 100%;
        }
      }
    }
  }
}
</style>
