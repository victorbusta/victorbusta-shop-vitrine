<script setup lang="ts">
import IconMail from '@/components/icons/IconMail.vue'
import IconPhone from '@/components/icons/IconPhone.vue'
import IconInsta from '@/components/icons/IconInsta.vue'
</script>

<template>
  <div class="info">
    <h1>À propos</h1>
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

  <hr>

  <div class="info">
    <div class="contact">
      <a href="mailto:vanbutseldiane@gmail.com"><IconMail height="32px"/> vanbutseldiane<wbr>@gmail.com</a>
      <a href="tel:+33619336936"><IconPhone height="32px"/>+33 6 19 33 69 36</a>
      <a href="https://www.instagram.com/vaanbutsele/"><IconInsta height="32px"/>vaanbutsele</a>
    </div>
  </div>

</template>

<style scoped>
.info {
  width: 60vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: justify;
}

p {
  margin-bottom: 8px;
}

p > span {
  margin-left: 2em;
}

hr {
  margin: 16px 0;
  height: 1px;
  width: 70vw;
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

@media (max-width: 768px) {
  .info {
    width: 80vw;
  }
}
</style>