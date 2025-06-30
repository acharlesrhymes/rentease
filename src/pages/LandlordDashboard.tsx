import React, { useState } from 'react';
import { Users, DollarSign, Home, TrendingUp, Calendar, Bell, MessageSquare, Wrench, AlertTriangle, CheckCircle, Clock, Eye, Edit, Trash2, X, Send, User, Reply } from 'lucide-react';

interface Property {
  id: string;
  name: string;
  address: string;
  units: number;
  occupiedUnits: number;
  monthlyRent: number;
  status: 'active' | 'maintenance' | 'vacant';
}

interface Tenant {
  id: string;
  name: string;
  email: string;
  property: string;
  unit: string;
  rentAmount: number;
  paymentStatus: 'current' | 'late' | 'overdue';
  leaseEnd: string;
}

interface MaintenanceRequest {
  id: string;
  tenant: string;
  property: string;
  type: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  submittedDate: string;
  description: string;
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

interface MessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  onMarkAsRead: (id: string) => void;
  onSendReply: (messageId: string, replyContent: string) => void;
  selectedMessageId?: string;
}

const MessagesModal: React.FC<MessagesModalProps> = ({ isOpen, onClose, messages, onMarkAsRead, onSendReply, selectedMessageId }) => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Auto-select message if selectedMessageId is provided
  React.useEffect(() => {
    if (selectedMessageId && isOpen) {
      const message = messages.find(m => m.id === selectedMessageId);
      if (message) {
        setSelectedMessage(message);
        if (!message.read) {
          onMarkAsRead(message.id);
        }
      }
    }
  }, [selectedMessageId, isOpen, messages, onMarkAsRead]);

  if (!isOpen) return null;

  const unreadCount = messages.filter(m => !m.read && m.from === 'tenant').length;

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
      alert('Reply sent successfully! The tenant will be notified.');
    }, 100);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MessageSquare className="text-purple-600" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Tenant Messages</h2>
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
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  <User size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {selectedMessage.from === 'tenant' ? 'Tenant Message' : 'Your Message'}
                  </p>
                  <p className="text-sm text-gray-500">{new Date(selectedMessage.date).toLocaleDateString()}</p>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedMessage.subject}</h3>
            </div>
            
            <div className="prose max-w-none mb-6">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedMessage.content}</p>
            </div>

            {/* Reply Section */}
            {selectedMessage.from === 'tenant' && (
              <>
                {!showReplyForm ? (
                  <div className="border-t border-gray-200 pt-4">
                    <button
                      onClick={() => setShowReplyForm(true)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                    >
                      <Reply size={16} />
                      <span>Reply to Tenant</span>
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
                          placeholder="Type your reply to the tenant..."
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
              </>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {messages.length === 0 ? (
              <div className="p-8 text-center">
                <MessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-500">No messages from tenants</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => handleMessageClick(message)}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${!message.read && message.from === 'tenant' ? 'bg-purple-50' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {message.from === 'tenant' ? 'T' : 'L'}
                        </div>
                        <span className="font-medium text-gray-900">
                          {message.from === 'tenant' ? 'Tenant Message' : 'Your Message'}
                        </span>
                        {!message.read && message.from === 'tenant' && (
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        )}
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{message.subject}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{message.content}</p>
                      <p className="text-xs text-gray-500 mt-2">{new Date(message.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Eye size={16} className="text-gray-400" />
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

const LandlordDashboard: React.FC = () => {
  const [showMessagesModal, setShowMessagesModal] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | undefined>();

  const [properties] = useState<Property[]>([
    {
      id: '1',
      name: 'Sunset Apartments',
      address: '123 Sunset Blvd',
      units: 24,
      occupiedUnits: 22,
      monthlyRent: 1500,
      status: 'active'
    },
    {
      id: '2',
      name: 'Downtown Lofts',
      address: '456 Main Street',
      units: 12,
      occupiedUnits: 11,
      monthlyRent: 2200,
      status: 'active'
    },
    {
      id: '3',
      name: 'Garden View Complex',
      address: '789 Garden Ave',
      units: 36,
      occupiedUnits: 34,
      monthlyRent: 1800,
      status: 'maintenance'
    }
  ]);

  const [tenants] = useState<Tenant[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      property: 'Sunset Apartments',
      unit: 'Apt #202',
      rentAmount: 1500,
      paymentStatus: 'current',
      leaseEnd: '2024-12-31'
    },
    {
      id: '2',
      name: 'Emily Johnson',
      email: 'emily.johnson@email.com',
      property: 'Downtown Lofts',
      unit: 'Unit 305',
      rentAmount: 2200,
      paymentStatus: 'current',
      leaseEnd: '2025-03-14'
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'michael.brown@email.com',
      property: 'Garden View Complex',
      unit: 'Apt #101',
      rentAmount: 1800,
      paymentStatus: 'late',
      leaseEnd: '2025-05-31'
    }
  ]);

  const [maintenanceRequests] = useState<MaintenanceRequest[]>([
    {
      id: '1',
      tenant: 'John Smith',
      property: 'Sunset Apartments',
      type: 'Plumbing',
      priority: 'high',
      status: 'pending',
      submittedDate: '2025-01-15',
      description: 'Kitchen sink is leaking and water is pooling under the cabinet.'
    },
    {
      id: '2',
      tenant: 'Emily Johnson',
      property: 'Downtown Lofts',
      type: 'HVAC',
      priority: 'medium',
      status: 'in-progress',
      submittedDate: '2025-01-14',
      description: 'Heating system not working properly in unit.'
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      from: 'tenant',
      subject: 'Urgent: Kitchen Sink Leak',
      content: 'Hi Sarah, I have an urgent issue with my kitchen sink. It\'s been leaking for the past two days and water is starting to pool under the cabinet. I\'m worried about water damage. Can someone come take a look as soon as possible? This is really stressing me out and I need this fixed immediately. Thank you.',
      date: '2025-01-15T10:30:00',
      read: false
    },
    {
      id: '2',
      from: 'tenant',
      subject: 'Thank you for quick maintenance response',
      content: 'Hi Sarah, I wanted to thank you for the quick response to my HVAC issue yesterday. The maintenance team was professional and fixed the problem efficiently. I really appreciate your prompt attention to tenant concerns. The heating is working perfectly now!',
      date: '2025-01-14T16:45:00',
      read: true
    },
    {
      id: '3',
      from: 'tenant',
      subject: 'Question about lease renewal',
      content: 'Hello, my lease is coming up for renewal in a few months and I wanted to discuss the terms. I\'ve been a good tenant and would like to stay, but I\'m hoping we can discuss the rent increase. Could we schedule a time to talk about this?',
      date: '2025-01-13T14:20:00',
      read: true
    },
    {
      id: '4',
      from: 'tenant',
      subject: 'Noise complaint from upstairs neighbor',
      content: 'Hi Sarah, I wanted to bring to your attention that there has been excessive noise coming from the apartment above me, especially late at night. It\'s been affecting my sleep and I was wondering if you could speak with them about it. I\'ve tried talking to them directly but the issue persists.',
      date: '2025-01-12T09:15:00',
      read: true
    },
    {
      id: '5',
      from: 'tenant',
      subject: 'Request for parking space assignment',
      content: 'Hello, I recently purchased a car and would like to request a parking space in the building garage. Could you please let me know about availability and the monthly cost? I understand there might be a waiting list.',
      date: '2025-01-10T14:30:00',
      read: true
    }
  ]);

  const handleMarkMessageAsRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const handleSendReply = (messageId: string, replyContent: string) => {
    const originalMessage = messages.find(m => m.id === messageId);
    if (!originalMessage) return;

    const newReply: Message = {
      id: Date.now().toString(),
      from: 'landlord',
      subject: `Re: ${originalMessage.subject}`,
      content: replyContent,
      date: new Date().toISOString(),
      read: true,
      replyTo: messageId
    };

    setMessages(prev => [newReply, ...prev]);
  };

  const handleViewMessage = (messageId: string) => {
    setSelectedMessageId(messageId);
    setShowMessagesModal(true);
  };

  const handleViewAllMessages = () => {
    setSelectedMessageId(undefined);
    setShowMessagesModal(true);
  };

  const totalUnits = properties.reduce((sum, p) => sum + p.units, 0);
  const occupiedUnits = properties.reduce((sum, p) => sum + p.occupiedUnits, 0);
  const monthlyRevenue = tenants.filter(t => t.paymentStatus === 'current').reduce((sum, t) => sum + t.rentAmount, 0);
  const pendingMaintenance = maintenanceRequests.filter(r => r.status === 'pending').length;
  const unreadMessages = messages.filter(m => !m.read && m.from === 'tenant').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Landlord Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your properties and tenant communications</p>
      </div>

      {/* Stats Cards - Matching the original design exactly */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Home className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Occupancy Rate</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round((occupiedUnits / totalUnits) * 100)}%</p>
              <p className="text-xs text-gray-400">{occupiedUnits}/{totalUnits} units</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${monthlyRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Wrench className="text-orange-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Pending Maintenance</p>
              <p className="text-2xl font-bold text-gray-900">{pendingMaintenance}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <MessageSquare className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Unread Messages</p>
              <p className="text-2xl font-bold text-gray-900">{unreadMessages}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Messages - Matching original layout */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare size={20} className="text-gray-600" />
              <h2 className="text-xl font-bold text-gray-900">Recent Messages</h2>
            </div>
            <button
              onClick={handleViewAllMessages}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              View All
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-1">Tenant communications</p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {messages.slice(0, 3).map((message) => (
            <div key={message.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{message.subject}</h3>
                    {!message.read && message.from === 'tenant' && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">{message.content}</p>
                  <p className="text-xs text-gray-400">{new Date(message.date).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button 
                    onClick={() => handleViewMessage(message.id)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View message details"
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Properties Overview - Matching original grid layout */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Properties Overview</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your property portfolio</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{property.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    property.status === 'active' ? 'bg-green-100 text-green-800' :
                    property.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {property.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{property.address}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Occupancy:</span>
                    <span className="font-medium text-gray-900">{property.occupiedUnits}/{property.units} units</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Monthly Rent:</span>
                    <span className="font-medium text-gray-900">${property.monthlyRent.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Maintenance Requests - Matching original style */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Recent Maintenance Requests</h2>
          <p className="text-gray-500 text-sm mt-1">Track and manage property maintenance</p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {maintenanceRequests.map((request) => (
            <div key={request.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{request.type} - {request.property}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      request.priority === 'high' ? 'bg-red-100 text-red-800' :
                      request.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {request.priority} priority
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      request.status === 'completed' ? 'bg-green-100 text-green-800' :
                      request.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{request.description}</p>
                  <p className="text-xs text-gray-400">
                    Submitted by {request.tenant} on {new Date(request.submittedDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg transition-colors">
                    <Eye size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 rounded-lg transition-colors">
                    <Edit size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Messages Modal */}
      <MessagesModal
        isOpen={showMessagesModal}
        onClose={() => {
          setShowMessagesModal(false);
          setSelectedMessageId(undefined);
        }}
        messages={messages}
        onMarkAsRead={handleMarkMessageAsRead}
        onSendReply={handleSendReply}
        selectedMessageId={selectedMessageId}
      />
    </div>
  );
};

export default LandlordDashboard;