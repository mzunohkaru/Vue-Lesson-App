// 簡易的なハッシュ化関数（開発用）
// 本番環境では bcrypt や scrypt などを使用してください
export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + 'salt_string_for_demo')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

// パスワード検証関数
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  const hashedInput = await hashPassword(password)
  return hashedInput === hash
}

// 開発用のプリハッシュ化されたパスワード生成
export const createHashedPassword = async (password: string): Promise<string> => {
  return await hashPassword(password)
}
