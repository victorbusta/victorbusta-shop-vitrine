<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import CartIcon from './components/icons/IconCart.vue';
import MainLogo from './components/MainLogo.vue';
import { computed, ref, watch } from 'vue';
import { useCheckoutStore } from './store/checkoutStore';

const checkoutStore = useCheckoutStore();

const articleCount = computed(() => checkoutStore.articleCount);

checkoutStore.initData();

// scroll indicator handling and paralax
const scrollIndicatorWidth = ref(0);
const scrollIndicatorStyle = ref('');

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  scrollIndicatorWidth.value = progress;
};

window.addEventListener('scroll', handleScroll);

watch(scrollIndicatorWidth, () => {  
  scrollIndicatorStyle.value = `width: ${scrollIndicatorWidth.value}%`;
});
</script>

<template>
  <header>
      <RouterLink to="/">
        <MainLogo/>
      </RouterLink>

      <nav>

        <RouterLink to="/about" class="navlink">
          <h2>À propos</h2>
        </RouterLink>

        <RouterLink to="/checkout" class="panier">
          <div class="cartContainer">
            <CartIcon height="24px"/>
            <div class="itemNb">
              <h4>{{articleCount}}</h4>
            </div>
          </div>
        </RouterLink>

      </nav>

  </header>

  <div class="scroll-indicator" :style="scrollIndicatorStyle"></div>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 48px;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-background);
}

.scroll-indicator {
  position: fixed;
  top: 48px;
  left: 0;
  height: 4px;
  width: 0;
  background-color: var(--color-foreground);
  z-index: 1;
}

main {
  position: relative;
  top: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

nav {
  position: relative;
  display: flex;
  align-items: center;
  transform: translateX(-22.4px);
}

.cartContainer {
  position: relative;
  border: solid 1px var(--color-foreground);
  width: 32px;
  height: 32px;
  display: flex;

  align-items: center;
  margin: 8px;
}

.navlink {
  color: var(--color-foreground);
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navlink > h2 {
  height: 100%;
  width: 100%;
  font-size: 14px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  font-family: 'CopperPlate Goth';
}

.itemNb {
  position: absolute;
  top: 70%;
  left: 70%;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--color-foreground);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-background);
}

nav > .router-link-active > .cartContainer {
  background-color: var(--color-foreground);
  color: var(--color-background);
}

nav > .router-link-active > h2 {
  background-color: var(--color-foreground);
  color: var(--color-background);
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
  h2 {
    font-size: var(--font-size-small);
  }
}
</style>
