"use client"
import React from 'react';
import {useAuth}  from './logoutbu';
import { RecoilRoot } from 'recoil';

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <RecoilRoot>
    <button 
      onClick={handleLogout} 
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
      Logout
    </button>
    </RecoilRoot>
  );
};

export default LogoutButton;
