<script lang="ts" setup>
import PrintCard from './PrintCard.vue';
import type { Print } from '@/interfaces/print';
import { ref } from 'vue';

const props = defineProps({
  prints: {
    type: Array as () => Print[],
    required: true,
  },
});

const getEvenPrints = (prints: Print[]): Print[] => {
  const evenPrints: Print[] = [];
  for (let i = 0; i < prints.length; i+=2) {
    evenPrints.push(prints[i]);
  }
  return evenPrints;
}

const getOddPrints = (prints: Print[]): Print[] => {
  const oddPrints: Print[] = [];
  for (let i = 1; i < prints.length; i+=2) {
    oddPrints.push(prints[i]);
  }
  return oddPrints;
}

const evenPrints = ref(getEvenPrints(props.prints));
const oddPrints = ref(getOddPrints(props.prints));
</script>

<template>
  <div class="bigwrapper">
    <div class="wrapper" v-for="print in evenPrints" :key="print">
      <PrintCard :print="print" />
    </div>
  </div>

  <div class="bigwrapper">
    <div class="wrapper" v-for="print in oddPrints" :key="print">
      <PrintCard :print="print" />
    </div>
  </div>

</template>

<style scoped>
.bigwrapper {
  width: 50%;
}

.wrapper {
  object-fit: scale-down;
  width: 100%;
  height: fit-content;
  max-height: 384px;
  padding: 4px;
  /* min-width: 50%; */
}
</style>
