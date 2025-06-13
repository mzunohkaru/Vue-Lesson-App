<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h1 class="error-title">ページが見つかりません</h1>
      <p class="error-message">
        お探しのページは存在しないか、移動された可能性があります。
      </p>
      <div class="action-buttons">
        <router-link to="/login" class="home-button">
          ホームに戻る
        </router-link>
        <router-link to="/todo/1" class="todo-button">
          Todoページへ
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.not-found-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  padding: 20px;
}

.not-found-content {
  text-align: center;
  background: white;
  padding: 60px 40px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

.error-code {
  font-size: 120px;
  font-weight: bold;
  color: #f5576c;
  margin-bottom: 20px;
  line-height: 1;
}

.error-title {
  font-size: 28px;
  color: #333;
  margin-bottom: 16px;
  font-weight: 600;
}

.error-message {
  font-size: 16px;
  color: #666;
  margin-bottom: 40px;
  line-height: 1.6;
}

.action-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.home-button,
.todo-button {
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.home-button {
  background: #667eea;
  color: white;
}

.home-button:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
}

.todo-button {
  background: #f5576c;
  color: white;
}

.todo-button:hover {
  background: #e74c3c;
  transform: translateY(-2px);
}
</style>
