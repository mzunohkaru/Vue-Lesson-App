# MVVM アーキテクチャ ドキュメント

## 概要

この Vue.js アプリケーションは、MVVM（Model-View-ViewModel）アーキテクチャパターンに従って再構築されており、関心事の明確な分離と保守性の向上を提供します。

## アーキテクチャの原則

### MVVM パターン
- **Model**: データエンティティとデータアクセスのためのビジネスロジック
- **View**: 最小限のロジックを持つ純粋なプレゼンテーションコンポーネント
- **ViewModel**: Pinia ストアを使用したステート管理とデータ変換

### 主な利点
- 関心事の明確な分離
- テスタビリティの向上
- より良いコード構成
- 保守性の向上
- スケーラブルなアーキテクチャ

## ディレクトリ構造

```
src/
├── features/                   # 機能優先の構成
│   └── todo/                   # Todo 機能モジュール
│       ├── models/             # Model レイヤー - データエンティティとリポジトリ
│       │   ├── TaskModel.ts    # タスクエンティティとリポジトリインターフェース
│       │   └── TaskRepository.ts # タスクデータアクセス実装
│       ├── viewmodels/         # ViewModel レイヤー - ステート管理
│       │   └── useTodoStore.ts # Todo ステート用 Pinia ストア
│       ├── composables/        # 再利用可能なビジネスロジック
│       │   ├── useTaskValidation.ts # フォームバリデーションロジック
│       │   └── useTaskOperations.ts # タスク操作ヘルパー
│       └── views/              # View レイヤー - プレゼンテーションコンポーネント
│           ├── TodoView.vue    # メイン Todo ページコンポーネント
│           └── components/     # 機能固有のコンポーネント
│               ├── TaskForm.vue
│               ├── TaskList.vue
│               └── TaskItem.vue
├── shared/                     # 共有ユーティリティとコンポーネント
│   ├── stores/                 # グローバルストア
│   │   └── useUserStore.ts     # ユーザー認証ストア
│   └── types/                  # 共有型定義
│       ├── user.ts
│       └── task.ts
├── pages/                      # ルートレベルのページ（レガシー）
├── components/                 # グローバルコンポーネント（レガシー）
├── types/                      # グローバル型（レガシー）
└── router/                     # アプリケーションルーティング
```

## レイヤーの責任

### Model レイヤー (`src/features/todo/models/`)

**目的**: データ構造を定義し、データアクセス操作を処理します。

**コンポーネント**:
- `TaskModel.ts`: Task エンティティと TaskRepository インターフェースを定義
- `TaskRepository.ts`: データアクセス操作（CRUD）を実装

**責任**:
- データエンティティの定義
- ビジネスルールの実施
- モデルレベルでのデータ検証
- リポジトリパターンの実装
- データ永続化の抽象化

**例**:
```typescript
// TaskModel.ts
export interface Task {
  readonly id: string
  title: string
  completed: boolean
}

export class TaskEntity implements Task {
  // ビジネスロジック用のエンティティメソッド
  toggleCompletion(): TaskEntity { ... }
  updateTitle(newTitle: string): TaskEntity { ... }
}
```

### ViewModel レイヤー (`src/features/todo/viewmodels/`)

**目的**: アプリケーションの状態を管理し、Model と View レイヤー間の調整を行います。

**コンポーネント**:
- `useTodoStore.ts`: Todo アプリケーション状態を管理する Pinia ストア

**責任**:
- Pinia を使用したステート管理
- Model 操作の調整
- View 用の計算プロパティの公開
- エラーハンドリングとローディング状態
- ビジネスロジックのオーケストレーション

**例**:
```typescript
// useTodoStore.ts
export const useTodoStore = defineStore('todo', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null,
  }),
  
  getters: {
    completedTasks: (state) => state.tasks.filter(task => task.completed),
    pendingTasks: (state) => state.tasks.filter(task => !task.completed),
  },
  
  actions: {
    async addTask(title: string) { ... },
    async updateTaskStatus(taskId: string, completed: boolean) { ... },
  }
})
```

### View レイヤー (`src/features/todo/views/`)

**目的**: ユーザーインターフェースに焦点を当てた純粋なプレゼンテーションコンポーネント。

**コンポーネント**:
- `TodoView.vue`: メインコンテナコンポーネント
- `components/TaskForm.vue`: タスク入力フォーム
- `components/TaskList.vue`: タスクコレクション表示
- `components/TaskItem.vue`: 個別タスクコンポーネント

**責任**:
- ユーザーインターフェースのレンダリング
- ユーザーインタラクションの処理
- ViewModel 状態の消費
- 最小限のプレゼンテーションロジックのみ
- ViewModel へのイベント発行

**例**:
```vue
<!-- TaskForm.vue -->
<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="title" :class="{ error: hasError }" />
    <button :disabled="hasError || todoStore.loading">タスクを追加</button>
  </form>
</template>

<script setup lang="ts">
import { useTaskValidation } from '../../composables/useTaskValidation'
import { useTodoStore } from '../../viewmodels/useTodoStore'

const { title, hasError } = useTaskValidation()
const todoStore = useTodoStore()
</script>
```

### Composables (`src/features/todo/composables/`)

**目的**: 再利用可能なビジネスロジックとユーティリティ。

**コンポーネント**:
- `useTaskValidation.ts`: フォームバリデーションロジック
- `useTaskOperations.ts`: タスク操作ヘルパー

**責任**:
- 再利用可能なビジネスロジック
- フォームバリデーション
- 計算プロパティ
- イベントハンドラー
- ユーティリティ関数

## データフロー

### 単方向データフロー
1. **View** がユーザーアクション（フォーム送信、ボタンクリック）をトリガー
2. **ViewModel**（Pinia ストア）がアクションを受け取り、ビジネスロジックを調整
3. **Model** がデータ操作を実行し、ビジネスルールを適用
4. **ViewModel** が Model の結果に基づいてリアクティブ状態を更新
5. **View** が ViewModel の状態変更に基づいて自動的に再レンダリング

### 例: タスク追加のフロー
```
1. ユーザーが TaskForm に入力（View）
2. useTaskValidation composable によるフォームバリデーション
3. フォーム送信が todoStore.addTask() を呼び出し（ViewModel）
4. ストアが repository.addTask() を呼び出し（Model）
5. Model がタスクエンティティを検証・作成
6. リポジトリがデータを更新し結果を返す
7. ストアがリアクティブ状態を更新
8. TaskList コンポーネントが自動的に再レンダリング（View）
```

## 移行ガイド

### 旧アーキテクチャからの移行
以前のアーキテクチャでは、すべてのビジネスロジックが `TodoPage.vue` に埋め込まれていました：

**Before（移行前）**:
```vue
<!-- TodoPage.vue -->
<script setup lang="ts">
const tasks = ref<Task[]>([...])

function handleAddTask(title: string): void {
  // ビジネスロジックがコンポーネントと混在
  const isDuplicate = tasks.value.some(...)
  if (isDuplicate) return
  tasks.value.push({ id: String(Date.now()), title, completed: false })
}
</script>
```

**After（移行後）**:
```vue
<!-- TodoView.vue -->
<script setup lang="ts">
import { useTodoStore } from '../viewmodels/useTodoStore'

const todoStore = useTodoStore()
// ビジネスロジックは現在 ViewModel（Pinia ストア）にある
// コンポーネントはプレゼンテーションのみに焦点
</script>
```

### 主な変更点
1. **ステート管理**: ローカルコンポーネント状態から Pinia ストアへ移行
2. **ビジネスロジック**: composables とリポジトリクラスに抽出
3. **バリデーション**: 専用の composables に分離
4. **データアクセス**: リポジトリインターフェースの背後に抽象化
5. **コンポーネントの責任**: 純粋なプレゼンテーションロジックに削減

## ベストプラクティス

### Model レイヤー
- 可能な限りエンティティを不変にする
- エンティティメソッドでビジネスルールを実装
- データアクセスにリポジトリパターンを使用
- 外部依存関係を抽象化

### ViewModel レイヤー
- ステート管理に Pinia ストアを使用
- 適切なエラーハンドリングを実装
- 非同期操作にローディング状態を提供
- 計算プロパティを純粋に保つ

### View レイヤー
- プレゼンテーションのみに焦点
- 再利用可能なロジックに composables を使用
- メソッドを直接呼び出すのではなくイベントを発行
- テンプレートを宣言的に保つ

### Composables
- 焦点を絞って再利用可能にする
- リアクティブ参照を返す
- クリーンアップを適切に処理
- 使用方法を文書化

## テスト戦略

### Model テスト
- エンティティビジネスロジックの単体テスト
- リポジトリ実装のモック
- データバリデーションルールのテスト
- エラーハンドリングの検証

### ViewModel テスト
- Pinia ストアアクションとゲッターのテスト
- リポジトリ依存関係のモック
- 状態遷移の検証
- エラーシナリオのテスト

### View テスト
- コンポーネントレンダリングのテスト
- ユーザーインタラクションの検証
- ViewModel 依存関係のモック
- アクセシビリティ機能のテスト

## 今後の拡張

### 改善の可能性
1. **API 統合**: InMemoryRepository を HTTP ベースのリポジトリに置き換え
2. **キャッシュ**: リポジトリにキャッシュレイヤーを追加
3. **楽観的更新**: 楽観的 UI 更新の実装
4. **リアルタイム更新**: リアルタイムタスク更新のための WebSocket サポート追加
5. **オフラインサポート**: オフラインファーストアーキテクチャの実装
6. **高度なバリデーション**: サーバーサイドバリデーション統合の追加

### スケーラビリティの考慮事項
- 同じパターンに従って機能モジュールを簡単に追加可能
- 共有ユーティリティを別パッケージに抽出可能
- 他のレイヤーに影響を与えることなくリポジトリ実装を交換可能
- 追加ストアでステート管理を拡張可能

## 結論

MVVM アーキテクチャは、関心事の明確な分離、テスタビリティの向上、保守性の向上を伴う Vue.js アプリケーションの堅実な基盤を提供します。機能優先の構成により、Vue.js のベストプラクティスに従いながら、コードベースを理解し拡張することが容易になります。
