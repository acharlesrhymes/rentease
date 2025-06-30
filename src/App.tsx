import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import RenterDashboard from './pages/RenterDashboard';
import LandlordDashboard from './pages/LandlordDashboard';
import PaymentsPage from './pages/PaymentsPage';
import TenantsPage from './pages/TenantsPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                {user?.role === 'renter' ? <RenterDashboard /> : <LandlordDashboard />}
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/payments" 
            element={
              <ProtectedRoute>
                {user?.role === 'renter' ? <PaymentsPage /> : <Navigate to="/dashboard" replace />}
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tenants" 
            element={
              <ProtectedRoute>
                {user?.role === 'landlord' ? <TenantsPage /> : <Navigate to="/dashboard" replace />}
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Layout>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;