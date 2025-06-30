import React, { useState } from 'react';
import { X, Calendar, CreditCard, RotateCcw } from 'lucide-react';

interface AutoPayModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  propertyName: string;
  isAutoPayEnabled: boolean;
  onAutoPayToggle: (enabled: boolean) => void;
}

const AutoPayModal: React.FC<AutoPayModalProps> = ({
  isOpen,
  onClose,
  amount,
  propertyName,
  isAutoPayEnabled,
  onAutoPayToggle
}) => {
  const [paymentDate, setPaymentDate] = useState('1');
  const [paymentMethod, setPaymentMethod] = useState('card');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAutoPayToggle(!isAutoPayEnabled);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Auto-Pay Setup</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <RotateCcw className="text-green-600" size={24} />
              <div>
                <p className="text-sm text-green-600 font-medium">Automatic Payments</p>
                <p className="text-green-800">
                  {isAutoPayEnabled ? 'Currently enabled' : 'Set up recurring payments'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Property</p>
                <p className="text-lg font-semibold text-gray-900">{propertyName}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 font-medium">Monthly Amount</p>
                <p className="text-xl font-bold text-gray-900">${amount.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          {!isAutoPayEnabled ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Date Each Month
                </label>
                <select
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {Array.from({ length: 28 }, (_, i) => i + 1).map(day => (
                    <option key={day} value={day.toString()}>
                      {day === 1 ? '1st' : day === 2 ? '2nd' : day === 3 ? '3rd' : `${day}th`} of the month
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <CreditCard size={16} />
                    <span>Credit Card ending in 3456</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      value="bank"
                      checked={paymentMethod === 'bank'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <Calendar size={16} />
                    <span>Bank Account ending in 1234</span>
                  </label>
                </div>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Enable Auto-Pay
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Payment Date</span>
                  <span className="text-sm text-gray-900">1st of each month</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Payment Method</span>
                  <span className="text-sm text-gray-900">Credit Card ending in 3456</span>
                </div>
              </div>
              
              <button
                onClick={() => onAutoPayToggle(false)}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Disable Auto-Pay
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AutoPayModal;