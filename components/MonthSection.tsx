
import React from 'react';
import type { Student } from '../types';
import StudentCard from './StudentCard';

interface MonthSectionProps {
  month: number;
  students: Student[];
  onUpdateStudent: (student: Student) => void;
  onDeleteStudent: (studentId: string) => void;
}

const monthNames = [
  "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
  "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
];

const MonthSection: React.FC<MonthSectionProps> = ({ month, students, onUpdateStudent, onDeleteStudent }) => {
  if (students.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-700 px-4 mb-3">{monthNames[month]}</h2>
      <div className="flex overflow-x-auto space-x-4 p-4 scrollbar-hide">
        {students.map(student => (
          <StudentCard key={student.id} student={student} onUpdate={onUpdateStudent} onDelete={onDeleteStudent} />
        ))}
      </div>
    </div>
  );
};

export default MonthSection;
