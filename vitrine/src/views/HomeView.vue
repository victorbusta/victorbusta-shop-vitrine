<script setup lang="ts">
import LoadingIcon from '@/components/icons/IconLoading.vue';
import CloseIcon from '@/components/icons/IconClose.vue';
import PrintCard from '@/components/PrintCard.vue';
import { ref } from 'vue';
import { HTTP } from '@/http';
import type { Print } from '@/interfaces/print';
import * as anim from '@/utils.animation';

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

const showImg = (e: Event) => {
  const parent: HTMLElement | null = (e.target as HTMLElement).parentElement;
  parent?.classList.add('image-container-loaded');
}

</script>

<template>
  <div class="wrapper">

    <div class="image-gallery">
      <div v-for="print in evenPrints()" :key="print.id" class="image-container" @click="showModal(print)" >
        <img :src="print.documentUrl" @load="$e => showImg($e)">
      </div>
    </div>

    <div class="image-gallery">
      <div v-for="print in oddPrints()" :key="print.id" class="image-container" @click="showModal(print)" >
        <img :src="print.documentUrl" @load="$e => showImg($e)">
      </div>
    </div>

  </div>

  <LoadingIcon style="width: 128px; height: 128px;" v-if="!printsLoaded"/>

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
  height: fit-content;
  padding: 10px;
  transition: all ease-in-out .2s;
  transform: translateY(100%);
  opacity: 0;
}

.image-container-loaded {
  transform: translateY(0);
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
