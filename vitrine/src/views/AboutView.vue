<script setup lang="ts">
import IconMail from '@/components/icons/IconMail.vue'
import IconPhone from '@/components/icons/IconPhone.vue'
import IconInsta from '@/components/icons/IconInsta.vue'
</script>

<template>
  <div id="about">

    <div id="intro">
      <p>
        <span>Diane</span> Van Butsele est actuellement une jeune étudiante en photographie. Elle a commencé par des études d’histoire, puis sa passion prit au fur et à mesure le dessus. Elle souhaite désormais se professionaliser pour ce 8ème art.
      </p>
      <p>
        <span>Attirée</span> par les scènes quotidiennes tout en y cherchant de la beauté, la photographie vernaculaire fait partie intégrante de son style. Grande amoureuse de la marche, l’errance est également visible dans nombreuses de ses oeuvres.
      </p>
      <p>
        <span>N’ayant</span> pas encore un style bien défini, Diane vous invite à découvrir ses univers et est fière de pouvoir vous toucher à travers son travail et de le voir proner sur vos murs.
      </p>
      <h2>
        Bonne visite.
      </h2>
    </div>

    <div class="contact">
      <a href="mailto:vanbutseldiane@gmail.com"><IconMail height="32px"/><h2>vanbutseldiane@gmail.com</h2></a>
      <a href="tel:+33619336936"><IconPhone height="32px"/><h2>+33 6 19 33 69 36</h2></a>
      <a href="https://www.instagram.com/vaanbutsele/"><IconInsta height="32px"/><h2>vaanbutsele</h2></a>
    </div>

  </div>
</template>

<style scoped>
#about {
  width: 60vw;
  min-height: calc(100vh - 64px);
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  /* text-align: justify; */
}

h1 {
  width: 100%;
}

p {
  margin-bottom: 8px;
}

p > span {
  margin-left: 2em;
}

.contact {
  width: 110%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

a {
  width: 33%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  color: var(--color-foreground);
}

a:hover {
  text-decoration: underline;
}

h2 {
  font-size: 16px;
}

@media (max-width: 768px) {
  #about {
    width: 80vw;
  }
}

@media (max-width: 425px) {
  h2 {
    display: none;
  }
}
</style>