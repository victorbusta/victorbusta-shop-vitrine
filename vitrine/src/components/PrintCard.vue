<script setup lang="ts">
import FormatComponent from './FormatComponent.vue';
import type { Print } from '@/interfaces/print';

const props = defineProps({
  print: { type: Object as () => Print, required: true },
  printUrl : { type: String, required: true },
})
</script>

<template>

  <div class="wrapper">

    <div class="imgwrapper">
      <img :src="printUrl">
    </div>

    <div class="card">
      <h1>{{ print.title }}</h1>

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
    height: 50vh;
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