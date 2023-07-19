<script setup lang="ts">
</script>

<template>
  <div id="toast">
    <div class="cart-container">
      <svg id="fullcart" width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle id="BW" cx="20.5" cy="52" r="5" class="white"/>
        <circle id="BW" cx="47" cy="52" r="5" class="white"/>
        <path id="cart" d="M53.8204 44C48.8851 44 19.2735 44 14.3382 44C9.40291 44 5.08455 36.7396 13.0854 36.7396M9.32699 14.9583C9.32699 14.9583 11.6589 14.9583 13.1044 14.9583C13.9147 14.9583 14.7381 14.9583 15.572 14.9583C30.6645 14.9583 49.195 14.9583 56.288 14.9583C57.4247 14.9583 58.2677 14.9583 58.7557 14.9583C62.4571 14.9583 62.4571 14.9583 61.3704 18.5885M13.0854 36.7396H16.8058C16.8058 36.7396 17.7264 36.7396 19.2735 36.7396C25.7684 36.7396 43.3048 36.7396 50.1189 36.7396C51.3038 36.7396 52.1645 36.7396 52.5866 36.7396C56.0139 36.7396 56.0139 36.7396 57.0592 33.1094M13.0854 36.7396L11.2062 25.8489L8.28299 8.90792C5.77221 7.67906 4.38627 7.7158 2 8.90792M57.0592 33.1094C57.7699 30.6412 60.2836 22.2187 61.3704 18.5885M57.0592 33.1094L58.137 29.4791L59.2148 25.8489L60.2926 22.2187L61.3704 18.5885M16.8058 22.2187H54.2317M18.0396 29.4791L52.1753 29.4791" stroke-width="4" stroke-linecap="round"/>
      </svg>
    </div>
    <h1>
      Ajouté 
    </h1>
  </div>
</template>

<style scoped>
  #toast {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--color-foreground);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  h1 {
    position: absolute;
    font-size: 24px;
    color: var(--color-background);
  }

  .cart-container > svg > .white {
    fill: var(--color-background);
  }

  .cart-container > svg > #cart {
    stroke: var(--color-background);
    stroke-width: 4; 
    stroke-linecap: round;
  }

  svg {
    animation: rotate .2s ease-in .2s forwards;
  }

  @keyframes rotate {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(30deg);
    }
  }

  .cart-container {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 8px;
    background-color: var(--color-foreground);
    z-index: 1;
    box-shadow: -10px 0px 5px var(--color-foreground);
    animation: movex .5s ease-in .3s forwards;
  }

  @keyframes movex {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100%);
    }
  }

</style>
