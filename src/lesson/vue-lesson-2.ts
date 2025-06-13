import { ref, reactive } from 'vue'

export function useCounter() {
  const count = ref(0)
  const user = reactive({
    name: 'John',
    age: 20,
  })

  function increment() {
    count.value++
    user.age++
  }

  function getCount() {
    return count.value
  }

  return {
    increment,
    getCount,
    user,
  }
}
