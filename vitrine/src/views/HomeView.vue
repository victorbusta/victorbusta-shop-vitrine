<script setup lang="ts">
import Carousel from '@/components/CarouselComponent.vue';
import LoadingIcon from '@/components/icons/IconLoading.vue';
import { ref } from 'vue';
import { HTTP } from '@/http';
import type { Print } from '@/interfaces/print';

const prints = ref<Print[]>([]);
const printsLoaded = ref(false);

const fetchPrints = async () => {
  try {
    const res = await HTTP.get('/print');
    const printRes = res.data;
    
    for (const print of printRes) {
      const nestedRes: { data: Print } = await HTTP.get(`/print/${print.id}`);
      prints.value.push(nestedRes.data);
    }

    printsLoaded.value = true;
  } catch (error) {
    console.error(error);
  }
};

fetchPrints();
</script>

<template>
  <div class="carousel">
    <Carousel v-if="printsLoaded" :prints="prints"/>
    <LoadingIcon style="width: 128px; height: 128px;" v-else/>
  </div>
</template>

<style scoped>
  .carousel {
    width: 60vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

  }

  @media only screen and (max-width: 768px) {
    .carousel {
      width: 75vw;
    }
  }

  @media only screen and (max-width: 425px) {
    
    .carousel {
      width: 100vw;
    }
  }
</style>