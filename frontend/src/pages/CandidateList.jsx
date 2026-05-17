import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Filter, Mail, Briefcase, Code } from 'lucide-react';

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterExp, setFilterExp] = useState('all');

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/candidates');
        setCandidates(res.data);
      } catch (error) {
        console.error("Error fetching candidates", error);
      }
    };
    fetchCandidates();
  }, []);

  const filteredCandidates = candidates.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filterExp === 'all') return matchesSearch;
    if (filterExp === 'fresher') return matchesSearch && c.experience < 2;
    if (filterExp === 'mid') return matchesSearch && c.experience >= 2 && c.experience <= 5;
    if (filterExp === 'senior') return matchesSearch && c.experience > 5;
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Candidates</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and view all applicants</p>
        </div>
        
        <div className="flex w-full md:w-auto space-x-3">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={18} />
            </div>
            <input
              type="text"
              placeholder="Search by name or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 dark:text-gray-200"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="text-gray-400" size={18} />
            </div>
            <select
              value={filterExp}
              onChange={(e) => setFilterExp(e.target.value)}
              className="pl-10 pr-8 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none text-gray-700 dark:text-gray-200"
            >
              <option value="all">All Experience</option>
              <option value="fresher">Fresher (0-1 yrs)</option>
              <option value="mid">Mid-Level (2-5 yrs)</option>
              <option value="senior">Senior (5+ yrs)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCandidates.map(candidate => (
          <div key={candidate._id} className="glass-card hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{candidate.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <Mail size={14} className="mr-1.5" /> {candidate.email}
                  </div>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold px-3 py-1.5 rounded-full flex items-center">
                  <Briefcase size={12} className="mr-1" /> {candidate.experience} Yrs
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Code size={16} className="mr-2 text-gray-400" /> Skills
                </div>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.slice(0, 4).map((skill, index) => (
                    <span key={index} className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md">
                      {skill}
                    </span>
                  ))}
                  {candidate.skills.length > 4 && (
                    <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded-md">
                      +{candidate.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>
              
              {candidate.bio && (
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {candidate.bio}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {filteredCandidates.length === 0 && (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          <Users size={48} className="mx-auto mb-4 opacity-20" />
          <p className="text-xl">No candidates found</p>
        </div>
      )}
    </div>
  );
};

export default CandidateList;
