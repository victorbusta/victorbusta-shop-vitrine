<script setup lang="ts">
import CartIcon from './icons/IconCart.vue';
import CloseIcon from './icons/IconClose.vue';
import { ref } from 'vue';
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

const checkoutStore = useCheckoutStore();

const checkoutAble = ref(props.checkoutAble ?? {
  id: props.print?.id,
  title: props.print?.title,
  format: props.format
} as CheckoutPrint)

const stored = ref(false);

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

if (checkoutStore.checkStored(checkoutAble.value)) {
  stored.value = true;
}
</script>

<template>
  <div class="formatwrapper">
    <h1>Taille : {{ checkoutAble.format.size }}</h1>
    <div class="pricewrapper">
      <h2>{{ checkoutAble.format.price }}</h2>
      <span class="icon" @click="!stored ? addToCart() : removeFromCart()" >
        <div class="iconwrapper" :style="'transform: translateX(' + (stored ? '74px);' : '0px);')">
          <CartIcon/>
        </div>
        <div class="iconwrapper" :style="'transform: translateX(' + (stored ? '74px);' : '0px);')">
          <CloseIcon :dark="true"/>
        </div>
      </span>
    </div>
  </div>
</template>

<style scoped>
.formatwrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

h1 {
  font-size: var(--font-size-medium);
  width: fit-content;
}

h2 {
  font-size: var(--font-size-medium-small);
  opacity: .7;
}

.pricewrapper {
  height: 100%;
  display: flex;
  align-items: center;
}

.icon {
  margin-left: 4px;
  border: solid 1px var(--color-foreground);
  width: 74px;
  height: 34px;
  display: flex;
  justify-content: flex-end;
  overflow: hidden;

}

.iconwrapper {
  min-width: 74px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all ease-in-out .2s;
}

#fullcart {
  width: 100%;
  height: 32px;
}

.iconwrapper:hover > #fullcart {
  rotate: -20deg;
}

#cross {
  width: 32px;
  height: 32px;
  rotate: 45deg;
  scale: .75;
  transition: all .2s ease-in-out;
}

.iconwrapper:hover > #cross {
  rotate: 135deg;
}

</style>