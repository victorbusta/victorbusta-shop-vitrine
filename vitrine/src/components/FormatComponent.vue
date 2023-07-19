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

const getStored = (format: Format) => checkoutStore.getStored(format.id);

const addToCart = () => {
  document.querySelectorAll('#selection').forEach(selectElem => {
    const formatId = Number(selectElem.getAttribute('value'))
    const qty = Number(selectElem.querySelector('select')?.value);
    const withFrame = Boolean(selectElem.querySelector('input')?.checked);
    const format = props.print.formats.filter((format: Format) => format.id === formatId);

    checkoutStore.updateFormats({
      format: format[0],
      with_frame: withFrame,
      qty: qty,
      documentUrl: props.print.documentUrl,
      title: props.print.title,
      original_qty: props.print.initial_number,
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
      <div>
        <span>
          <h2>{{ format.size }}</h2>
          <h2 id="price">prix: {{ format.price }} €</h2>
        </span>

        <span>
          <span>
            <h3>{{ format.size_frame }}</h3>
            <h4>avec cadre</h4>
          </span>
          <h2 style="opacity: .6;" id="price">prix: {{ format.price_frame }} €</h2>
        </span>
      </div>

      <div id="selection" :value="format.id">
        <div>
          <h5>avec cadre</h5>
          <input id="with_frame" type="checkbox" :checked="getStored(format)?.with_frame">
        </div>
        <div>
          <h5>qté</h5>
          <select name="quantity" id="print_quantity">
            <option value="0">0</option>
            <option v-for="qty in print.current_number" :key="qty" :value="qty" :selected="qty === getStored(format)?.qty">{{ qty }}</option>
          </select>
        </div>
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

  .line > div > span {
    display: flex;
    margin-top: 8px;
  }

  .line > div > span > span > h3 {
    display: flex;
    font-size: 16px;
    line-height: 12px;
    opacity: .6;
  }

  .line > div > span > span > h4 {
    display: flex;
    font-size: 12px;
    line-height: 8px;
    opacity: .6;
  }

  #price {
    margin-left: 48px;
  }

  #selection {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
  }

  #selection > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-right: 8px;
    height: 48px;
  }

  h5 {
    font-size: 12px;
    line-height: 8px;
    margin-bottom: 4px;
  }

  input {
    height: 16px;
    width: 16px;
    transform: translateY(-50%);
  }

  select {
    height: 24px;
    overflow: auto;
    transform: translateY(-20%);
  }
</style>