<script setup lang="ts">
import CartIcon from './icons/IconCart.vue';
import { onMounted, ref } from 'vue';
import { useCheckoutStore } from '../store/checkoutStore'
import { defineProps } from 'vue'
import type { Print, Format, CheckoutPrint } from '@/interfaces/print';

const props = defineProps({
  print: {
    type: Object as () => Print,
    required: false,
  },
  format: {
    type: Object as () => Format,
    required: false,
  },
  checkoutAble: {
    type: Object as () => CheckoutPrint,
    required: false,
  },
});

const stored = ref(false);

const checkoutAble = ref(props.checkoutAble ?? {
  id: props.print?.id,
  title: props.print?.title,
  format: props.format
} as CheckoutPrint)

const checkoutStore = useCheckoutStore();

onMounted(() => {
  checkoutStore.$subscribe((mutation: any) => {
    if (mutation.type === 'addArticle') {
      // articleCount.value = checkoutStore.articleCount;
    }
  })
})

const addToCart = () => {
  if (!stored.value) {
    checkoutStore.addPrint(checkoutAble.value);

    stored.value = true;
  }
}

const removeFromCart = () => {
  checkoutStore.removePrint(checkoutAble.value);
  stored.value = false;
}

const checkStored = () => {
  stored.value = checkoutStore.checkStored(checkoutAble.value);  
}

checkStored();
</script>

<template>
  <span class="wrapper">
    <h2>taille : {{ checkoutAble.format.size }}</h2>
    <span class="smallwrap">
      <h3>{{ checkoutAble.format.price }}</h3>
      <div class="addCart">
      <div class="cartWrap" @click="addToCart" v-if="!stored">
        <CartIcon />
        <span class="plus" >
          <span></span>
          <span></span>
        </span>
      </div>
      <div class="added" @click="removeFromCart" v-else>
        <span></span>
        <span></span>
      </div>
    </div>
    </span>
  </span>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.wrapper > h2 {
  font-size: var(--font-size-medium);
  width: 100%;
}

h3 {
  margin-left: 16px;
  font-size: 1rem;
  opacity: .7;
  font-size: var(--font-size-medium-medium);
}

div {
  margin: 2px;
  width: 64px;
  height: 32px;
  display: flex;
  background-color: var(--color-background);
  border-radius: 8px;
  overflow: hidden;
}

.smallwrap {
  display: flex;
  justify-content: end;
}

.smallwrap > h3 {
  margin-right: 16px;
}

.addCart {
  height: 36px;
  width: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px var(--color-foreground);
}

.cartWrap {
  width: 60px;
  height: 32px;
}

#fullcart {
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
}

.addCart:hover > .cartWrap > #fullcart {
  transform: rotate(10deg);
}

.plus {
  width: 16px;
  height: 16px;
  margin: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.plus > span {
  position: absolute;
  background-color: var(--color-foreground);
  height: 2px;
  width: 10px;
  border-radius: 2px;
  transition: all .2s ease-in-out;
}

.plus > span:nth-child(even) {
  transform: rotate(-90deg);
}

.plus > span:nth-child(odd) {
  transform: rotate(0deg);
}

.addCart:hover > .cartWrap > .plus > span:nth-child(even) {
  transform: rotate(30deg);
  bottom: 4px;
  left: 0;
  width: 8px;
}

.addCart:hover > .cartWrap > .plus > span:nth-child(odd) {
  transform: rotate(-45deg);
  width: 12px;
  bottom: 6px;
  left: 4px;
}

.added {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.added > span {
  position: absolute;
  height: 4px;
  background-color: var(--color-foreground);
  border-radius: 4px;
  transition: all .2s ease-in-out;
}

.added > span:nth-child(even) {
  width: 24px;
  rotate: -40deg;
  transform: translate(4px, 4px);
}

.added > span:nth-child(odd) {
  width: 16px;
  rotate: 40deg;
  transform: translate(-4px, 7px);
}

.addCart:hover > .added > span:nth-child(even) {
  width: 24px;
  rotate: -45deg;
  transform: translate(0);
}

.addCart:hover > .added > span:nth-child(odd) {
  width: 24px;
  rotate: 45deg;
  transform: translate(0);
}
</style>