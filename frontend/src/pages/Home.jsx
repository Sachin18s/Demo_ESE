import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, Users, Zap, ShieldCheck } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <BrainCircuit className="text-blue-600 h-8 w-8" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">AI Recruiter</span>
        </div>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
          <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Hire Smarter with <br/>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">AI-Powered Shortlisting</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Streamline your recruitment process. Let our intelligent AI analyze resumes, match skills, and rank candidates instantly.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-xl hover:shadow-blue-500/30 flex items-center">
            Start Free Trial <Zap className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose AI Recruiter?</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-8 rounded-3xl bg-blue-50/50 border border-blue-100 hover:shadow-lg transition-all">
              <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <BrainCircuit className="text-blue-600 h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Intelligent Matching</h3>
              <p className="text-gray-600">Advanced AI algorithms analyze candidate skills and experience against your job requirements to find the perfect fit.</p>
            </div>
            <div className="p-8 rounded-3xl bg-purple-50/50 border border-purple-100 hover:shadow-lg transition-all">
              <div className="bg-purple-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <Users className="text-purple-600 h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Seamless Management</h3>
              <p className="text-gray-600">Organize all your candidates in one beautiful, easy-to-use dashboard with powerful filtering and search capabilities.</p>
            </div>
            <div className="p-8 rounded-3xl bg-green-50/50 border border-green-100 hover:shadow-lg transition-all">
              <div className="bg-green-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="text-green-600 h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Unbiased Decisions</h3>
              <p className="text-gray-600">Reduce human bias in the initial screening process. Our AI evaluates candidates based purely on merit and data.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
