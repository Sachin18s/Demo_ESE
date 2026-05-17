import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Code, Star, ArrowRight } from 'lucide-react';

const JobRequirements = () => {
  const [reqSkills, setReqSkills] = useState('');
  const [minExp, setMinExp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleMatch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const skillsArray = reqSkills.split(',').map(s => s.trim()).filter(s => s);
      const res = await axios.post('/api/candidates/match', {
        requiredSkills: skillsArray,
        minExperience: Number(minExp)
      });
      
      // Store in localStorage for the next page to use
      localStorage.setItem('matchedCandidates', JSON.stringify(res.data));
      localStorage.setItem('jobReq', JSON.stringify({ requiredSkills: skillsArray, minExperience: Number(minExp) }));
      
      navigate('/shortlisted');
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const inputClasses = "w-full pl-10 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white";
  const iconClasses = "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400";

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Briefcase className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Find the Perfect Match</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Enter your job requirements to let AI shortlist the best candidates</p>
      </div>

      <div className="glass-card p-8 md:p-10">
        <form onSubmit={handleMatch} className="space-y-8">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Required Skills</label>
            <p className="text-xs text-gray-500 mb-2">Comma separated (e.g. React, Node.js, Python)</p>
            <div className="relative">
              <div className={iconClasses}><Code size={18} /></div>
              <input 
                type="text" 
                value={reqSkills} 
                onChange={(e) => setReqSkills(e.target.value)} 
                required 
                className={inputClasses} 
                placeholder="React, Node.js, MongoDB" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Minimum Experience (Years)</label>
            <div className="relative">
              <div className={iconClasses}><Star size={18} /></div>
              <input 
                type="number" 
                value={minExp} 
                onChange={(e) => setMinExp(e.target.value)} 
                required 
                min="0" 
                step="0.5" 
                className={inputClasses} 
                placeholder="2" 
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center group shadow-lg shadow-blue-500/30 text-lg"
            >
              {loading ? (
                <span className="flex items-center">Processing matches... <span className="animate-spin ml-2">⟳</span></span>
              ) : (
                <>Run Match Logic <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobRequirements;
