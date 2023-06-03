<script setup lang="ts">
import FormatComponent from './FormatComponent.vue';
import type { Print } from '@/interfaces/print';

const props = defineProps({
  print: { type: Object as () => Print, required: true },
})
</script>

<template>

  <div class="wrapper">

    <div class="imgwrapper">
      <img :src="print.documentUrl">
    </div>

    <div class="card">
      <h2>{{ print.title }}</h2>

      <hr>

      <FormatComponent v-for="format in print.formats" :key="format.id" :print="print" :format="format" :checkoutAble="null"/>

    </div>
  </div>

</template>

<style scoped>
  .wrapper {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .imgwrapper {
    width: 100%;
    display: flex;
    justify-content: center ;  
}

  img {
    background-color: var(--color-background);
    padding: 4px;
    object-fit: scale-down;
    max-width: 100vw;
    max-height: 60vh;
  }

  .card {
    width: 100vw;
    height: fit-content;
    min-height: calc(40vh - 64px);
    max-height: fit-content;
    padding: 0 4vw;
    background-color: var(--color-background);
    display: flex;
    top: 16px;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    text-align: center;
  }

  hr {
    width: 90%;
  }
</style>