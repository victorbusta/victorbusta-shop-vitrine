<script setup lang="ts">
import { onMounted, ref } from 'vue';
import IconImgLoader from './icons/IconImgLoader.vue';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
})

const imgRef = ref();
const loadingRef = ref();

onMounted(() => {
  const options = {
    root: null, // Use the viewport as the root
    rootMargin: '0px',
    threshold: 0 // Trigger when at least 50% of the component is visible
  };

  const observer = new IntersectionObserver(handleIntersection, options);
  observer.observe(imgRef.value);
});

function handleIntersection(entries: IntersectionObserverEntry[]) {
  entries.forEach((entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('over-top');
      entry.target.classList.remove('under-bot');
      loadingRef.value.classList.remove('over-top');
      loadingRef.value.classList.remove('under-bot');

      loadImage(entry.target as HTMLImageElement);
    } else if (entry.boundingClientRect.top < 0) {
      entry.target.classList.add('over-top');
      loadingRef.value.classList.add('over-top');
    } else if (entry.boundingClientRect.bottom > window.innerHeight) {
      entry.target.classList.add('under-bot');
      loadingRef.value.classList.add('under-bot');
    }
  });
}

const imgloader = (src: string) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  })  
;

const loadImage = (imgElement: HTMLImageElement) => {
  imgloader(props.src).then((image) => {
    imgElement.srcset = (image as HTMLImageElement).src;
    loadingRef.value.classList.add('hide');
  });
}

</script>

<template>
  
  <img :src="props.placeholder" :placeholder="props.placeholder" alt="" ref="imgRef">
  <div ref="loadingRef"><IconImgLoader/></div>
</template>

<style scoped>
  div {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    opacity: 1;
    z-index: 1;
    transition: all 200ms ease-in-out;
  }

  .hide {
    opacity: 0;
    z-index: -1;
  }

  img {
    width: 100%;
    transition: all 200ms ease-in-out;
    opacity: 1;
    cursor: pointer;
  }

  .over-top {
    transform: translateY(-16px);
    opacity: 0;
  }

  .under-bot {
    transform: translateY(16px);
    opacity: 0;
  }

  img:hover {
    scale: 1.05;
  }
</style>