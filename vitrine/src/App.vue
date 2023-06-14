<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import CartIcon from './components/icons/IconCart.vue';
import IconAbout from './components/icons/IconAbout.vue';
import { computed } from 'vue';
import { useCheckoutStore } from './store/checkoutStore';

const checkoutStore = useCheckoutStore();

const articleCount = computed(() => checkoutStore.articleCount);

checkoutStore.initData();
</script>

<template>
  <header>
      <RouterLink to="/" class="logo">
        <h1>Van</h1>
        <h1>Butsele</h1>
        <h1>Diane</h1>
      </RouterLink>

      <nav>

        <RouterLink to="/about" class="navlink">
          <div class="about">
            <IconAbout height="24px"/>
          </div>
        </RouterLink>

        <RouterLink to="/checkout" class="panier">
          <div class="cartContainer">
            <CartIcon height="24px"/>
          </div>
          <div class="itemNb">
            <h4>{{articleCount}}</h4>
          </div>
        </RouterLink>

      </nav>

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
  width: 100vw;
  height: 64px;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-background);
}

nav {
  display: flex;
  transform: translateX(-8px);
}

.panier {
  display: flex;
}

h1 {
  margin-left: 8px;
  font-family: 'CopperPlate Goth';
  color: var(--color-foreground);
  font-size: var(--font-size-medium);
}

.logo {
  display: flex;
  transform: translateX(-100%);
  opacity: 0;
  animation: normallogo .2s linear forwards;
}

.logo > h1:nth-child(2) {
  transform: translateX(-100%);
  animation: normal .2s linear .2s forwards;
}

.logo > h1:nth-child(3) {
  transform: translateX(-255%);
  animation: normal .2s linear .3s forwards;
}

@keyframes normal {
  100% {
    transform: translateX(0);
  }
}

@keyframes normallogo {
  60% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.cartContainer {
  border: solid 1px var(--color-foreground);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  margin: 8px;
}

#fullcart {
  transform: translateX(-2px);
}

.navlink {
  color: var(--color-foreground);
  height: 48px;
  margin: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

h2 {
  height: 100%;
  width: 100%;
  padding: 0 8px;
  display: flex;
  align-items: center;
}

.itemNb {
  position: absolute;
  padding: 4px;
  width: 32px;
  height: 32px;
  transform: translate(38px, 38px);
  border-radius: 50%;
  background-color: var(--color-foreground);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-background);
}

hr {
  position: sticky;
  top: 64px;
  width: 80vw;
  margin: 0 10vw;
  stroke: var(--color-foreground);
}

.about {
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(8px);
}

nav > .router-link-active > .about {
  background-color: var(--color-foreground);
}

nav > .router-link-active > .cartContainer {
  background-color: var(--color-foreground);
  color: var(--color-background);
}

nav > .router-link-active > h2 {
  background-color: var(--color-foreground);
  color: var(--color-background);
}


main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h3 {
  border-radius: 6px;
  padding: 4px;
  margin: 4px;
  transition: all .2s ease-in-out;
  color: var(--color-foreground);
  font-size: var(--font-size-medium-small);
}

@media (max-width: 768px) {
  .logo {
    flex-direction: column;
  }

  h1 {
    font-size: var(--font-size-medium-small);
    height: 20px;
  }

  h2 {
    font-size: var(--font-size-small);
  }
}
</style>
