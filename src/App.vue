<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/header.vue'
import Validation from '@/components/validation/validation.vue'
</script>

<template>
  <Validation ></Validation>
  <Header />
  <RouterView />

  <footer>
    <div>
      <img src="@/assets/logo-white.png" alt="logo footer" width="200">
    </div>
    <div id="footerSocial-container">
      <span>Redes sociais</span>
      <div id="footerSocialIcon-container">
        <i class="fa-brands fa-x-twitter" style="color: #ffffff;"></i>
        <i class="fa-brands fa-discord" style="color: #ffffff;"></i>
      </div>
    </div>
  </footer>
</template>

<style>
footer {
  display: flex;
  bottom: 0;
  width: 100%;
  height: 200px;
  justify-content: space-around;
  align-items: center;
  background-color: var(--black-color);
}

#footerSocial-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: var(--white-color);
}

#footerSocialIcon-container {
  display: flex;
  gap: 15px;
}
</style>