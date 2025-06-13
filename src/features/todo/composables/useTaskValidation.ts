import { computed } from 'vue'
import { useField } from 'vee-validate'
import * as yup from 'yup'

export function useTaskValidation() {
  const titleSchema = yup
    .string()
    .required('タスクを入力してください')
    .max(15, 'タスクは15文字以内で入力してください')
    .matches(/^[a-zA-Z0-9 ]+$/, '英数字とスペースのみ利用できます')
    .test('no-trim', '先頭・末尾にスペースを入れないでください', (value) => {
      if (!value) return true
      return value.trim() === value
    })

  const { value: title, errorMessage } = useField<string>('title', titleSchema)

  const hasError = computed(() => Boolean(errorMessage.value))

  const resetField = () => {
    title.value = ''
  }

  return {
    title,
    errorMessage,
    hasError,
    resetField,
  }
}
