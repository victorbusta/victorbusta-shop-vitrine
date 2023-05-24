<script setup lang="ts">
import { ref } from 'vue'
import { getDocObjUrl } from '@/http';
import type { CheckoutPrint } from '@/interfaces/print';
import FormatComp from '@/components/FormatComponent.vue';
import LoadingIcon from '@/components/icons/IconLoading.vue';

const props = defineProps({
  print: { type: Object as () => CheckoutPrint, required: true },
})

const documentUrl = ref();
const documentLoaded = ref(false);

getDocObjUrl(props.print.id).then(res => {
  
  documentUrl.value = res;
  documentLoaded.value = true;
})

</script>

<template>
  <div class="check" v-if="documentLoaded">
    <div>
      <img :src="documentUrl">
      <h2>{{ print.title }}</h2>
    </div>
    <FormatComp :checkoutAble="print" :print="undefined" :format="undefined"/>
  </div>
  <div class="load" v-else>
    <LoadingIcon style="width: 64px; height: 64px;"/>
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