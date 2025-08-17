
import React, { useState } from 'react';
import { ArrowLeftIcon } from './icons';

interface SettingsScreenProps {
  onBack: () => void;
  onExport: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack, onExport }) => {
  const [notifications, setNotifications] = useState(true);
  const [reminderTime, setReminderTime] = useState('1');

  const Toggle: React.FC<{ checked: boolean, onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
    <button onClick={() => onChange(!checked)} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${checked ? 'bg-pink-500' : 'bg-gray-300'}`}>
      <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-sm p-4 flex items-center">
        <button onClick={onBack} className="p-2 mr-2 text-gray-600">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Cài đặt</h1>
      </header>

      <main className="p-4 space-y-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold text-lg text-gray-700 mb-3">Thông báo</h2>
          <div className="flex justify-between items-center mb-3">
            <label htmlFor="notifications" className="text-gray-600">Nhắc nhở sinh nhật</label>
            <Toggle checked={notifications} onChange={setNotifications} />
          </div>
          <div className={`flex justify-between items-center transition-opacity ${notifications ? 'opacity-100' : 'opacity-50'}`}>
            <label htmlFor="reminderTime" className="text-gray-600">Thời gian nhắc</label>
            <select
              id="reminderTime"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              disabled={!notifications}
              className="bg-gray-100 border-none rounded p-1 text-sm focus:ring-2 focus:ring-pink-400"
            >
              <option value="1">Trước 1 ngày</option>
              <option value="3">Trước 3 ngày</option>
              <option value="7">Trước 1 tuần</option>
            </select>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold text-lg text-gray-700 mb-3">Quản lý dữ liệu</h2>
          <button onClick={onExport} className="w-full text-left p-2 text-blue-600 hover:bg-gray-50 rounded">
            Xuất dữ liệu ra file
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold text-lg text-gray-700 mb-2">Giới thiệu</h2>
          <p className="text-sm text-gray-600">Góc Sinh Nhật v1.0.0</p>
          <p className="text-sm text-gray-500">Ứng dụng giúp giáo viên quản lý sinh nhật học sinh.</p>
        </div>

        <div className="text-center">
          <button className="text-red-500 font-semibold p-2">Đăng xuất</button>
        </div>
      </main>
    </div>
  );
};

export default SettingsScreen;
