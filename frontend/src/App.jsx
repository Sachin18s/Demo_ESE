import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddCandidate from './pages/AddCandidate';
import CandidateList from './pages/CandidateList';
import JobRequirements from './pages/JobRequirements';
import ShortlistedCandidates from './pages/ShortlistedCandidates';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const PrivateRoute = ({ children }) => {
    return token ? (
      <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Sidebar toggleDarkMode={toggleDarkMode} darkMode={darkMode} setToken={setToken} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    ) : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/add-candidate" element={<PrivateRoute><AddCandidate /></PrivateRoute>} />
        <Route path="/candidates" element={<PrivateRoute><CandidateList /></PrivateRoute>} />
        <Route path="/job-requirements" element={<PrivateRoute><JobRequirements /></PrivateRoute>} />
        <Route path="/shortlisted" element={<PrivateRoute><ShortlistedCandidates /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
