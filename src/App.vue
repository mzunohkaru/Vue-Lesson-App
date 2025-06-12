<script setup lang="ts">
import { ref, reactive } from 'vue'

const price = ref(9.99)
function increasePrice() {
  price.value += 1
}
const info = ref({
  name: 'Taro',
  age: 20,
  email: 'taro@example.com',
})
const info2 = reactive({
  name: 'Ziro',
  age: 20,
  email: ref('taro@example.com'),
  bio: 'hello',
})
const items = ref(['バナナ', 'apple', 'orange'])
</script>

<template>
  <div>
    <h1>Hello {{ info.name }}</h1>
    <h1>{{ info2.bio }} {{ info2.name }}</h1>
    <button @click="info.name = 'Jiro'">Change Name</button>
    <p>Price: {{ price }}</p>
    <button @click="increasePrice">Increase Price</button>
    <ul>
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
    <div>
      {{ price > 10 ? 'high' : 'low' }}
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: red;
}
</style>
