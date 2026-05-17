import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Briefcase, Star, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [stats, setStats] = useState({ total: 0, experienced: 0, freshers: 0 });

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get('/api/candidates');
        setCandidates(res.data);
        
        const experienced = res.data.filter(c => c.experience >= 2).length;
        setStats({
          total: res.data.length,
          experienced,
          freshers: res.data.length - experienced
        });
      } catch (error) {
        console.error("Error fetching candidates", error);
      }
    };
    fetchCandidates();
  }, []);

  const expData = [
    { name: '0-1 yrs', value: candidates.filter(c => c.experience <= 1).length },
    { name: '2-4 yrs', value: candidates.filter(c => c.experience > 1 && c.experience <= 4).length },
    { name: '5+ yrs', value: candidates.filter(c => c.experience > 4).length },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#8b5cf6'];

  const getSkillData = () => {
    const skillsCount = {};
    candidates.forEach(c => {
      c.skills.forEach(s => {
        skillsCount[s] = (skillsCount[s] || 0) + 1;
      });
    });
    return Object.keys(skillsCount).map(key => ({
      name: key,
      count: skillsCount[key]
    })).sort((a, b) => b.count - a.count).slice(0, 5);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Candidates', value: stats.total, icon: Users, color: 'bg-blue-500' },
          { title: 'Experienced (2+ yrs)', value: stats.experienced, icon: Briefcase, color: 'bg-purple-500' },
          { title: 'Freshers', value: stats.freshers, icon: Star, color: 'bg-green-500' },
          { title: 'Avg Experience', value: stats.total > 0 ? (candidates.reduce((a, b) => a + b.experience, 0) / stats.total).toFixed(1) + ' yrs' : '0 yrs', icon: TrendingUp, color: 'bg-orange-500' },
        ].map((stat, index) => (
          <div key={index} className="glass-card p-6 flex items-center space-x-4">
            <div className={`${stat.color} p-4 rounded-xl text-white shadow-lg`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">Top Skills Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getSkillData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis stroke="#8884d8" />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">Experience Level Breakdown</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {expData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {expData.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
