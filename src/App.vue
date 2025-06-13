<template>
  <header>
    <nav>
      <router-link to="/login">ログイン</router-link>
      <router-link to="/todo">Todo</router-link>
    </nav>
  </header>
  <main>
    <router-view />
  </main>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>
