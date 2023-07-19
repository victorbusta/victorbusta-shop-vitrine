<script setup lang="ts">
import type { AxiosResponse } from 'axios';

const props = defineProps({
  res: {
    type: Object as () => AxiosResponse,
    requiered: true,
  }
})

console.log(props.res);
</script>

<template>
  <div>
    <h1>Termine ta commande via PayPal</h1>
  </div>
</template>

<style scoped>
  div {
    width: 90%;
    height: 64px;
    background-color: var(--color-foreground);
    color: var(--color-background);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: intro .2s ease-in-out forwards;
    transform: translateY(-100%);
  }

  @keyframes intro {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }

  h1 {
    font-size: 16px;
    line-height: 14px;
  }

</style>