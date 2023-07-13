<script setup lang="ts">
import type { OrderFormat, Print, Format } from '@/interfaces/print';
import { useCheckoutStore } from '@/store/checkoutStore';

const checkoutStore = useCheckoutStore();

const props = defineProps({
  print: { 
    type: Object as () => Print,
    required: true 
  },
})

const getStoredNb = (format: Format) => checkoutStore.getStoredNb(format.id);

const addToCart = () => {
  document.querySelectorAll('#selection').forEach(selectElem => {
    const formatId = Number(selectElem.getAttribute('value'))
    const qty = Number(selectElem.querySelector('select')?.value);
    const withFrame = Boolean(selectElem.querySelector('input')?.checked);
    const format = props.print.formats.filter((format: Format) => format.id === formatId);

    checkoutStore.updateFormats({
      format: format[0],
      with_frame: withFrame,
      qty: qty
    });
  });
};

defineExpose({
  addToCart,
});
</script>

<template>
  <h1>Formats disponible :</h1>

  <div id="format" v-for="format in props.print.formats" :key="format.id">
    <div class="line">
      <span>
        <h2>{{ format.size }} (sans cadre)<br>{{ format.price }} €</h2>
        <h2 id="frame">{{ format.size_frame }} (avec cadre)<br>{{ format.price_frame }} €</h2>
      </span>

      <div id="selection" :value="format.id">
        <span>
          <h5>avec cadre</h5>
          <input id="with_frame" type="checkbox">
        </span>
        <select name="quantity" id="print_quantity">
          <option value="0">0</option>
          <option v-for="qty in print.current_number" :key="qty" :value="qty" :selected="qty === getStoredNb(format)">{{ qty }}</option>
        </select>
      </div>

    </div>
  </div>
</template>

<style scoped>
  #format {
    margin: 8px 8px;
  }

  h1 {
    margin-top: 8px;
    font-size: 24px;
    width: fit-content;
    margin-left: 4px;
    border-bottom: 1px solid var(--color-foreground);
    line-height: 16px;
  }

  h2 {
    font-size: 18px;
    line-height: 16px;
  }

  #frame {
    font-size: 16px;
    opacity: .8;
  }

  .line {
    display: flex;
    justify-content: space-between;
  }

  #selection {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
  }

  #selection > span {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
  }

  h5 {
    font-size: 12px;
    line-height: 8px;
    margin-bottom: 4px;
  }

  input {
    height: 16px;
    width: 16px;
  }

  select {
    height: 24px;
    overflow: auto;
  }
</style>