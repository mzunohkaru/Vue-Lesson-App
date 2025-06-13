import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserModel } from '@/models/userModel'; // Corrected path
// No longer need useUserStore, verifyPassword, UserCredentials directly here

export function useLoginViewModel() {
  const email = ref('');
  const password = ref('');
  const errorMessage = ref<string | null>(null);
  const successMessage = ref<string | null>(null);
  const isLoading = ref(false);

  const router = useRouter();
  const userModel = useUserModel();

  const handleLogin = async () => {
    errorMessage.value = null;
    successMessage.value = null;
    isLoading.value = true;

    try {
      // Simulate loading for UX, actual delay handled by model/API if any
      await new Promise(resolve => setTimeout(resolve, 500));

      const result = await userModel.login(email.value, password.value);

      if (result.success && result.user) {
        successMessage.value = `${result.user.name}さん、ログインしました！`;
        email.value = ''; // Reset form
        password.value = ''; // Reset form

        // Navigate after a short delay to show success message
        setTimeout(() => {
          router.push('/todo');
        }, 500);
      } else {
        throw new Error(result.message || 'ログインに失敗しました');
      }
    } catch (error) {
      if (error instanceof Error) {
        errorMessage.value = error.message;
      } else {
        errorMessage.value = '予期せぬエラーが発生しました';
      }
    } finally {
      isLoading.value = false;
    }
  };

  return {
    email,
    password,
    errorMessage,
    successMessage,
    isLoading,
    handleLogin,
    // Expose reactive properties from userModel if needed by the view directly
    // For example: isLoggedIn: userModel.isAuthenticated
  };
}
