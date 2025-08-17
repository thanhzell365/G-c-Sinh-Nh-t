
import { useState, useEffect, useCallback } from 'react';
import type { Student } from '../types';

const STORAGE_KEY = 'birthdayCornerStudents';

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    try {
      const storedStudents = localStorage.getItem(STORAGE_KEY);
      if (storedStudents) {
        const parsedStudents = JSON.parse(storedStudents).map((s: any) => ({
          ...s,
          dob: new Date(s.dob),
        }));
        setStudents(parsedStudents);
      }
    } catch (error) {
      console.error("Failed to load students from localStorage", error);
    }
  }, []);

  const saveStudents = useCallback((updatedStudents: Student[]) => {
    try {
      const sortedStudents = updatedStudents.sort((a, b) => a.dob.getTime() - b.dob.getTime());
      setStudents(sortedStudents);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sortedStudents));
    } catch (error) {
      console.error("Failed to save students to localStorage", error);
    }
  }, []);

  const addStudentsFromText = (text: string): { success: boolean, message: string } => {
    const newStudents: Student[] = [];
    const lines = text.split('\n').filter(line => line.trim() !== '');
    let errors = 0;

    lines.forEach(line => {
      const parts = line.split(',');
      if (parts.length < 2) {
        errors++;
        return;
      }
      const name = parts[0].trim();
      const dateString = parts[1].trim();
      
      // Regex to match dd/mm/yyyy or dd-mm-yyyy
      const dateParts = dateString.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
      if (!dateParts) {
        errors++;
        return;
      }
      
      const day = parseInt(dateParts[1], 10);
      const month = parseInt(dateParts[2], 10);
      const year = parseInt(dateParts[3], 10);

      // Basic validation
      if (day > 0 && day <= 31 && month > 0 && month <= 12 && year > 1990 && year < 2050) {
        const dob = new Date(year, month - 1, day);
        newStudents.push({
          id: `${Date.now()}-${Math.random()}`,
          name,
          dob,
        });
      } else {
        errors++;
      }
    });

    if(newStudents.length > 0) {
      saveStudents([...students, ...newStudents]);
    }
    
    if (errors > 0) {
        return { success: newStudents.length > 0, message: `Đã thêm ${newStudents.length} học sinh. Có ${errors} dòng bị lỗi định dạng.` };
    }
    
    return { success: true, message: `Đã thêm thành công ${newStudents.length} học sinh.` };
  };

  const updateStudent = (updatedStudent: Student) => {
    const updatedStudents = students.map(s => s.id === updatedStudent.id ? updatedStudent : s);
    saveStudents(updatedStudents);
  };
  
  const deleteStudent = (studentId: string) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa học sinh này?");
    if (confirmed) {
        const updatedStudents = students.filter(s => s.id !== studentId);
        saveStudents(updatedStudents);
    }
  };

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(students));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "du_lieu_sinh_nhat.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return { students, addStudentsFromText, updateStudent, deleteStudent, exportData };
};
