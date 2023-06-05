<script setup lang="ts">
import CartIcon from './icons/IconCart.vue';
import CloseIcon from './icons/IconClose.vue';
import { ref } from 'vue';
import { useCheckoutStore } from '../store/checkoutStore'
import { defineProps } from 'vue'
import type { Print, Format, CheckoutPrint } from '@/interfaces/print';

const props = defineProps({
  print: {
    type: Object as () => Print | null,
    required: false,
  },
  format: {
    type: Object as () => Format | null,
    required: false,
  },
  checkoutAble: {
    type: Object as () => CheckoutPrint | null,
    required: false,
  },
});

const checkoutStore = useCheckoutStore();

const checkoutAble = ref(props.checkoutAble ?? {
  id: props.print?.id,
  title: props.print?.title,
  format: props.format,
  documentUrl: props.print?.documentUrl,
} as CheckoutPrint)

const stored = ref(false);
const storedNb = ref(checkoutStore.getStoredNb(checkoutAble.value));

const addToCart = () => {
    checkoutStore.addPrint(checkoutAble.value);
    storedNb.value = checkoutStore.getStoredNb(checkoutAble.value);
}

const removeFromCart = () => {
  checkoutStore.removePrint(checkoutAble.value);
  storedNb.value = checkoutStore.getStoredNb(checkoutAble.value);
}
</script>

<template>
  <div class="formatwrapper">
    <div class="desc">
      <h2>Taille: {{ checkoutAble.format.size }}</h2>
      <h3>Prix: {{ checkoutAble.format.price }} €</h3>
    </div>

    <div class="pricewrapper">

      <span class="storeAction minus" @click="removeFromCart">
        <div></div>
      </span>

      <span class="storeAction plus" @click="addToCart">
        <div></div>
        <div></div>
      </span>

      <span class="storedNb">
        <h2>{{ storedNb }}</h2>
      </span>

    </div>
  </div>
</template>

<style scoped>
.formatwrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
}

h2 {
  font-size: var(--font-size-medium-small);
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
}

h3 {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-medium-small);
  opacity: .7;
}

.desc {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.pricewrapper {
  height: 100%;
  display: flex;
  align-items: center;
}

.storedNb {
  border: solid 1px var(--color-foreground);
  width: 32px;
  height: 32px;
  margin-left: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.storeAction {
  margin: 0 4px;
  border: solid 1px var(--color-foreground);
  height: 32px;
  width: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.storeAction > div {
  position: absolute;
  width: 60%;
  height: 10%;
  background-color: var(--color-foreground);
  border-radius: 8px;
}

.plus > div:first-child {
  rotate: 90deg;
}
</style>