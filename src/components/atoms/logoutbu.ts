// src/hooks/useAuth.ts

import { atom, useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { RecoilRoot } from 'recoil';
const authState = atom({
  key: 'authState',
  default: null,
});
 export const useAuth = () => {
  
  const [auth, setAuth] = useRecoilState(authState);
  const router = useRouter();

  const login = (userData: any) => {
    setAuth(userData);
    // Save token/session logic here
  };

  const logout = () => {
    setAuth(null);
    // Clear token/session logic here
    router.push('/login'); // Redirect to the login page
  };

  return { auth, login, logout };
};
