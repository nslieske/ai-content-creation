import React, { useState } from 'react';
import AIContentForm from '../components/AIContentForm';
import LoginForm from '../components/LoginForm';
import UserAssets from '../components/UserAssets';

const Index = () => {
  const [user, setUser] = useState(null);
  const [assets, setAssets] = useState([]);

  const handleLogin = (userData) => {
    // In a real app, you'd verify the user with a backend
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setAssets([]);
  };

  const handleAddAsset = (newAsset) => {
    setAssets([...assets, newAsset]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">AI Content Generator</h1>
        {user ? (
          <>
            <div className="mb-6">
              <p className="text-lg">Welcome, {user.email}!</p>
              <Button onClick={handleLogout} className="mt-2">Log Out</Button>
            </div>
            <UserAssets assets={assets} onAddAsset={handleAddAsset} />
            <div className="mt-8">
              <AIContentForm userAssets={assets} />
            </div>
          </>
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default Index;