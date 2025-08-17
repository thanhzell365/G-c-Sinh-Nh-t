
import React from 'react';
import { CakeIcon } from './icons';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 text-center p-8">
      <div className="bg-white/50 p-8 rounded-3xl shadow-lg backdrop-blur-sm">
        <CakeIcon className="w-24 h-24 text-pink-500 mx-auto animate-bounce" />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mt-4">
          Góc Sinh Nhật
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Cùng lưu giữ những khoảnh khắc đáng nhớ!
        </p>
        <button
          onClick={onStart}
          className="mt-10 px-12 py-4 bg-pink-500 text-white font-bold text-xl rounded-full shadow-lg hover:bg-pink-600 transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-pink-300"
        >
          Bắt đầu
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
