<script setup lang="ts">
import { useCheckoutStore } from '../store/checkoutStore';
import { ref } from 'vue'
import ImgComponent from '@/components/ImgComponent.vue';
import ArrowIcon from '@/components/icons/IconArrow.vue';
import { RouterLink } from 'vue-router'
import type { Format, OrderFormat } from '@/interfaces/print';

const checkoutStore = useCheckoutStore();

const formats = ref(checkoutStore.formats);

const getStored = (format: Format) => checkoutStore.getStored(format.id);

const addToCart = (format: OrderFormat) => {
  document.querySelectorAll('#selection').forEach(selectElem => {
    const qty = Number(selectElem.querySelector('select')?.value);

    if (Number(selectElem.getAttribute('value')) === format.format.id) {
      checkoutStore.updateFormats({
        format: format.format,
        with_frame: format.with_frame,
        qty: qty,
        documentUrl: format.documentUrl,
        title: format.title,
        original_qty: format.original_qty,
      });
    }
  });
};

const getTotalPrice = () => {
  let totalPrice = 0;

  formats.value.forEach( format => {
    totalPrice += (format.with_frame ? format.format.price_frame : format.format.price) * format.qty
  });

  return totalPrice;
}
</script>

<template>
  <header>
    <h1>Panier</h1>
  </header>

  <main>
    <div id="line" v-for="format in formats" :key="format.format.id">
      <h2>{{ format.title }}</h2>
      <div id="line-content">
        <div>
          <ImgComponent :src="format.documentUrl" :placeholder="format.documentUrl.replace('images', 'lite')"/>
        </div>
        <span id="format">
          <h2>Format</h2>
          <h3>{{ format.with_frame ? format.format.size_frame : format.format.size }}</h3>
          <h4 v-if="format.with_frame">avec cadre</h4>
        </span>
        <div id="selection" :value="format.format.id">
          <div>
            <h4>qté</h4>
            <select name="quantity" id="print_quantity" @change="addToCart(format)">
              <option value="0">0</option>
              <option v-for="qty in format.original_qty" :key="qty" :value="qty" :selected="qty === getStored(format.format)?.qty">{{ qty }}</option>
            </select>
          </div>
          <div>
            <h4>Prix</h4>
            <h4>:</h4>
            <h4>{{ ref((format.with_frame ? format.format.price_frame : format.format.price) * format.qty) }}€</h4>
          </div>
        </div>
      </div>
    </div>

    <div id="total-price">
      <h1>Prix Total: {{ getTotalPrice() }} €</h1>
    </div>
  </main>

  <footer>
    <RouterLink id="arrow" to="/customer">
      <ArrowIcon/>
    </RouterLink>

    <RouterLink to="/customer">
      <h1>Commander</h1>
      <h1>Commander</h1>
    </RouterLink>
  </footer>
</template>

<style scoped>
header > h1 {
  font-size: 24px;
  line-height: 16px;
  border-bottom: 1px solid var(--color-foreground);
}

main {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#line {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  width: 100%;
}

#line > h2 {
  font-size: 14px;
  line-height: 12px;
  width: calc(100% - 16px);
}

#line-content {
  position: relative;
  width: 100%;
  height: 64px;
  padding: 0 8px;
  display: flex;
  align-items: center;
}

#line-content > div {
  width: 32px;
}

#format {
  margin: 0 8px;

}

#format > h2 {
  font-size: 16px;
  line-height: 14px;
}

#format > h3 {
  font-size: 16px;
  line-height: 14px;
  opacity: .6;
}

#format > h4 {
  font-size: 12px;
  line-height: 10px;
  opacity: .6;
}

#selection {
  position: absolute;
  right: 94px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 8px;
}

#selection > div {
  display: flex;
  width: fit-content;
}

#selection > div > h4 {
  margin-right: 8px;
  width: fit-content;
}

#total-price {
  position: relative;
  width: 90%;
  display: flex;
  justify-content: end;
  border-top: 1px solid var(--color-foreground)
}

#total-price > h1 {
  font-size: 18px;
  line-height: 14px;
  border: 1px solid var(--color-foreground);
  width: fit-content;
  padding: 8px;
  margin: 16px 0;
}

footer {
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
}

footer > a {
  width: 204px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-foreground);
}

footer > a > h1 {
  position: absolute;
  font-size: 24px;
  line-height: 16px;
  padding: 16px;
  border: 1px solid var(--color-foreground);
  background-color: var(--color-foreground);
}

footer > a > h1:last-child {
  transform: translate(4px, -4px);
  transition: all .1s ease-in-out;
  background-color: var(--color-background);
}

footer > a:hover > h1:last-child {
  transform: translate(0);
}

#arrow {
  position: absolute;
  left: 16px;
  width: 32px;
  height: 32px;
}
</style>
