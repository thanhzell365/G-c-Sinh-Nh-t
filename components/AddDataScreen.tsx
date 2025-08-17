
import React, { useState } from 'react';
import { ArrowLeftIcon } from './icons';

interface AddDataScreenProps {
  onAdd: (text: string) => { success: boolean, message: string };
  onBack: () => void;
}

const AddDataScreen: React.FC<AddDataScreenProps> = ({ onAdd, onBack }) => {
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');

  const handleAddClick = () => {
    const result = onAdd(text);
    setMessage(result.message);
    if(result.success) {
      setText('');
      setTimeout(() => {
        onBack();
      }, 1500);
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
       <header className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 mr-2 text-gray-600">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Thêm Dữ Liệu Nhanh</h1>
      </header>
      
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <p className="text-gray-600 mb-4">
          Dán danh sách học sinh vào ô bên dưới. Mỗi học sinh một dòng theo định dạng:
        </p>
        <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-700 mb-4">
          <p>Họ tên, ngày/tháng/năm</p>
          <p className="font-mono mt-1">Ví dụ: Nguyễn Văn A, 20/05/2015</p>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Dán danh sách tại đây..."
          className="w-full h-48 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
        ></textarea>
        <button
          onClick={handleAddClick}
          className="w-full mt-4 py-3 bg-pink-500 text-white font-bold rounded-lg shadow-md hover:bg-pink-600 transition-colors"
        >
          Phân tích & Lưu
        </button>
        {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default AddDataScreen;
