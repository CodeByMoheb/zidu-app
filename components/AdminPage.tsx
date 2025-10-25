import React, { useState } from 'react';

const AdminPage: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // MOCK DATA - In a real app, this would come from a backend API
    const mockData = {
        totalGenerations: 1337,
        uniqueUsers: 428,
        recentActivity: [
            { id: 1, name: 'Alex', years: '1995 - 2024', date: '2024-07-21 10:34 AM' },
            { id: 2, name: 'Jordan', years: '2001 - 2023', date: '2024-07-21 10:31 AM' },
            { id: 3, name: 'Casey', years: '1989 - 2024', date: '2024-07-21 09:55 AM' },
            { id: 4, name: 'Sam', years: '1998 - 2022', date: '2024-07-20 08:12 PM' },
        ]
    };

    if (!isLoggedIn) {
        return (
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl shadow-lg shadow-cyan-500/10 p-6 sm:p-8 max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
                <div className="flex flex-col space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                        <input type="email" id="email" placeholder="admin@zidu.ai" className="w-full px-4 py-2 text-gray-200 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400" />
                    </div>
                    <div>
                        <label htmlFor="password"className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                        <input type="password" id="password" placeholder="••••••••" className="w-full px-4 py-2 text-gray-200 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400" />
                    </div>
                    <div className="text-center text-xs text-gray-500 pt-2">
                        <p>This is a frontend-only demonstration.</p>
                        <p>A real backend is required for a functional admin panel.</p>
                    </div>
                    <button onClick={() => setIsLoggedIn(true)} className="w-full py-2 px-4 text-md font-semibold rounded-lg transition-all duration-300 ease-in-out bg-cyan-500 text-white hover:bg-cyan-600">
                        Log In
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl shadow-lg shadow-cyan-500/10 p-6 sm:p-8">
            <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-700/50 p-6 rounded-lg">
                    <h3 className="text-gray-400 text-sm font-medium">Total Generations</h3>
                    <p className="text-4xl font-bold text-cyan-400">{mockData.totalGenerations}</p>
                </div>
                <div className="bg-slate-700/50 p-6 rounded-lg">
                    <h3 className="text-gray-400 text-sm font-medium">Unique Users (est.)</h3>
                    <p className="text-4xl font-bold text-cyan-400">{mockData.uniqueUsers}</p>
                </div>
            </div>
            {/* Recent Activity Table */}
            <div>
                 <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-slate-600 text-sm text-gray-400">
                            <tr>
                                <th className="p-2">Name</th>
                                <th className="p-2">Years</th>
                                <th className="p-2">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockData.recentActivity.map(activity => (
                                <tr key={activity.id} className="border-b border-slate-700">
                                    <td className="p-2">{activity.name}</td>
                                    <td className="p-2">{activity.years}</td>
                                    <td className="p-2 text-sm text-gray-500">{activity.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
            </div>
        </div>
    );
};

export default AdminPage;
