<script setup lang="ts">
import LoadingIcon from '@/components/icons/IconLoading.vue';
import PrintCard from '@/components/PrintCard.vue';
import ImgComponent from '@/components/ImgComponent.vue';
import { ref } from 'vue';
import { HTTP } from '@/http';
import type { Print } from '@/interfaces/print';

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

const openModal = (print: Print) => {
  modalPrint.value = print;
  modalOpened.value = true;  
}
</script>

<template>
  <div class="wrapper" v-if="printsLoaded">

    <div class="image-gallery">
      <div v-for="print in evenPrints()" :key="print.id" :class="`image-container`" @click="openModal(print)" >
        <ImgComponent :src="print.documentUrl" :placeholder="print.documentUrl.replace('images', 'lite')"/>
        <!-- <img :src="print.documentUrl.replace('images', 'lite')" alt=""> -->
      </div>
    </div>

    <div class="image-gallery">
      <div v-for="print in oddPrints()" :key="print.id" :class="`image-container`" @click="openModal(print)" >
        <ImgComponent :src="print.documentUrl" :placeholder="print.documentUrl.replace('images', 'lite')"/>
        <!-- <img :src="print.documentUrl.replace('images', 'lite')" alt=""> -->
      </div>
    </div> 

  </div>

  <div v-else style="display: flex; flex-direprint.printction: column; align-items: center;">
    <LoadingIcon style="width: 128px; height: 128px;"/>
    <h1 style="text-align: center;">
      Photos en cours de chargement
    </h1>
  </div>

  <PrintCard v-if="modalOpened" :print="(modalPrint as Print)" @close-modal="modalOpened = false"/>

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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 10vh;
  height: fit-content;
  padding: 10px;
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

@media (min-width: 426px) {
  .image-gallery {
    width: 30vw;
  }
}

@media (min-width: 768px) {
  .image-gallery {
    width: 25vw;
  }
}

@media (min-width: 1023px) {
  .image-gallery {
    width: 20vw;
  }
}
</style>
