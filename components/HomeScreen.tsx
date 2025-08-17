
import React from 'react';
import type { Student } from '../types';
import MonthSection from './MonthSection';
import { PlusIcon, SettingsIcon } from './icons';

interface HomeScreenProps {
  students: Student[];
  onUpdateStudent: (student: Student) => void;
  onDeleteStudent: (studentId: string) => void;
  onNavigate: (screen: 'addData' | 'settings') => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ students, onUpdateStudent, onDeleteStudent, onNavigate }) => {
  const studentsByMonth = students.reduce((acc, student) => {
    const month = student.dob.getMonth();
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(student);
    return acc;
  }, {} as Record<number, Student[]>);

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm shadow-sm z-10 p-4 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-pink-500">Góc Sinh Nhật</h1>
        <button onClick={() => onNavigate('settings')} className="text-gray-500 hover:text-pink-500 transition-colors">
          <SettingsIcon className="w-7 h-7" />
        </button>
      </header>
      
      <main className="pt-4 pb-24">
        {students.length === 0 ? (
          <div className="text-center mt-20 px-6">
            <p className="text-gray-500 text-lg">Chưa có thông tin học sinh nào.</p>
            <p className="text-gray-400 mt-2">Hãy nhấn nút + để thêm dữ liệu nhé!</p>
          </div>
        ) : (
          Array.from({ length: 12 }).map((_, i) => (
            <MonthSection
              key={i}
              month={i}
              students={studentsByMonth[i] || []}
              onUpdateStudent={onUpdateStudent}
              onDeleteStudent={onDeleteStudent}
            />
          ))
        )}
      </main>
      
      <button
        onClick={() => onNavigate('addData')}
        className="fixed bottom-6 right-6 w-16 h-16 bg-pink-500 text-white rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform"
      >
        <PlusIcon className="w-8 h-8" />
      </button>
    </div>
  );
};

export default HomeScreen;
