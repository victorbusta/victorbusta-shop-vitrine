<template>
  <div>
    <svg id="arrowIcon" width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path id="arrow" d="M25.3818 11.7647H11.4182V8L4 16L11.4182 24V20.2353H25.3818C25.3818 20.2353 28 20.2353 28 18.3529C28 16.4706 28 11.7647 28 9.88235M25.3818 11.7647C25.3818 11.7647 28 11.7647 28 9.88235M25.3818 11.7647V8C25.3818 8 28 8 28 9.88235" stroke="black"/>
    </svg>
  </div>
</template>

<style scoped>
div {
  width: fit-content;
  height: 34px;
  border: solid 1px var(--color-foreground);
}

#arrow {
  fill: var(--color-background);
  stroke: var(--color-foreground);
}

div:hover {
  background-color: var(--color-foreground);
}

div:hover > #arrowIcon > #arrow {
  fill: var(--color-foreground);
  stroke: var(--color-background);
}

</style>
  