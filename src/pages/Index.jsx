import React from 'react';
import AIContentForm from '../components/AIContentForm';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">AI Content Generator</h1>
        <AIContentForm />
      </div>
    </div>
  );
};

export default Index;