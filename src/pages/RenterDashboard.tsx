import React, { useState, useEffect } from 'react';
import { CreditCard, Calendar, TrendingUp, CheckCircle, Clock, Settings, Bell, Wrench, MessageSquare, X, Send, AlertCircle, User, Reply } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';
import AutoPayModal from '../components/AutoPayModal';

interface Reminder {
  id: string;
  type: 'payment' | 'lease' | 'maintenance' | 'general';
  title: string;
  message: string;
  date: string;
  read: boolean;
  dueDate?: string;
}

interface MaintenanceRequest {
  id: string;
  type: string;
  priority: 'low' | 'medium' | 'high';
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  submittedDate: string;
  scheduledDate?: string;
}

interface Message {
  id: string;
  from: 'landlord' | 'tenant';
  subject: string;
  content: string;
  date: string;
  read: boolean;
  replyTo?: string;
}

interface RemindersModalProps {
  isOpen: boolean;
  onClose: () => void;
  reminders: Reminder[];
  onMarkAsRead: (id: string) => void;
}

const RemindersModal: React.FC<RemindersModalProps> = ({ isOpen, onClose, reminders, onMarkAsRead }) => {
  if (!isOpen) return null;

  const unreadCount = reminders.filter(r => !r.read).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bell className="text-blue-600" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Smart Notifications</h2>
              {unreadCount > 0 && (
                <p className="text-sm text-blue-600">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="divide-y divide-gray-200">
          {reminders.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-500">No notifications at this time</p>
              <p className="text-gray-400 text-sm mt-2">We'll notify you about upcoming rent payments and important updates</p>
            </div>
          ) : (
            reminders
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((reminder) => (
                <div
                  key={reminder.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${!reminder.read ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          reminder.type === 'payment' ? 'bg-orange-100 text-orange-800' :
                          reminder.type === 'lease' ? 'bg-purple-100 text-purple-800' :
                          reminder.type === 'maintenance' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {reminder.type === 'payment' ? '💰 Payment' :
                           reminder.type === 'lease' ? '📋 Lease' :
                           reminder.type === 'maintenance' ? '🔧 Maintenance' :
                           '📢 General'}
                        </span>
                        {!reminder.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                        )}
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{reminder.title}</h3>
                      <p className="text-sm text-gray-600 mb-2 leading-relaxed">{reminder.message}</p>
                      <p className="text-xs text-gray-500">{new Date(reminder.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</p>
                    </div>
                    {!reminder.read && (
                      <button
                        onClick={() => onMarkAsRead(reminder.id)}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium ml-4 px-2 py-1 rounded hover:bg-blue-100 transition-colors"
                      >
                        Mark read
                      </button>
                    )}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

interface MaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitRequest: (request: Omit<MaintenanceRequest, 'id' | 'status' | 'submittedDate'>) => void;
  requests: MaintenanceRequest[];
}

const MaintenanceModal: React.FC<MaintenanceModalProps> = ({ isOpen, onClose, onSubmitRequest, requests }) => {
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  const [formData, setFormData] = useState({
    type: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    description: '',
    scheduledDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onSubmitRequest(formData);
    setFormData({
      type: '',
      priority: 'medium',
      description: '',
      scheduledDate: ''
    });
    setIsSubmitting(false);
    setActiveTab('history');
    
    setTimeout(() => {
      alert('Maintenance request submitted successfully! Your landlord will be notified.');
    }, 100);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Wrench className="text-orange-600" size={20} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Maintenance Requests</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('new')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'new'
                ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            New Request
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'history'
                ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Request History ({requests.length})
          </button>
        </div>

        {activeTab === 'new' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issue Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              >
                <option value="">Select issue type</option>
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="hvac">HVAC/Heating</option>
                <option value="appliance">Appliance</option>
                <option value="pest">Pest Control</option>
                <option value="locks">Locks/Security</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['low', 'medium', 'high'] as const).map((priority) => (
                  <button
                    key={priority}
                    type="button"
                    onClick={() => setFormData({...formData, priority})}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                      formData.priority === priority
                        ? priority === 'high' ? 'bg-red-100 text-red-700 border-red-300'
                          : priority === 'medium' ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
                          : 'bg-green-100 text-green-700 border-green-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-300'
                    }`}
                  >
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Please describe the issue in detail..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Date (Optional)
              </label>
              <input
                type="date"
                value={formData.scheduledDate}
                onChange={(e) => setFormData({...formData, scheduledDate: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Submit Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6">
            {requests.length === 0 ? (
              <div className="text-center py-8">
                <Wrench className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-500">No maintenance requests yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {requests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        request.priority === 'high' ? 'bg-red-100 text-red-800' :
                        request.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)} Priority
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        request.status === 'completed' ? 'bg-green-100 text-green-800' :
                        request.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {request.status.charAt(0).toUpperCase() + request.status.replace('-', ' ').slice(1)}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1 capitalize">{request.type}</h3>
                    <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                    <p className="text-xs text-gray-500">
                      Submitted: {new Date(request.submittedDate).toLocaleDateString()}
                      {request.scheduledDate && (
                        <span> • Scheduled: {new Date(request.scheduledDate).toLocaleDateString()}</span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface MessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  onMarkAsRead: (id: string) => void;
  onSendReply: (messageId: string, replyContent: string) => void;
}

const MessagesModal: React.FC<MessagesModalProps> = ({ isOpen, onClose, messages, onMarkAsRead, onSendReply }) => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const unreadCount = messages.filter(m => !m.read).length;

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
    setShowReplyForm(false);
    setReplyContent('');
    if (!message.read) {
      onMarkAsRead(message.id);
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMessage || !replyContent.trim()) return;

    setIsSending(true);
    
    // Simulate sending delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSendReply(selectedMessage.id, replyContent);
    setReplyContent('');
    setShowReplyForm(false);
    setIsSending(false);
    
    // Show success message
    setTimeout(() => {
      alert('Reply sent successfully! Your landlord will be notified.');
    }, 100);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MessageSquare className="text-purple-600" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Messages from Landlord</h2>
              {unreadCount > 0 && (
                <p className="text-sm text-purple-600">{unreadCount} unread message{unreadCount !== 1 ? 's' : ''}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {selectedMessage ? (
          <div className="p-6">
            <button
              onClick={() => setSelectedMessage(null)}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium mb-4 flex items-center space-x-1"
            >
              <span>← Back to messages</span>
            </button>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  <User size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Sarah Johnson (Landlord)</p>
                  <p className="text-sm text-gray-500">{new Date(selectedMessage.date).toLocaleDateString()}</p>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedMessage.subject}</h3>
            </div>
            
            <div className="prose max-w-none mb-6">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedMessage.content}</p>
            </div>

            {/* Reply Section */}
            {!showReplyForm ? (
              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={() => setShowReplyForm(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <Reply size={16} />
                  <span>Reply to Landlord</span>
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-4">
                <form onSubmit={handleSendReply} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Reply
                    </label>
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Type your reply to the landlord..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowReplyForm(false);
                        setReplyContent('');
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSending || !replyContent.trim()}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-2"
                    >
                      {isSending ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Send Reply</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {messages.length === 0 ? (
              <div className="p-8 text-center">
                <MessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-500">No messages from your landlord</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => handleMessageClick(message)}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${!message.read ? 'bg-purple-50' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          SJ
                        </div>
                        <span className="font-medium text-gray-900">Sarah Johnson</span>
                        {!message.read && (
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        )}
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{message.subject}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{message.content}</p>
                      <p className="text-xs text-gray-500 mt-2">{new Date(message.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const RenterDashboard: React.FC = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAutoPayModal, setShowAutoPayModal] = useState(false);
  const [showRemindersModal, setShowRemindersModal] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [showMessagesModal, setShowMessagesModal] = useState(false);
  const [isAutoPayEnabled, setIsAutoPayEnabled] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([
    { id: '1', date: '2025-01-01', amount: 1500, status: 'completed' },
    { id: '2', date: '2024-12-01', amount: 1500, status: 'completed' },
    { id: '3', date: '2024-11-01', amount: 1500, status: 'completed' },
    { id: '4', date: '2024-10-01', amount: 1500, status: 'completed' },
  ]);

  // Smart due date calculation - always the 1st of next month
  const getNextDueDate = () => {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return nextMonth.toISOString().split('T')[0];
  };

  const [dueDate, setDueDate] = useState(getNextDueDate());

  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '2',
      type: 'maintenance',
      title: 'Maintenance Scheduled',
      message: 'HVAC maintenance has been scheduled for June 5, 2025 between 10 AM - 2 PM.',
      date: '2025-05-20T10:00:00',
      read: true
    },
    {
      id: '3',
      type: 'lease',
      title: 'Lease Renewal Notice',
      message: 'Your lease expires in 3 months. Please contact your landlord to discuss renewal options.',
      date: '2025-05-15T09:00:00',
      read: false
    }
  ]);

  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([
    {
      id: '1',
      type: 'plumbing',
      priority: 'high',
      description: 'Kitchen sink is leaking and water is pooling under the cabinet.',
      status: 'in-progress',
      submittedDate: '2025-05-20',
      scheduledDate: '2025-05-25'
    },
    {
      id: '2',
      type: 'electrical',
      priority: 'medium',
      description: 'Living room outlet is not working properly.',
      status: 'completed',
      submittedDate: '2025-05-10',
      scheduledDate: '2025-05-15'
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      from: 'landlord',
      subject: 'Welcome to Your New Home!',
      content: 'Dear John,\n\nWelcome to Apartment #202! I hope you\'re settling in well. Please don\'t hesitate to reach out if you have any questions or concerns about your new home.\n\nI\'ve attached the building guidelines and emergency contact information for your reference. The maintenance team is available 24/7 for urgent issues.\n\nLooking forward to a great landlord-tenant relationship!\n\nBest regards,\nSarah Johnson',
      date: '2025-05-01',
      read: true
    },
    {
      id: '2',
      from: 'landlord',
      subject: 'Building Maintenance Notice',
      content: 'Dear Residents,\n\nWe will be conducting routine maintenance on the building\'s HVAC system this weekend (June 1-2). There may be brief interruptions to heating/cooling during this time.\n\nWe apologize for any inconvenience and appreciate your understanding.\n\nBest regards,\nSarah Johnson',
      date: '2025-05-28',
      read: false
    },
    {
      id: '3',
      from: 'landlord',
      subject: 'Rent Payment Confirmation',
      content: 'Hi John,\n\nThis is to confirm that we received your rent payment for May 2025. Thank you for your prompt payment!\n\nYour next payment is due on May 31, 2025.\n\nBest regards,\nSarah Johnson',
      date: '2025-05-02',
      read: true
    }
  ]);

  const rentDue = 1500;
  const propertyName = 'Apartment #202';

  // Smart notification system for rent due dates
  useEffect(() => {
    const checkRentDueNotification = () => {
      const now = new Date();
      const dueDateObj = new Date(dueDate);
      const timeDiff = dueDateObj.getTime() - now.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      // Create notification if rent is due within 7 days and no recent payment notification exists
      if (daysDiff <= 7 && daysDiff >= 0) {
        const existingReminder = reminders.find(r => 
          r.type === 'payment' && 
          r.dueDate === dueDate &&
          !r.read
        );

        if (!existingReminder) {
          const urgencyLevel = daysDiff <= 1 ? 'urgent' : daysDiff <= 3 ? 'important' : 'reminder';
          const urgencyEmoji = daysDiff <= 1 ? '🚨' : daysDiff <= 3 ? '⚠️' : '📅';
          
          let title, message;
          
          if (daysDiff === 0) {
            title = `${urgencyEmoji} Rent Due Today!`;
            message = `Your rent payment of $${rentDue.toLocaleString()} for ${propertyName} is due TODAY. Please make your payment as soon as possible to avoid late fees.`;
          } else if (daysDiff === 1) {
            title = `${urgencyEmoji} Rent Due Tomorrow!`;
            message = `Your rent payment of $${rentDue.toLocaleString()} for ${propertyName} is due TOMORROW (${dueDateObj.toLocaleDateString()}). Don't forget to make your payment!`;
          } else if (daysDiff <= 3) {
            title = `${urgencyEmoji} Rent Due in ${daysDiff} Days`;
            message = `Your rent payment of $${rentDue.toLocaleString()} for ${propertyName} is due in ${daysDiff} days (${dueDateObj.toLocaleDateString()}). Consider setting up auto-pay to never miss a payment!`;
          } else {
            title = `${urgencyEmoji} Rent Due in ${daysDiff} Days`;
            message = `Friendly reminder: Your rent payment of $${rentDue.toLocaleString()} for ${propertyName} is due on ${dueDateObj.toLocaleDateString()}.`;
          }

          const newReminder: Reminder = {
            id: `rent-due-${dueDate}-${Date.now()}`,
            type: 'payment',
            title,
            message,
            date: new Date().toISOString(),
            read: false,
            dueDate: dueDate
          };

          setReminders(prev => [newReminder, ...prev]);
        }
      }

      // Auto-pay success notification
      if (isAutoPayEnabled && daysDiff === 0) {
        const autoPayReminder = reminders.find(r => 
          r.type === 'payment' && 
          r.title.includes('Auto-Pay') &&
          r.dueDate === dueDate
        );

        if (!autoPayReminder) {
          const autoPayNotification: Reminder = {
            id: `auto-pay-${dueDate}-${Date.now()}`,
            type: 'payment',
            title: '✅ Auto-Pay Processed Successfully',
            message: `Your rent payment of $${rentDue.toLocaleString()} has been automatically processed for ${propertyName}. Thank you for using auto-pay!`,
            date: new Date().toISOString(),
            read: false,
            dueDate: dueDate
          };

          setReminders(prev => [autoPayNotification, ...prev]);
        }
      }
    };

    checkRentDueNotification();
    
    // Check every hour for due date changes
    const interval = setInterval(checkRentDueNotification, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [dueDate, reminders, isAutoPayEnabled, rentDue, propertyName]);

  // Update due date when payment is completed
  const handlePaymentComplete = (paymentData: any) => {
    setPaymentHistory(prev => [paymentData, ...prev]);
    
    // Update due date to next month after payment
    const nextDue = getNextDueDate();
    setDueDate(nextDue);
    
    // Add payment confirmation notification
    const confirmationReminder: Reminder = {
      id: `payment-confirmation-${Date.now()}`,
      type: 'payment',
      title: '✅ Payment Confirmed',
      message: `Your rent payment of $${paymentData.amount.toLocaleString()} has been successfully processed for ${propertyName}. Your next payment is due on ${new Date(nextDue).toLocaleDateString()}.`,
      date: new Date().toISOString(),
      read: false
    };

    setReminders(prev => [confirmationReminder, ...prev]);
  };

  const handleMarkReminderAsRead = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, read: true } : r));
  };

  const handleMarkMessageAsRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const handleSendReply = (messageId: string, replyContent: string) => {
    const originalMessage = messages.find(m => m.id === messageId);
    if (!originalMessage) return;

    const newReply: Message = {
      id: Date.now().toString(),
      from: 'tenant',
      subject: `Re: ${originalMessage.subject}`,
      content: replyContent,
      date: new Date().toISOString(),
      read: true,
      replyTo: messageId
    };

    setMessages(prev => [newReply, ...prev]);
  };

  const handleSubmitMaintenanceRequest = (request: Omit<MaintenanceRequest, 'id' | 'status' | 'submittedDate'>) => {
    const newRequest: MaintenanceRequest = {
      ...request,
      id: Date.now().toString(),
      status: 'pending',
      submittedDate: new Date().toISOString().split('T')[0]
    };
    setMaintenanceRequests(prev => [newRequest, ...prev]);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const timeDiff = date.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff === 0) return 'Due Today';
    if (daysDiff === 1) return 'Due Tomorrow';
    if (daysDiff < 0) return `${Math.abs(daysDiff)} days overdue`;
    return `Due in ${daysDiff} days`;
  };

  const unreadReminders = reminders.filter(r => !r.read).length;
  const unreadMessages = messages.filter(m => !m.read).length;
  const pendingRequests = maintenanceRequests.filter(r => r.status === 'pending').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">RentEase Dashboard</h1>
        <p className="text-gray-600">Manage your rent payments with intelligent notifications</p>
      </div>

      {/* Rent Due Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{propertyName}</h2>
              <p className="text-blue-100">{formatDueDate(dueDate)}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">${rentDue.toLocaleString()}</p>
              <p className="text-blue-100">Due Amount</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setShowPaymentModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <CreditCard size={24} />
              <span>Make a Payment</span>
            </button>
            
            <button
              onClick={() => setShowAutoPayModal(true)}
              className={`${
                isAutoPayEnabled 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-green-500 hover:bg-green-600'
              } text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2`}
            >
              <Settings size={24} />
              <span>{isAutoPayEnabled ? 'Manage Auto-Pay' : 'Setup Auto-Pay'}</span>
            </button>
          </div>
          
          {isAutoPayEnabled && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-600" size={20} />
                <span className="text-green-800 font-medium">Auto-Pay is active</span>
              </div>
              <p className="text-green-700 text-sm mt-1">
                Your rent will be automatically paid on the 1st of each month
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setShowRemindersModal(true)}
            className="relative flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 group"
          >
            <Bell className="text-blue-600 group-hover:scale-110 transition-transform" size={20} />
            <div className="text-left">
              <span className="font-medium text-gray-700 group-hover:text-blue-700 block">Smart Notifications</span>
              <span className="text-sm text-gray-500">AI-powered alerts & reminders</span>
            </div>
            {unreadReminders > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                {unreadReminders}
              </div>
            )}
          </button>
          
          <button 
            onClick={() => setShowMaintenanceModal(true)}
            className="relative flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 group"
          >
            <Wrench className="text-orange-600 group-hover:scale-110 transition-transform" size={20} />
            <div className="text-left">
              <span className="font-medium text-gray-700 group-hover:text-orange-700 block">Maintenance Request</span>
              <span className="text-sm text-gray-500">Report issues & track requests</span>
            </div>
            {pendingRequests > 0 && (
              <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                {pendingRequests}
              </div>
            )}
          </button>
          
          <button 
            onClick={() => setShowMessagesModal(true)}
            className="relative flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 group"
          >
            <MessageSquare className="text-purple-600 group-hover:scale-110 transition-transform" size={20} />
            <div className="text-left">
              <span className="font-medium text-gray-700 group-hover:text-purple-700 block">Messages</span>
              <span className="text-sm text-gray-500">View landlord messages</span>
            </div>
            {unreadMessages > 0 && (
              <div className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                {unreadMessages}
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-full">
              <Calendar className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Next Payment</p>
              <p className="text-xl font-bold text-gray-900">{formatDate(dueDate)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Payments This Year</p>
              <p className="text-xl font-bold text-gray-900">${(paymentHistory.length * 1500).toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-full">
              <CheckCircle className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">On-Time Payments</p>
              <p className="text-xl font-bold text-gray-900">100%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Payment History</h2>
          <p className="text-gray-600">Your recent rent payments</p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {paymentHistory.map((payment) => (
            <div key={payment.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <CheckCircle className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {formatDate(payment.date)} - Paid ${payment.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 capitalize">
                      Status: {payment.status}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <CheckCircle size={14} className="mr-1" />
                    Completed
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={rentDue}
        propertyName={propertyName}
        onPaymentComplete={handlePaymentComplete}
      />
      
      <AutoPayModal
        isOpen={showAutoPayModal}
        onClose={() => setShowAutoPayModal(false)}
        amount={rentDue}
        propertyName={propertyName}
        isAutoPayEnabled={isAutoPayEnabled}
        onAutoPayToggle={setIsAutoPayEnabled}
      />

      <RemindersModal
        isOpen={showRemindersModal}
        onClose={() => setShowRemindersModal(false)}
        reminders={reminders}
        onMarkAsRead={handleMarkReminderAsRead}
      />

      <MaintenanceModal
        isOpen={showMaintenanceModal}
        onClose={() => setShowMaintenanceModal(false)}
        onSubmitRequest={handleSubmitMaintenanceRequest}
        requests={maintenanceRequests}
      />

      <MessagesModal
        isOpen={showMessagesModal}
        onClose={() => setShowMessagesModal(false)}
        messages={messages}
        onMarkAsRead={handleMarkMessageAsRead}
        onSendReply={handleSendReply}
      />
    </div>
  );
};

export default RenterDashboard;