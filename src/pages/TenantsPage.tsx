import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, Plus, Mail, Phone, Calendar, MapPin, DollarSign, CheckCircle, AlertCircle, Clock, Edit, Trash2, Eye, MessageSquare, X, Send } from 'lucide-react';

interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  unit: string;
  rentAmount: number;
  leaseStart: string;
  leaseEnd: string;
  status: 'active' | 'pending' | 'expired';
  paymentStatus: 'current' | 'late' | 'overdue';
  lastPayment: string;
  avatar?: string;
}

interface TenantModalProps {
  isOpen: boolean;
  onClose: () => void;
  tenant?: Tenant;
  onSave: (tenant: Omit<Tenant, 'id'>) => void;
  mode: 'add' | 'edit' | 'view';
  onModeChange: (mode: 'add' | 'edit' | 'view') => void;
}

const TenantModal: React.FC<TenantModalProps> = ({ isOpen, onClose, tenant, onSave, mode, onModeChange }) => {
  const [formData, setFormData] = useState<Omit<Tenant, 'id'>>({
    name: '',
    email: '',
    phone: '',
    property: '',
    unit: '',
    rentAmount: 0,
    leaseStart: '',
    leaseEnd: '',
    status: 'active',
    paymentStatus: 'current',
    lastPayment: ''
  });

  // Update form data when tenant prop changes
  useEffect(() => {
    if (tenant) {
      setFormData({
        name: tenant.name,
        email: tenant.email,
        phone: tenant.phone,
        property: tenant.property,
        unit: tenant.unit,
        rentAmount: tenant.rentAmount,
        leaseStart: tenant.leaseStart,
        leaseEnd: tenant.leaseEnd,
        status: tenant.status,
        paymentStatus: tenant.paymentStatus,
        lastPayment: tenant.lastPayment
      });
    } else {
      // Reset form for new tenant
      setFormData({
        name: '',
        email: '',
        phone: '',
        property: '',
        unit: '',
        rentAmount: 0,
        leaseStart: '',
        leaseEnd: '',
        status: 'active',
        paymentStatus: 'current',
        lastPayment: ''
      });
    }
  }, [tenant, mode]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleEditClick = () => {
    onModeChange('edit');
  };

  const isReadOnly = mode === 'view';

  const formatDateForInput = (dateString: string) => {
    if (!dateString) return '';
    return dateString;
  };

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'add' ? 'Add New Tenant' : mode === 'edit' ? 'Edit Tenant' : 'Tenant Details'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {isReadOnly ? (
          // View Mode - Display tenant information in a readable format
          <div className="p-6 space-y-6">
            {/* Tenant Avatar and Basic Info */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {formData.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{formData.name}</h3>
                <p className="text-gray-600">{formData.property} - {formData.unit}</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Mail className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{formData.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium text-gray-900">{formData.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Property Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Property</p>
                    <p className="font-medium text-gray-900">{formData.property}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Unit/Apartment</p>
                    <p className="font-medium text-gray-900">{formData.unit}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <DollarSign className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Monthly Rent</p>
                    <p className="font-medium text-gray-900">${formData.rentAmount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lease Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Lease Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Lease Start</p>
                    <p className="font-medium text-gray-900">{formatDisplayDate(formData.leaseStart)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Lease End</p>
                    <p className="font-medium text-gray-900">{formatDisplayDate(formData.leaseEnd)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Status Information</h4>
              <div className="flex flex-wrap gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tenant Status</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    formData.status === 'active' ? 'bg-green-100 text-green-800' :
                    formData.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Payment Status</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    formData.paymentStatus === 'current' ? 'bg-green-100 text-green-800' :
                    formData.paymentStatus === 'late' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {formData.paymentStatus.charAt(0).toUpperCase() + formData.paymentStatus.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleEditClick}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Edit size={16} />
                <span>Edit Tenant</span>
              </button>
            </div>
          </div>
        ) : (
          // Edit/Add Mode - Show form
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property
                </label>
                <input
                  type="text"
                  value={formData.property}
                  onChange={(e) => setFormData({...formData, property: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit/Apartment
                </label>
                <input
                  type="text"
                  value={formData.unit}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Rent
                </label>
                <input
                  type="number"
                  value={formData.rentAmount}
                  onChange={(e) => setFormData({...formData, rentAmount: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lease Start Date
                </label>
                <input
                  type="date"
                  value={formatDateForInput(formData.leaseStart)}
                  onChange={(e) => setFormData({...formData, leaseStart: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lease End Date
                </label>
                <input
                  type="date"
                  value={formatDateForInput(formData.leaseEnd)}
                  onChange={(e) => setFormData({...formData, leaseEnd: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tenant Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Status
                </label>
                <select
                  value={formData.paymentStatus}
                  onChange={(e) => setFormData({...formData, paymentStatus: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="current">Current</option>
                  <option value="late">Late</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
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
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {mode === 'add' ? 'Add Tenant' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const TenantsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'expired'>('all');
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'current' | 'late' | 'overdue'>('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedTenant, setSelectedTenant] = useState<Tenant | undefined>();

  const [tenants, setTenants] = useState<Tenant[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      property: 'Sunset Apartments',
      unit: 'Apt #202',
      rentAmount: 1500,
      leaseStart: '2024-01-01',
      leaseEnd: '2024-12-31',
      status: 'active',
      paymentStatus: 'current',
      lastPayment: '2025-01-01'
    },
    {
      id: '2',
      name: 'Emily Johnson',
      email: 'emily.johnson@email.com',
      phone: '(555) 234-5678',
      property: 'Downtown Lofts',
      unit: 'Unit 305',
      rentAmount: 2200,
      leaseStart: '2024-03-15',
      leaseEnd: '2025-03-14',
      status: 'active',
      paymentStatus: 'current',
      lastPayment: '2025-01-01'
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'michael.brown@email.com',
      phone: '(555) 345-6789',
      property: 'Garden View Complex',
      unit: 'Apt #101',
      rentAmount: 1800,
      leaseStart: '2024-06-01',
      leaseEnd: '2025-05-31',
      status: 'active',
      paymentStatus: 'late',
      lastPayment: '2024-12-15'
    },
    {
      id: '4',
      name: 'Sarah Davis',
      email: 'sarah.davis@email.com',
      phone: '(555) 456-7890',
      property: 'Riverside Towers',
      unit: 'Unit 1205',
      rentAmount: 2800,
      leaseStart: '2024-02-01',
      leaseEnd: '2025-01-31',
      status: 'active',
      paymentStatus: 'current',
      lastPayment: '2025-01-01'
    },
    {
      id: '5',
      name: 'David Wilson',
      email: 'david.wilson@email.com',
      phone: '(555) 567-8901',
      property: 'Oak Street Apartments',
      unit: 'Apt #45',
      rentAmount: 1650,
      leaseStart: '2023-09-01',
      leaseEnd: '2024-08-31',
      status: 'expired',
      paymentStatus: 'overdue',
      lastPayment: '2024-08-01'
    }
  ]);

  const handleAddTenant = () => {
    setModalMode('add');
    setSelectedTenant(undefined);
    setShowModal(true);
  };

  const handleEditTenant = (tenant: Tenant) => {
    setModalMode('edit');
    setSelectedTenant(tenant);
    setShowModal(true);
  };

  const handleViewTenant = (tenant: Tenant) => {
    setModalMode('view');
    setSelectedTenant(tenant);
    setShowModal(true);
  };

  const handleModeChange = (mode: 'add' | 'edit' | 'view') => {
    setModalMode(mode);
  };

  const handleSaveTenant = (tenantData: Omit<Tenant, 'id'>) => {
    if (modalMode === 'add') {
      const newTenant: Tenant = {
        ...tenantData,
        id: Date.now().toString()
      };
      setTenants(prev => [newTenant, ...prev]);
    } else if (modalMode === 'edit' && selectedTenant) {
      setTenants(prev => prev.map(t => 
        t.id === selectedTenant.id ? { ...tenantData, id: selectedTenant.id } : t
      ));
    }
  };

  const handleDeleteTenant = (tenantId: string) => {
    if (confirm('Are you sure you want to delete this tenant?')) {
      setTenants(prev => prev.filter(t => t.id !== tenantId));
    }
  };

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.unit.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || tenant.paymentStatus === paymentFilter;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'expired':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case 'current':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'late':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'overdue':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case 'current':
        return <CheckCircle className="text-green-600" size={16} />;
      case 'late':
        return <Clock className="text-yellow-600" size={16} />;
      case 'overdue':
        return <AlertCircle className="text-red-600" size={16} />;
      default:
        return <Clock className="text-gray-600" size={16} />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const activeTenants = tenants.filter(t => t.status === 'active').length;
  const totalRentCollected = tenants.filter(t => t.paymentStatus === 'current').reduce((sum, t) => sum + t.rentAmount, 0);
  const overduePayments = tenants.filter(t => t.paymentStatus === 'overdue').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tenant Management</h1>
          <p className="text-gray-600 mt-2">Manage your tenants and track their information</p>
        </div>
        <button
          onClick={handleAddTenant}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Tenant</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Active Tenants</p>
              <p className="text-2xl font-bold text-gray-900">{activeTenants}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Monthly Rent</p>
              <p className="text-2xl font-bold text-gray-900">${totalRentCollected.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-full">
              <Calendar className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Properties</p>
              <p className="text-2xl font-bold text-gray-900">{new Set(tenants.map(t => t.property)).size}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-100 rounded-full">
              <AlertCircle className="text-red-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Overdue Payments</p>
              <p className="text-2xl font-bold text-gray-900">{overduePayments}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search tenants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="expired">Expired</option>
              </select>
            </div>
            
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Payments</option>
              <option value="current">Current</option>
              <option value="late">Late</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tenants Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTenants.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
            <Users className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No tenants found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters, or add a new tenant.</p>
            <button
              onClick={handleAddTenant}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Add Your First Tenant
            </button>
          </div>
        ) : (
          filteredTenants.map((tenant) => (
            <div key={tenant.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {tenant.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{tenant.name}</h3>
                      <p className="text-sm text-gray-600">{tenant.property} - {tenant.unit}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleViewTenant(tenant)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleEditTenant(tenant)}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Edit Tenant"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteTenant(tenant.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Tenant"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Mail size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{tenant.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{tenant.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">${tenant.rentAmount.toLocaleString()}/month</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {formatDate(tenant.leaseStart)} - {formatDate(tenant.leaseEnd)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <span className={getStatusBadge(tenant.status)}>
                      {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getPaymentStatusIcon(tenant.paymentStatus)}
                    <span className={getPaymentStatusBadge(tenant.paymentStatus)}>
                      {tenant.paymentStatus.charAt(0).toUpperCase() + tenant.paymentStatus.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1">
                    <MessageSquare size={14} />
                    <span>Message</span>
                  </button>
                  <button
                    onClick={() => handleViewTenant(tenant)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tenant Modal */}
      <TenantModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        tenant={selectedTenant}
        onSave={handleSaveTenant}
        mode={modalMode}
        onModeChange={handleModeChange}
      />
    </div>
  );
};

export default TenantsPage;