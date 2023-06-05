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
          <CartIcon/>
          <h3>Panier</h3>
          <div class="itemNb">
            <h4>{{articleCount}}</h4>
          </div>
        </RouterLink>
      </nav>
    </div>
  </header>

  <hr>

  <main>
    <RouterView />
  </main>

  <hr>

  <footer>
    <h4 style="text-align: center;">
    Les droits d'auteur des photos sont détenus par Van Butsele Diane et leur commercialisation n'est autorisée qu'en sa possession.
    </h4>
  </footer>
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
  background: var(--color-background);

}

.header {
  position: sticky;
  top: 0;
  width: 95%;
  padding: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  font-family: 'CopperPlate Goth';
  color: var(--color-foreground);
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

nav > a {
  margin-right: 32px;
  border: solid 1px var(--color-foreground);
  width: 108px;
  height: 48px;
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
  font-size: var(--font-size-medium-small);
}

.itemNb {
  position: absolute;
  padding: 4px;
  transform: translate(92px, 24px);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--color-foreground);
  display: flex;
  align-items: center;
  justify-content: center;
}

nav > .router-link-active {
  background-color: var(--color-foreground);
  color: var(--color-background);
}

nav > .router-link-active > h3 {
  color: var(--color-background);
}

@media only screen and (max-width: 767px) {
  h1 {
    font-size: var(--font-size-medium-medium);
  }
}
</style>
