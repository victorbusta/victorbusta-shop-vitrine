<script setup lang="ts">
import LoadingIcon from '@/components/icons/IconLoading.vue';
import CloseIcon from '@/components/icons/IconClose.vue';
import PrintCard from '@/components/PrintCard.vue';
import { ref } from 'vue';
import { HTTP, getDocObjUrl } from '@/http';
import type { Print } from '@/interfaces/print';
import * as anim from '@/utils.animation';

const prints = ref<Print[]>([]);
const modalPrint = ref<Print>();
const modalOpened = ref(false);
const printsUrl = ref<string[]>([]);
const printsLoaded = ref(false);


const fetchPrints = async () => {
  try {
    const res = await HTTP.get('/print');
    const printRes = res.data;
    
    for (const print of printRes) {
      const nestedRes: { data: Print } = await HTTP.get(`/print/${print.id}`);
      prints.value.push(nestedRes.data);
      printsUrl.value[print.id] = await getDocObjUrl(print.id);
    }

    printsLoaded.value = true;
  } catch (error) {
    console.error(error);
  }
};

fetchPrints();

const evenPrints = () => prints.value.filter((print: Print) => print.id % 2 === 0);
const oddPrints = () => prints.value.filter((print: Print) => print.id % 2 !== 0);

const showModal = (print: Print) => {
  modalPrint.value = print;
  modalOpened.value = true;
  anim.translateY(".modal", "0vh");
} 

const closeModal = async () => {
  anim.translateY(".modal", "100vh");
  await anim.delay();
  modalPrint.value = undefined;
  modalOpened.value = false;
} 
</script>

<template>
  <div class="wrapper" v-if="printsLoaded">

    <div class="image-gallery">
      <div v-for="print in evenPrints()" :key="print.id" class="image-container" @click="showModal(print)" >
        <img :src="printsUrl[print.id]">
      </div>
    </div>

    <div class="image-gallery">
      <div v-for="print in oddPrints()" :key="print.id" class="image-container" @click="showModal(print)" >
        <img :src="printsUrl[print.id]">
      </div>
    </div>

  </div>
  
  <LoadingIcon style="width: 128px; height: 128px;" v-else/>

  <div class="modal" >
    <CloseIcon height="64px" width="64px" @click="closeModal" :dark="false"/>
    <PrintCard v-if="modalOpened" :print="modalPrint" :printUrl="printsUrl[modalPrint?.id ?? 1]"/>
  </div>

</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: start;
}

.image-gallery {
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.image-container {
  width: 100%;
  height: fit-content;
  padding: 10px;
  transition: all ease-in-out .2s;
}

.image-container:hover {
  padding: 0px;
}

img {
  width: 100%;
}

.modal {
  position: fixed;
  top: 0vh;
  transform: translateY(100vh);
  width: 100vw;
  height: 100vh;
  background-color: var(--color-foreground-hover);
  transition: all ease-in-out .2s;
  z-index: 1;
}

.cross {

  background-color: aliceblue;
}

@media screen and (min-width: 1023px) {
  .image-gallery {
    width: 30vw;
  }
}
</style>