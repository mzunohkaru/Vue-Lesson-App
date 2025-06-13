import { ref, readonly, computed } from 'vue'; // Added computed
import { useUserStore } from '@/store/useUserStore';
import { verifyPassword, hashPassword } from '@/utils/crypto'; // Assuming hashPassword might be used for registration in future
import type { UserProfile, UserCredentials } from '@/types/user';

// In a real app, this would be an API or secure database interaction.
const dummyUsers: UserCredentials[] = [
  {
    id: '1',
    name: '田中 太郎',
    email: 'tanaka@gmail.com',
    // Password: SecurePass123!
    passwordHash: '3b4cf85d435e3b708d1a9b9cefa427e1ec4cabefa1a5cc4989613fe36dc7c240',
  },
  // Example of how a new user could be added if registration was implemented
  // {
  //   id: '2',
  //   name: '山田 花子',
  //   email: 'yamada@example.com',
  //   passwordHash: await hashPassword('StrongPwd456!'), // Example
  // },
];

// This state could be for the model itself, if needed, but user profile is in Pinia store
// const localUserError = ref<string | null>(null);

export function useUserModel() {
  const userStore = useUserStore();

  const currentUserProfile = computed(() => userStore.userProfile);
  const isAuthenticated = computed(() => userStore.isAuthenticated);

  async function login(email: string, password: string): Promise<{ success: boolean; message?: string; user?: UserProfile }> {
    if (!email || !password) {
      return { success: false, message: 'メールアドレスとパスワードを入力してください' };
    }

    const userCredential = dummyUsers.find((u) => u.email === email);
    if (!userCredential) {
      return { success: false, message: 'メールアドレスまたはパスワードが正しくありません' };
    }

    const isPasswordValid = await verifyPassword(password, userCredential.passwordHash);
    if (!isPasswordValid) {
      return { success: false, message: 'メールアドレスまたはパスワードが正しくありません' };
    }

    const userProfile: UserProfile = {
      id: userCredential.id,
      name: userCredential.name,
      email: userCredential.email,
    };

    userStore.login(userProfile);
    return { success: true, user: userProfile };
  }

  function logout(): void {
    userStore.logout();
  }

  // Example for future registration functionality
  // async function register(name: string, email: string, pass: string): Promise<{success: boolean, message?: string, user?: UserProfile}> {
  //   const existingUser = dummyUsers.find(u => u.email === email);
  //   if (existingUser) {
  //     return { success: false, message: 'このメールアドレスは既に使用されています。'};
  //   }
  //   const newPasswordHash = await hashPassword(pass);
  //   const newUserCredential: UserCredentials = {
  //     id: String(Date.now()),
  //     name,
  //     email,
  //     passwordHash: newPasswordHash,
  //   };
  //   dummyUsers.push(newUserCredential); // Add to our "database"
  //
  //   const newUserProfile: UserProfile = {id: newUserCredential.id, name, email};
  //   userStore.login(newUserProfile); // Auto-login after registration
  //   return { success: true, user: newUserProfile };
  // }

  return {
    currentUserProfile,
    isAuthenticated,
    login,
    logout,
    // register, // Future method
  };
}
