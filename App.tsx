
import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import HomeScreen from './components/HomeScreen';
import AddDataScreen from './components/AddDataScreen';
import SettingsScreen from './components/SettingsScreen';
import BirthdayPopup from './components/BirthdayPopup';
import type { Screen, Student } from './types';
import { useStudents } from './hooks/useStudents';

const App: React.FC = () => {
  const [hasWelcomed, setHasWelcomed] = useState(localStorage.getItem('hasWelcomed') === 'true');
  const [currentScreen, setCurrentScreen] = useState<Screen>(hasWelcomed ? 'home' : 'welcome');
  const { students, addStudentsFromText, updateStudent, deleteStudent, exportData } = useStudents();
  const [birthdayStudent, setBirthdayStudent] = useState<Student | null>(null);

  useEffect(() => {
    const today = new Date();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    const studentWithBirthdayToday = students.find(s => {
      const dob = new Date(s.dob);
      return dob.getMonth() === todayMonth && dob.getDate() === todayDate;
    });

    if (studentWithBirthdayToday) {
      // Avoid showing popup every time app is opened on the same day
      const lastShown = localStorage.getItem(`birthdayShown_${studentWithBirthdayToday.id}`);
      const todayStr = today.toISOString().split('T')[0];
      if (lastShown !== todayStr) {
        setBirthdayStudent(studentWithBirthdayToday);
      }
    }
  }, [students]);

  const handleStart = () => {
    localStorage.setItem('hasWelcomed', 'true');
    setHasWelcomed(true);
    setCurrentScreen('home');
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };
  
  const handleClosePopup = () => {
      if(birthdayStudent) {
        const todayStr = new Date().toISOString().split('T')[0];
        localStorage.setItem(`birthdayShown_${birthdayStudent.id}`, todayStr);
      }
      setBirthdayStudent(null);
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onStart={handleStart} />;
      case 'home':
        return <HomeScreen students={students} onUpdateStudent={updateStudent} onDeleteStudent={deleteStudent} onNavigate={handleNavigate} />;
      case 'addData':
        return <AddDataScreen onAdd={addStudentsFromText} onBack={() => setCurrentScreen('home')} />;
      case 'settings':
        return <SettingsScreen onBack={() => setCurrentScreen('home')} onExport={exportData} />;
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="antialiased">
      {renderScreen()}
      {birthdayStudent && <BirthdayPopup student={birthdayStudent} onClose={handleClosePopup} />}
    </div>
  );
};

export default App;
