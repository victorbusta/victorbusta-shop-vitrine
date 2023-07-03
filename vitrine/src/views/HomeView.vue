<script setup lang="ts">
import LoadingIcon from '@/components/icons/IconLoading.vue';
import CloseIcon from '@/components/icons/IconClose.vue';
import PrintCard from '@/components/PrintCard.vue';
import { ref } from 'vue';
import { HTTP } from '@/http';
import type { Print } from '@/interfaces/print';
import * as anim from '@/utils.animation';
import VLazyImage from "v-lazy-image";

const prints = ref<Print[]>([]);
const modalPrint = ref<Print>();
const modalOpened = ref(false);
const printsLoaded = ref(false);

const fetchPrints = async () => {
  try {
    const res = await HTTP.get('/print');
    prints.value = res.data;

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

const keyframes = [
        { opacity: 0, transform: 'translateY(100%)' },
        { opacity: 1, transform: 'translateY(0)' }
      ];

const showImg = (e: Event, printId: number) => {
  console.log(printId);
  
  const parent = document.querySelector(`.image${printId}`);
  parent?.animate(keyframes, {
        duration: 500,
        fill: 'forwards',
        delay: 100 * printId,
        easing: 'ease',
        iterations: 1,
      });
}

</script>

<template>
  <div class="wrapper" v-if="printsLoaded">

    <div class="image-gallery">
      <div v-for="print in evenPrints()" :key="print.id" :class="`image-container image${print.id}`" @click="showModal(print)" >
        <VLazyImage :src="print.documentUrl" @load="($e: Event) => showImg($e, print.id)"/>
      </div>
    </div>

    <div class="image-gallery">
      <div v-for="print in oddPrints()" :key="print.id" :class="`image-container image${print.id}`" @click="showModal(print)" >
        <VLazyImage :src="print.documentUrl" @load="($e: Event) => showImg($e, print.id)"/>
      </div>
    </div> 

  </div>

  <div v-else style="display: flex; flex-direction: column; align-items: center;">
    <LoadingIcon style="width: 128px; height: 128px;"/>
    <h1 style="text-align: center;">
      Photos en cours de chargement
    </h1>
  </div>

  <div class="modal" >
    <CloseIcon height="64px" width="64px" style="z-index: 1;" @click="closeModal" :dark="false"/>
    <PrintCard v-if="modalOpened" :print="modalPrint as Print" />
  </div>


  <hr>

  <footer>
    <h4 style="text-align: center;">
    Les droits d'auteur des photos sont détenus par Van Butsele Diane et leur commercialisation n'est autorisée qu'en sa possession.
    </h4>
  </footer>

</template>

<style scoped>
.refa-all{
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: start;
}

hr {
  position: sticky;
  top: 72px;
  width: 90%;
  margin: 0 5%;
  stroke: var(--color-foreground);
}

.image-gallery {
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.image-container {
  width: 100%;
  min-height: 10vh;
  height: fit-content;
  padding: 10px;
  opacity: 0;
  transform: translateY(100%);
  transition: all 200ms ease-in-out;
}

@keyframes show {
  100%{
    opacity: 1;
  }
}

.image-container-loaded {
  opacity: 1;
}

.image-container:hover {
  padding: 0px;
}

img {
  width: 100%;
  transition: all .5s ease-in-out;
}

.modal {
  position: fixed;
  top: 0vh;
  transform: translateY(100vh);
  width: 100vw;
  height: 100vh;
  background-color: var(--color-foreground-hover);
  transition: all ease-in-out .2s;
  overflow-y: scroll;
  z-index: 1;
}

.cross {
  background-color: aliceblue;
}

@media (min-width: 1023px) {
  .image-gallery {
    width: 30vw;
  }
}
</style>
