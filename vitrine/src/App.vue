<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import DianeLogo from './components/logos/DianeLogo.vue';
import CartIcon from './components/icons/IconCart.vue';
import { computed } from 'vue';
import { useCheckoutStore } from './store/checkoutStore';

const checkoutStore = useCheckoutStore();

const articleCount = computed(() => checkoutStore.articleCount);

checkoutStore.initData();
</script>

<template>
  <header>
    <div class="header">
      <RouterLink to="/">
        <h1>Van Butsele Diane</h1>
      </RouterLink>
      <nav>
        <RouterLink to="/checkout">
          <h3 class="itemNb">{{articleCount}}</h3>
          <CartIcon/>
          <h3>Panier</h3>
        </RouterLink>
      </nav>
    </div>
  </header>

  <hr>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  width: 100%;
  height: 72px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  position: sticky;
  top: 0;
  width: 100%;
  padding: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-background);
  z-index: 1;
}

hr {
  position: sticky;
  top: 72px;
  width: 90%;
  margin: 0 5%;
  stroke: var(--color-foreground);
}

h1 {
  margin-left: 32px;
  font-family: 'CopperPlate Goth';
  color: var(--color-foreground);
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bg {
  position: fixed;
  top: 110px;
  background: linear-gradient(180deg,var(--color-foreground) 0%, var(--color-foreground-soft) 50%, var(--color-background) 100%);
  width: 100%;
  height: 40vh;
}

nav > a {
  margin-right: 32px;
  border: solid 1px var(--color-foreground);
  width: 108px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  margin: 8px;
  color: #FFFFFF;
}


h3 {
  border-radius: 6px;
  padding: 4px;
  margin: 4px;
  transition: all .2s ease-in-out;
  color: var(--color-foreground);
}

.itemNb {
  position: absolute;
  margin-left: 16px;
  opacity: 0;
  transition: all .2s ease-in-out;
}

nav > .router-link-active {
  background-color: var(--color-foreground);
  color: var(--color-background);
}

nav > .router-link-active > h3 {
  color: var(--color-background);
}

nav:hover > a > svg {
  transform: translateX(150%);
}

nav:hover > a > .itemNb {
  opacity: 1;
}

nav:hover > a > h3 {
  opacity: 0;
}

@media only screen and (max-width: 767px) {
  h1 {
    font-size: var(--font-size-medium-medium);
  }
}
</style>
