<script setup lang="ts">
import { ref } from 'vue'
import FormatComp from './FormatComponent.vue';
import { getDocObjUrl } from '@/http';
import type { Print } from '@/interfaces/print';
import LoadingIcon from '@/components/icons/IconLoading.vue';

const props = defineProps({
  print: { type: Object as () => Print, required: true },
})

const showDialog = ref(false);
const documentUrl = ref();
const documentLoaded = ref(false);

getDocObjUrl(props.print.id).then(res => {
  documentUrl.value = res;
  documentLoaded.value = true;
})

</script>

<template>
  <span class="printWrap">

    <img class="printImg" v-if="documentLoaded" :src="documentUrl" @click="showDialog = true">
    <LoadingIcon style="width: 64px; height: 64px;" v-else/>

    <div class="printModal" v-if="showDialog">
      <div class="printData">
        <h2>{{ print.title }}</h2>
        <hr>
        <div class="formats">
          <div class="format" v-for="format in print.formats" v-bind:key="format">
            <FormatComp :format="format" :print="print" :checkoutAble="undefined" />
            <hr>
          </div>
        </div>
      </div>

      <div class="imgWrap">
        <img class="modalImg" :src="documentUrl" @click="showDialog = true">
      </div>

      <span class="closeCard" @click="showDialog = false">
        <span></span>
        <span></span>
      </span>
    </div> 

  </span>
</template>

<style scoped>
.printWrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  object-fit: scale-down;
}

.printImg {
  max-width: 100%;
  max-height: 384px;
  transition: all ease-in-out .2s ;
}

.printImg:hover {
  scale: 1.5;
  z-index: 1;
}

.printModal {
  display: grid;
  grid-template-rows: 10vh 40vh 50vh;
  grid-gap: 4px;
  align-items: center;
  justify-items: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: var(--color-hover);
  z-index: 10;
}

.printData {
  grid-row: 3;
  height: 100%;
  width: 90%;
  padding: 0 16px;
  margin: 0 4px;
  background-color: var(--color-background );
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  width: 100%;
  color: var(--color-text);
  text-align: center;
  font-size: var(--font-size-big-small);
}

hr {
  width: 90%;
  opacity: .5;
}

.formats {
  height: 100%;
  width: fit-content;
  overflow-y: scroll;
}

.format:not(:first-of-type) {
  margin-top: 8px;
}

.imgWrap {
  grid-row: 2;
  background-color: var(--color-background);
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modalImg {
  max-width: 100%;
  height: fit-content;
  max-height: 40vh;
  grid-row: 2;
  padding: 4px;
}

.closeCard {
  grid-row: 1;
  width: 100vw;
  height: 32px;
  /* left: -10vh; */
  display: flex;
  /* justify-content: center; */
  align-items: center;
}

.closeCard > span {
  position: absolute;
  width: 32px;
  height: 4px;
  left: 16px;
  background-color: var(--color-background);
  border-radius: 4px;
}

.closeCard > span:nth-child(even) {
  transform: rotate(45deg);
}

.closeCard > span:nth-child(odd) {
  transform: rotate(-45deg);
}
</style>