<script setup lang="ts">
import type { Print } from '@/interfaces/print';
import FormatComponent from './FormatComponent.vue';
import IconClose from './icons/IconClose.vue'
import IconCardMenu from './icons/IconCardMenu.vue';
import { ref } from 'vue';
import { delay } from '@/utils.animation';
import ToastComponent from './ToastComponent.vue';

defineProps({
  print: { 
    type: Object as () => Print,
    required: true 
  },
})

const showInfo = ref(false);
const showToast = ref(false);
const formatRef = ref<any>(null);

const addToCartForm = () => {
  if (formatRef.value) {
    formatRef.value.addToCart();
  }
  showToast.value = true;
  delay(1500).then(() => showToast.value = false)
};
</script>

<template>

  <div class="wrapper">

    <IconClose @click="$emit('closeModal')"/>
    <img :src="print.documentUrl">
    <IconCardMenu @click="showInfo = true"/>

    <div id="info" :class="showInfo ? '' : 'infoClosed'">
      <header>
        <div id="close-info" @click="showInfo = false">
          <span></span>
          <span></span>
        </div>
        <h1>{{ print.title }}</h1>
      </header>

      <main>
        <FormatComponent :print="print" ref="formatRef"/>
        <h4 id="desc"><hr>{{ print.description }}</h4>
      </main>

      <footer>
        <div id="stock">
          <h2>STOCK</h2>
          <div>
            <h3>{{ print.current_number }}</h3>
            <div></div>
            <h3>{{ print.initial_number }}</h3>
          </div>
        </div>

        <div id="to-cart" @click="addToCartForm">
          <h1>ajouter au panier</h1>
          <h1>ajouter au panier</h1>
        </div>

        <ToastComponent v-if="showToast"/>
        <!-- <ToastComponent/> -->

      </footer>

    </div>

  </div>

</template>

<style scoped>
  .wrapper {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--color-foreground-hover);
    z-index: 1;
  }

  img {
    position: absolute;
    max-width: 90vw;
    max-height: 80vh;
    top: 50%;
    left: 50%;
    z-index: 1;
    transform: translate(-50%, -50%);
  }

  #info {
    position: absolute;
    right: 0;
    top: 0;
    width: 50vw;
    height: 100vh;
    background-color: var(--color-background);
    transition: all .2s ease-in-out;
    z-index: 1;
  }

  .infoClosed {
    transform: translateX(100%);
  }

  header {
    display: grid;
    grid-template-columns: 64px auto;
  }

  #close-info {
    top: 0;
    left: 0;
    width: 64px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: solid 1px var(--color-foreground);
    border-right: solid 1px var(--color-foreground);
    cursor: pointer;
  }


  #close-info > span {
    position: absolute;
    width: 48px;
    height: 4px;
    background-color: var(--color-foreground);
  }

  #close-info > span:first-child {
    rotate: 45deg;
  }

  #close-info > span:last-child {
    rotate: -45deg;
  }

  header > h1 {
    font-size: 24px;
    line-height: 16px;
    height: 64px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--color-foreground);
    text-align: center;
  }

  main {
    position: relative;
    height: calc(100vh - 128px);
    width: 100%;
  }

  #desc {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
  }

  hr {
    width: 60%;
    margin: 0 20%;
  }

  footer {
    position: absolute;
    bottom: 0;
    display: grid;
    height: 64px;
    width: 100%;
    grid-template-columns: 64px auto;
  }

  #stock {
    border-top: solid 1px var(--color-foreground);
    border-right: solid 1px var(--color-foreground);
    height: 100%;
    width: 100%;
  }

  #stock > div {
    height: calc(100% - 17px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #stock > h2 {
    font-size: 12px;
    line-height: 16px;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid var(--color-foreground);
  }

  #stock > div > h3 {
    font-size: 16px;
    line-height: 16px;
    width: 100%;
    padding: 0 8px;
  }

  #stock > div > h3:first-child {
    text-align: start;
  }

  #stock > div > div {
    width: 24px;
    height: 1px;
    background-color: var(--color-foreground);
    rotate: -45deg;
  }

  #stock > div > h3:last-child {
    text-align: end;
  }

  #to-cart {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  #to-cart > h1 {
    font-size: 24px;
    line-height: 16px;
    padding: 16px;
    width: fit-content;
    border: 1px solid var(--color-foreground);
    background-color: var(--color-foreground);
  }

  #to-cart > h1:last-child {
    position: absolute;
    background-color: var(--color-background);
    transform: translate(4px, -4px);
    transition: all .1s ease-in-out;
  }

  #to-cart:hover > h1:last-child {
    transform: translate(0);
  }

  @media (min-width: 768px) {
    #info {
      width: 50vh;
    }
  }
</style>