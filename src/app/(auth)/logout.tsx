"use client"
import React from 'react';
import LogoutButton from '@/components/atoms/logout';
import  {useAuth}  from '../../components/atoms/logoutbu';

const Logout: React.FC = () => {
  const { auth } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">Your App</h1>
      {auth && <LogoutButton />} {/* Render only if user is logged in */}
    </nav>
  );
};

export default Logout;
