<script setup lang="ts">
import { ref, reactive, computed, watchEffect, watch } from 'vue'

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
  email: 'taro@example.com',
  bio: 'hello',
})

function changeAge(event: MouseEvent) {
  console.log(event)
  console.log('Before:', info2)
  info2.age += 1
  console.log('After:', info2)
}

const items = ref(['バナナ', 'apple', 'orange'])
const googleURL = 'https://www.google.com'
const vueId = 'vue-id'

function handleSubmit(event: Event) {
  event.preventDefault()
  console.log('Form submitted')
}
function handleClick() {
  // event.stopPropagation()
  console.log('Button clicked')
}
function handleSpecialLink(event: Event) {
  event.preventDefault()
  console.log('Special link clicked')
}
const count = ref(0)
const evaluation = computed(() => {
  console.log('computed')
  return count.value > 3 ? 'Good' : 'Bad'
})
watchEffect(() => {
  console.log('watchEffect')
  console.log(count.value)
})
watch(count, (newVal, oldVal) => {
  console.log('watch')
  console.log(newVal)
  console.log(oldVal)
})
const isRed = ref(true)
const isBlue = ref(true)
</script>

<template>
  <div>
    <h1>Hello {{ info.name }}</h1>
    <h1>{{ info2.bio }} {{ info2.name }}</h1>
    <button @click="info2.name = 'Jiro'" @mouseover="changeAge">Change Name</button>
    <p>Price: {{ price }}</p>
    <button @click="increasePrice">Increase Price</button>
    <ul>
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
    <div>
      {{ price > 10 ? 'high' : 'low' }}
    </div>
    <a :id="vueId" :href="googleURL" target="_blank">Google</a>
    <!-- 属性消失 -->
    <!-- <a :id="undefined" :href=false :target="undefined">Google</a> -->
    <form @submit.prevent="handleSubmit">
      <button @click.stop="handleClick">
        <a @click.prevent.stop="handleSpecialLink"> Google </a>
      </button>
    </form>

    <form @submit="handleSubmit">
      <button @click="handleClick">
        <a @click="handleSpecialLink"> Google Fake </a>
      </button>
    </form>

    <p>Count: {{ count }}</p>
    <input type="text" @keyup.enter="count++" @keyup.space="count++" />
    <p>Evaluation: {{ evaluation }}</p>
    <div :class="['red', 'bg-blue']">Red</div>
    <div :class="{ red: isRed, 'bg-blue': isBlue }">Red</div>
    <button @click="isRed = !isRed">Red</button>
    <button @click="isBlue = !isBlue">Blue</button>
    <div :style="{ color: 'red', fontSize: '20px' }">Red</div>
  </div>
</template>

<style scoped>
.red {
  color: red;
}
.bg-blue {
  background-color: blue;
}
h1 {
  color: red;
}
</style>
