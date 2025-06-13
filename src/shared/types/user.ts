export type UserProfile = {
  id: string
  name: string
  email: string
}

export type UserCredentials = {
  id: string
  name: string
  email: string
  passwordHash: string
}

export type LoginRequest = {
  email: string
  password: string
}
