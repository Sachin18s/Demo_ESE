import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrainCircuit, Star, Briefcase, Mail, CheckCircle, AlertTriangle, Download, Zap } from 'lucide-react';

const ShortlistedCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [jobReq, setJobReq] = useState(null);
  const [aiData, setAiData] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('matchedCandidates');
    const req = localStorage.getItem('jobReq');
    if (saved) setCandidates(JSON.parse(saved));
    if (req) setJobReq(JSON.parse(req));
  }, []);

  const runAIEvaluation = async () => {
    setLoadingAI(true);
    try {
      // Send top 5 candidates to save tokens
      const topCandidates = candidates.slice(0, 5);
      const res = await axios.post('/api/ai/shortlist', {
        candidates: topCandidates,
        jobRequirements: jobReq
      });
      setAiData(res.data.shortlistedCandidates || []);
    } catch (error) {
      console.error(error);
      alert('AI evaluation failed. Please check backend and OpenRouter API key.');
    }
    setLoadingAI(false);
  };

  const getMatchColor = (label) => {
    if (label === 'High Match') return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
    if (label === 'Medium Match') return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
    return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
  };

  const ProgressBar = ({ score }) => (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
      <div 
        className="h-2.5 rounded-full transition-all duration-1000" 
        style={{ 
          width: `${score}%`,
          backgroundColor: score >= 80 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444' 
        }}
      ></div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shortlisted Candidates</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Based on algorithmic matching and AI evaluation</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={runAIEvaluation}
            disabled={loadingAI || candidates.length === 0}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:opacity-90 transition-all flex items-center shadow-lg shadow-purple-500/30 disabled:opacity-50"
          >
            {loadingAI ? (
              <><span className="animate-spin mr-2">⟳</span> Analyzing...</>
            ) : (
              <><BrainCircuit className="mr-2" size={20} /> AI Deep Analysis</>
            )}
          </button>
          
          <button className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center shadow-sm">
            <Download className="mr-2" size={20} /> Export
          </button>
        </div>
      </div>

      {aiData && aiData.length > 0 && (
        <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-1 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <BrainCircuit size={150} />
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 md:p-8 border border-white/20">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-purple-500 p-2 rounded-lg text-white shadow-lg shadow-purple-500/50">
                <Zap size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">AI Recommendations</h2>
            </div>
            
            <div className="grid gap-6">
              {aiData.map((aiCandidate, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <Star className="text-yellow-400 mr-2" fill="currentColor" size={20} /> 
                      {aiCandidate.name}
                    </h3>
                    <div className="bg-purple-500/20 text-purple-200 px-3 py-1 rounded-full text-sm font-semibold border border-purple-500/30">
                      AI Score: {aiCandidate.aiMatchScore}/100
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{aiCandidate.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {candidates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate, idx) => (
            <div key={idx} className="glass-card hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{candidate.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <Mail size={14} className="mr-1.5" /> {candidate.email}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getMatchColor(candidate.rankingLabel)}`}>
                    {candidate.rankingLabel}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Match Score</span>
                    <span className="font-bold text-gray-900 dark:text-white">{candidate.matchScore}%</span>
                  </div>
                  <ProgressBar score={candidate.matchScore} />
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Matched Skills</div>
                    <div className="flex flex-wrap gap-1.5">
                      {candidate.matchedSkills.length > 0 ? candidate.matchedSkills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/30 text-xs rounded-md flex items-center">
                          <CheckCircle size={10} className="mr-1" /> {skill}
                        </span>
                      )) : (
                        <span className="text-sm text-gray-500">No matching skills</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Briefcase size={16} className="mr-1.5 text-gray-400" />
                      {candidate.experience} Years Exp
                    </div>
                    {jobReq && candidate.experience < jobReq.minExperience && (
                      <div className="text-xs text-amber-600 flex items-center" title={`Requires ${jobReq.minExperience} yrs`}>
                        <AlertTriangle size={14} className="mr-1" /> Below req
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass-card">
          <Star size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">No Candidates Matched Yet</h3>
          <p className="text-gray-500">Run the match logic from the Job Requirements page first.</p>
        </div>
      )}
    </div>
  );
};

export default ShortlistedCandidates;
