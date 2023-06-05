<script setup lang="ts">
import type { CheckoutPrint } from '@/interfaces/print';
import FormatComp from '@/components/FormatComponent.vue';

const props = defineProps({
  print: { type: Object as () => CheckoutPrint, required: true },
})
</script>

<template>
  <div class="check">
    <div>
      <img :src="print.documentUrl">
      <h2>{{ print.title }}</h2>
    </div>
    <FormatComp :checkoutAble="print" :print="undefined" :format="undefined"/>
  </div>
</template>

<style scoped>
.check {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 8px;
}

.check > div {
  display: flex;
  align-items: center;
}

h2 {
margin-left: 8px;
}

img {
  width: 64px;
  height: 64px;
  object-fit: scale-down;
}

.load {
  display: flex;
  justify-content: center;
}
</style>