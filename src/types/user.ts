// ユーザープロフィール（認証後に保存される情報）
export type UserProfile = {
  id: string
  name: string
  email: string
}

// 認証用のユーザー情報（パスワードを含む）
export type UserCredentials = {
  id: string
  name: string
  email: string
  passwordHash: string
}

// ログイン時の入力データ
export type LoginRequest = {
  email: string
  password: string
}
