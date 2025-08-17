
import React, { useState, useEffect } from 'react';
import type { Student } from '../types';
import { generateBirthdayWish } from '../services/geminiService';
import { ConfettiPiece } from './icons';

interface BirthdayPopupProps {
  student: Student;
  onClose: () => void;
}

const BirthdayPopup: React.FC<BirthdayPopupProps> = ({ student, onClose }) => {
  const [wish, setWish] = useState('Đang tạo lời chúc đặc biệt...');
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchWish = async () => {
      const generatedWish = await generateBirthdayWish(student.name);
      setWish(generatedWish);
    };
    fetchWish();
  }, [student.name]);

  useEffect(() => {
    // Animate entrance
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const confetti = Array.from({ length: 30 }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}%`,
      animation: `fall ${Math.random() * 2 + 3}s linear ${Math.random() * 2}s infinite`,
      transform: `rotate(${Math.random() * 360}deg)`,
    };
    const colors = ['bg-pink-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-400'];
    return <ConfettiPiece key={i} color={colors[i % 4]} style={style} />;
  });

  return (
    <>
      <style>{`
        @keyframes fall {
          0% { top: -10%; opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }
      `}</style>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4" onClick={onClose}>
        <div 
          className={`relative bg-white w-full max-w-sm rounded-3xl shadow-2xl p-6 text-center transform transition-all duration-500 ease-out ${show ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            {confetti}
          </div>
          
          <h2 className="text-2xl font-bold text-pink-500">Chúc Mừng Sinh Nhật!</h2>
          
          <div className="relative w-32 h-32 mx-auto rounded-full mt-4 border-4 border-yellow-300 shadow-lg overflow-hidden">
            {student.avatar ? (
              <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-pink-200 to-yellow-200 flex items-center justify-center text-4xl font-bold text-white">
                {student.name.charAt(0)}
              </div>
            )}
          </div>
          
          <h3 className="mt-4 text-3xl font-extrabold text-gray-800">{student.name}</h3>
          
          <p className="mt-4 text-gray-600 min-h-[60px]">
            {wish}
          </p>

          <button
            onClick={onClose}
            className="mt-6 px-8 py-2 bg-pink-500 text-white font-bold rounded-full shadow-lg hover:bg-pink-600 transform hover:scale-105 transition-all"
          >
            Tuyệt vời!
          </button>
        </div>
      </div>
    </>
  );
};

export default BirthdayPopup;
