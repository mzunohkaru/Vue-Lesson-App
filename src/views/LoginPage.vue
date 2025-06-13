<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-title">{{ title }}</h1>
      <form @submit.prevent="viewModel.handleLogin" class="login-form">
        <div class="form-group">
          <label for="email" class="form-label">メールアドレス</label>
          <input
            id="email"
            v-model="viewModel.email.value"
            type="email"
            class="form-input"
            placeholder="example@email.com"
            required
          />
        </div>
        <div class="form-group">
          <label for="password" class="form-label">パスワード</label>
          <input
            id="password"
            v-model="viewModel.password.value"
            type="password"
            class="form-input"
            placeholder="パスワードを入力してください"
            required
          />
        </div>
        <div class="demo-hint">
          <p><strong>デモ用アカウント:</strong></p>
          <p>Email: tanaka@gmail.com</p>
          <p>Password: SecurePass123!</p>
        </div>
        <div v-if="viewModel.errorMessage.value" class="error-message">
          {{ viewModel.errorMessage.value }}
        </div>
        <div v-if="viewModel.successMessage.value" class="success-message">
          {{ viewModel.successMessage.value }}
        </div>
        <button type="submit" class="login-button" :disabled="viewModel.isLoading.value">
          {{ viewModel.isLoading.value ? 'ログイン中...' : 'ログイン' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'; // Keep for title if it remains static in the view
import { useLoginViewModel } from '@/viewmodels/loginViewModel';

const title = ref('ログイン'); // This could also be moved to ViewModel if it's dynamic
const viewModel = useLoginViewModel();

// All other refs (email, password, errorMessage, etc.) and handleLogin logic
// are now managed by useLoginViewModel.
</script>

<style scoped>
/* Styles remain the same */
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(10px);
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 2rem;
  font-weight: 600;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-weight: 500;
  color: #555;
  font-size: 0.9rem;
}

.form-input {
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;
}

.form-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input::placeholder {
  color: #aaa;
}

.demo-hint {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 12px;
  font-size: 0.85rem;
  color: #6c757d;
}

.demo-hint p {
  margin: 2px 0;
}

.demo-hint strong {
  color: #495057;
}

.login-button {
  padding: 14px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.login-button:active {
  transform: translateY(0);
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.error-message {
  background-color: #fee;
  color: #c33;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #fcc;
  font-size: 0.9rem;
}

.success-message {
  background-color: #efe;
  color: #393;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #cfc;
  font-size: 0.9rem;
}
</style>
