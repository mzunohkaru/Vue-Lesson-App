<template>
  <div>
    <!-- * Composition API -->
    <!-- <h1>Count {{ getCount() }}</h1>
    <button @click="increment">Increment</button>
    <p>User {{ user.name }} {{ user.age }}</p> -->
    <!-- <button @click="increment">Increment</button>
    <p>Double {{ double }}</p> -->

    <!-- * ディレクティブ -->
    <!-- <div v-show="isLoggedIn">
      <p>Hello</p>
    </div>
    <div v-show="!isLoggedIn">
      <p>Please login</p>
    </div>
    <button @click="isLoggedIn = !isLoggedIn">Logged</button>

    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item.name }}
      </li>
    </ul>

    <img :src="imageUrl" alt="placeholder" />
    <button @click="changeImage">Change Image</button>`` -->

    <!-- * デザイン -->
    <div class="card">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue'

// * Composition API
// import { useCounter } from './app'
// const { increment, getCount, user } = useCounter()

// * script setup
// const base = ref(1)
// const tax = 1.1;
// // computed >>>> watch
// const double = computed(() => base.value * tax)
// function increment() {
//   base.value++
// }
// // 外部連携の場合は watch を使う
// watch(base, (newVal, oldVal) => {
//   console.log('base', newVal, oldVal)
// })

// * ディレクティブ
// const isLoggedIn = ref(true)
// const items = ref([
//   { i: 1, name: 'Item 1' },
//   { i: 2, name: 'Item 2' },
//   { i: 3, name: 'Item 3' },
// ])
// const imageUrl = ref('https://placehold.jp/150x150.png')
// const changeImage = () => {
//   imageUrl.value = 'https://placehold.jp/300x300.png'
// }

// * デザイン
const title = 'Hello'
const description = 'This is a card'
</script>

<style scoped>
.card {
  background-color: aquamarine;
  padding: 20px;
  border: 1px solid #000;
  border-radius: 10px;
  margin: 10px;
}

.card h1 {
  color: red;
}
</style>