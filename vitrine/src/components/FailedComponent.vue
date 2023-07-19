<script setup lang="ts">
import type { AxiosError, AxiosResponse } from 'axios';

const props = defineProps({
  res: {
    type: Object as () => AxiosError,
    requiered: true,
  }
})

console.log((props.res?.response as AxiosResponse).data['message']);

</script>

<template>
  <div>
    <h1>Une erreur c'est produite</h1>
    <h2>{{ (props.res?.response as AxiosResponse).data['message'] }}</h2>
  </div>
</template>

<style scoped>
  div {
    width: 90%;
    height: 64px;
    background-color: hwb(0 11% 43%);
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

  h2 {
    font-size: 12px;
    line-height: 18px;
  }

</style>