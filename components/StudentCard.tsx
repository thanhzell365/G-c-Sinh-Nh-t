
import React, { useRef } from 'react';
import type { Student } from '../types';
import { CameraIcon } from './icons';

interface StudentCardProps {
  student: Student;
  onUpdate: (student: Student) => void;
  onDelete: (studentId: string) => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onUpdate, onDelete }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ ...student, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
  }

  return (
    <div className="relative flex-shrink-0 w-36 bg-white rounded-2xl shadow-md p-3 text-center transition-transform transform hover:-translate-y-1">
      <div 
        className="relative w-24 h-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden border-4 border-white shadow-inner"
        onClick={handleAvatarClick}
      >
        {student.avatar ? (
          <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
        ) : (
          <CameraIcon className="w-10 h-10 text-gray-400" />
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      <h3 className="mt-2 font-bold text-sm text-gray-800 truncate">{student.name}</h3>
      <p className="text-xs text-gray-500">{formatDate(student.dob)}</p>
      <button 
        onClick={() => onDelete(student.id)} 
        className="absolute top-1 right-1 w-5 h-5 bg-red-400 text-white rounded-full flex items-center justify-center text-xs font-bold opacity-50 hover:opacity-100 transition-opacity">
        &times;
      </button>
    </div>
  );
};

export default StudentCard;
