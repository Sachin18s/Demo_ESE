import React, { useState } from 'react';
import axios from 'axios';
import { User, Mail, Code, Briefcase, FileText, CheckCircle } from 'lucide-react';

const AddCandidate = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: '',
    experience: '',
    bio: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s);
      await axios.post('/api/candidates', {
        ...formData,
        skills: skillsArray,
        experience: Number(formData.experience)
      });
      setSuccess(true);
      setFormData({ name: '', email: '', skills: '', experience: '', bio: '' });
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const inputClasses = "w-full pl-10 p-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white";
  const iconClasses = "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add New Candidate</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Enter candidate details below</p>
      </div>

      <div className="glass-card p-8">
        {success && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl flex items-center space-x-2">
            <CheckCircle size={20} />
            <span>Candidate added successfully!</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <div className="relative">
                <div className={iconClasses}><User size={18} /></div>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputClasses} placeholder="John Doe" />
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <div className={iconClasses}><Mail size={18} /></div>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClasses} placeholder="john@example.com" />
              </div>
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills (comma separated)</label>
            <div className="relative">
              <div className={iconClasses}><Code size={18} /></div>
              <input type="text" name="skills" value={formData.skills} onChange={handleChange} required className={inputClasses} placeholder="React, Node.js, MongoDB" />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Experience (Years)</label>
            <div className="relative">
              <div className={iconClasses}><Briefcase size={18} /></div>
              <input type="number" name="experience" value={formData.experience} onChange={handleChange} required min="0" step="0.5" className={inputClasses} placeholder="3" />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio / Additional Info</label>
            <div className="relative">
              <div className="absolute top-3 left-3 text-gray-400"><FileText size={18} /></div>
              <textarea name="bio" value={formData.bio} onChange={handleChange} rows="4" className={`${inputClasses} pl-10`} placeholder="Brief description about the candidate..."></textarea>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-blue-500/30"
            >
              {loading ? 'Saving...' : 'Add Candidate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCandidate;
